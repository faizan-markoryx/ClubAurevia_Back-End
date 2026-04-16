const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { generateOtp } = require("../services/otp.service");
const emailFunctions = require("../helpers/email");

const generateMemberId = async () => {

  const lastUser = await User.findOne()
    .sort({ createdAt: -1 })
    .select("memberId");

  if (!lastUser || !lastUser.memberId) {
    return "CA101";
  }

  const number = parseInt(lastUser.memberId.replace("CA", "")) + 1;

  return `CA${number}`;
};


exports.register = async (req, res) => {

  try {

    const { firstName, lastName, email, phone, password, activeMembership = "", welcomeLetter = false, role = "user" } = req.body;

    const exist = await User.findOne({ email });

    if (exist) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hash = await bcrypt.hash(password, 10);

    const memberId = await generateMemberId();

    const user = await User.create({
      memberId,
      firstName,
      lastName,
      email,
      phone,
      password: hash,
      activeMembership,
      welcomeLetter,
      role
    });

    res.json({
      success: true,
      message: "User registered",
      user
    });

  } catch (error) {

    res.status(500).json({ message: "Server error" });

  }

};


exports.login = async (req, res) => {

  try {

    const { loginId, password } = req.body;

    const user = await User.findOne({
      $or: [
        { email: loginId },
        { memberId: loginId }
      ]
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      success: true,
      token,
      user
    });

  } catch (error) {

    res.status(500).json({ message: "Server error" });

  }

};


exports.forgotPassword = async (req, res) => {

  try {

    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const otp = generateOtp();

    user.otp = otp;

    user.otpExpire = new Date(Date.now() + 5 * 60 * 1000);

    await user.save();

    await emailFunctions.sendForgotPassword(email, otp);

    console.log("OTP:", otp);

    res.json({
      success: true,
      message: "OTP sent",
      otp
    });

  } catch (error) {

    res.status(500).json({ message: "Server error" });

  }

};


exports.verifyOtp = async (req, res) => {

  try {

    const { email, otp } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (user.otpExpire < new Date()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    res.json({
      success: true,
      message: "OTP verified"
    });

  } catch (error) {

    res.status(500).json({ message: "Server error" });

  }

};


exports.resetPassword = async (req, res) => {

  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    const hash = await bcrypt.hash(password, 10);

    user.password = hash;

    user.otp = null;

    await user.save();

    res.json({
      success: true,
      message: "Password reset successful"
    });

  } catch (error) {

    res.status(500).json({ message: "Server error" });

  }

};


// exports.getUsers = async (req, res) => {

//   try {

//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 10;

//     const skip = (page - 1) * limit;

//     const totalUsers = await User.countDocuments();

//     const users = await User.find()
//       .select("-password -otp")
//       .sort({ createdAt: -1 })
//       .skip(skip)
//       .limit(limit);

//     res.json({
//       success: true,
//       pagination: {
//         total: totalUsers,
//         page,
//         limit,
//         totalPages: Math.ceil(totalUsers / limit)
//       },
//       users
//     });

//   } catch (error) {

//     res.status(500).json({
//       success: false,
//       message: "Server error"
//     });

//   }

// };

exports.getUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";

    const skip = (page - 1) * limit;

    // 🔍 Search filter
    const searchFilter = search
      ? {
          $or: [
            { firstName: { $regex: search, $options: "i" } },
            { lastName: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } },
            { memberId: { $regex: search, $options: "i" } },
            { phone: { $regex: search, $options: "i" } }
          ]
        }
      : {};

    // 👉 total count with search
    const totalUsers = await User.countDocuments(searchFilter);

    const users = await User.aggregate([
      // 🔍 Apply search FIRST
      {
        $match: searchFilter
      },

      {
        $sort: { createdAt: -1 }
      },
      {
        $skip: skip
      },
      {
        $limit: limit
      },

      // 🔥 Lookup active membership (ONLY ONE - latest)
      {
        $lookup: {
          from: "usermemberships",
          let: { userId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$user", "$$userId"] },
                status: "active"
              }
            },
            {
              $sort: { createdAt: -1 }
            },
            {
              $limit: 1
            },
            {
              $lookup: {
                from: "membershipplans",
                localField: "membershipPlan",
                foreignField: "_id",
                as: "plan"
              }
            },
            {
              $unwind: {
                path: "$plan",
                preserveNullAndEmptyArrays: true
              }
            },
            {
              $project: {
                _id: 1,
                name: {
                  $ifNull: ["$customName", "$plan.name"]
                }
              }
            }
          ],
          as: "activeMembership"
        }
      },

      {
        $addFields: {
          activeMembership: {
            $arrayElemAt: ["$activeMembership", 0]
          }
        }
      },

      {
        $project: {
          password: 0,
          otp: 0
        }
      }
    ]);

    res.json({
      success: true,
      pagination: {
        total: totalUsers,
        page,
        limit,
        totalPages: Math.ceil(totalUsers / limit)
      },
      users
    });

  } catch (error) {
    console.error("Get Users Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};