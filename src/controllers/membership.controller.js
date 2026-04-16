const UserMembership = require("../models/userMembership.model");
const MembershipPlan = require("../models/membershipPlan.model");
const User = require("../models/user.model");

const {
  getUserMembershipService
} = require("../services/membership.service");


// ===============================
// Get All Membership Plans
// ===============================
exports.getAllMembershipPlans = async (req, res) => {

  try {

    const plans = await MembershipPlan.find().sort({ price: 1 });

    res.status(200).json({
      success: true,
      total: plans.length,
      plans
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};


// ===============================
// Get User Membership
// ===============================
exports.getUserMembership = async (req, res) => {

  try {

    const { userId } = req.params;

    const data = await getUserMembershipService(userId);

    // console.log("?data",data)

    res.status(200).json({
      success: true,
      user: data.user,
      membership: data.membership
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};


// ===============================
// Assign Membership Plan
// ===============================
// exports.assignMembership = async (req, res) => {

//   try {

//     const { userId, planId, pricePaid } = req.body;

//     const plan = await MembershipPlan.findById(planId);

//     if (!plan) {
//       return res.status(404).json({
//         success: false,
//         message: "Plan not found"
//       });
//     }

//     // expire old active memberships
//     await UserMembership.updateMany(
//       { user: userId, status: "active" },
//       { status: "expired" }
//     );

//     // create new membership
//     const membership = await UserMembership.create({
//       user: userId,
//       membershipPlan: planId,
//       totalNights: plan.nights,
//       usedNights: 0,
//       remainingNights: plan.nights,
//       pricePaid,
//       status: "active"
//     });

//     res.status(201).json({
//       success: true,
//       message: "Membership assigned successfully",
//       membership
//     });

//   } catch (error) {

//     res.status(500).json({
//       success: false,
//       message: error.message
//     });

//   }

// };
exports.assignMembership = async (req, res) => {

  try {

    const { userId, planId, pricePaid } = req.body;

    const plan = await MembershipPlan.findById(planId);

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: "Plan not found"
      });
    }

    // expire old active memberships
    await UserMembership.updateMany(
      { user: userId, status: "active" },
      { status: "expired" }
    );

    // create new membership
    const membership = await UserMembership.create({
      user: userId,
      membershipPlan: planId,
      totalNights: plan.nights,
      usedNights: 0,
      remainingNights: plan.nights,
      pricePaid,
      status: "active"
    });

    // update active membership name in user table
    await User.findByIdAndUpdate(
      userId,
      { activeMembership: plan.name },
      { new: true }
    );

    res.status(201).json({
      success: true,
      message: "Membership assigned successfully",
      membership
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};


// ===============================
// Assign Custom Membership
// ===============================
exports.assignCustomMembership = async (req, res) => {

  try {

    const {
      userId,
      customName,
      nights,
      pricePaid
    } = req.body;

    // expire old membership
    await UserMembership.updateMany(
      { user: userId, status: "active" },
      { status: "expired" }
    );

    const membership = await UserMembership.create({

      user: userId,
      customName,
      totalNights: nights,
      usedNights: 0,
      remainingNights: nights,
      pricePaid,
      status: "active"

    });

    res.status(201).json({
      success: true,
      message: "Custom membership assigned successfully",
      membership
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};


// ===============================
// Use Nights
// ===============================
exports.useNights = async (req, res) => {

  try {

    const { membershipId, nightsUsed } = req.body;

    const membership = await UserMembership.findById(membershipId);

    if (!membership) {
      return res.status(404).json({
        success: false,
        message: "Membership not found"
      });
    }

    if (membership.remainingNights < nightsUsed) {
      return res.status(400).json({
        success: false,
        message: "Not enough nights remaining"
      });
    }

    membership.usedNights += nightsUsed;

    membership.remainingNights =
      membership.totalNights - membership.usedNights;

    await membership.save();

    res.status(200).json({
      success: true,
      message: "Nights used successfully",
      membership
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};


// ===============================
// Add Nights
// ===============================
exports.addNights = async (req, res) => {

  try {

    const { membershipId, nights } = req.body;

    const membership = await UserMembership.findById(membershipId);

    if (!membership) {
      return res.status(404).json({
        success: false,
        message: "Membership not found"
      });
    }

    membership.totalNights += nights;

    membership.remainingNights += nights;

    await membership.save();

    res.status(200).json({
      success: true,
      message: "Nights added successfully",
      membership
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};