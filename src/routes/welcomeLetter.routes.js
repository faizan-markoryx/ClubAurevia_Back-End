// const express = require("express");
// const emailFunctions = require("../helpers/email");
// const User = require("../models/user.model");

// const router = express.Router();

// router.post("/send", async (req, res) => {

//     try {

//         const {
//             name,
//             email,
//             phone,
//             membershipName,
//             membershipPrice,
//             memberId
//         } = req.body;

//         await emailFunctions.sendWelcomeLetter(
//             name,
//             email,
//             phone,
//             membershipName,
//             membershipPrice,
//             memberId
//         );


//         // Find user by email
//         const user = await User.findOne({ email });


//         if (user) {
//             user.welcomeLetter = true;
//             await user.save();
//         }


//         res.status(200).json({
//             success: true,
//             message: "Email sent successfully"
//         });

//     } catch (error) {

//         console.error(error);

//         res.status(500).json({
//             success: false,
//             message: error.message
//         });

//     }

// });

// module.exports = router;










const express = require("express");
const emailFunctions = require("../helpers/email");
const User = require("../models/user.model");
const UserMembership = require("../models/userMembership.model");

const router = express.Router();

// 1. Existing Direct Send Route (Keep it intact)
router.post("/send", async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      membershipName,
      membershipPrice,
      memberId
    } = req.body;

    await emailFunctions.sendWelcomeLetter(
      name,
      email,
      phone,
      membershipName,
      membershipPrice,
      memberId
    );

    const user = await User.findOne({ email });
    if (user) {
      user.welcomeLetter = true;
      await user.save();
    }

    res.status(200).json({
      success: true,
      message: "Email sent successfully"
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// 2. New Route: Save & Close OR Save & Send from Admin Modal
router.post("/update-and-send", async (req, res) => {
  try {
    const {
      userId,
      membershipId,
      userData,
      membershipData,
      sendEmail = false
    } = req.body;

    // A. Update User Details (Phone & MemberId restricted)
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        coApplicant: userData.coApplicant,
        addressLine1: userData.addressLine1,
        addressLine2: userData.addressLine2,
        city: userData.city,
        state: userData.state,
        postalCode: userData.postalCode,
        country: userData.country
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // B. Update Membership Details
    const updatedMembership = await UserMembership.findByIdAndUpdate(
      membershipId,
      {
        pricePaid: membershipData.pricePaid,
        tenure: membershipData.tenure,
        totalNights: membershipData.totalNights,
        mealPlan: membershipData.mealPlan,
        validityFrom: membershipData.validityFrom ? new Date(membershipData.validityFrom) : null,
        validityTo: membershipData.validityTo ? new Date(membershipData.validityTo) : null,
        roomCapacity: membershipData.roomCapacity
      },
      { new: true }
    );

    // C. Handle Send Email if requested (Save & Send)
    if (sendEmail) {
      const fullName = `${updatedUser.firstName} ${updatedUser.lastName}`.trim();
      const planName = updatedUser.activeMembership || "Membership";

      await emailFunctions.sendWelcomeLetter(
        fullName,
        updatedUser.email,
        updatedUser.phone,
        planName,
        updatedMembership?.pricePaid,
        updatedUser.memberId
      );

      updatedUser.welcomeLetter = true;
      await updatedUser.save();
    }

    res.status(200).json({
      success: true,
      message: sendEmail
        ? "Details saved and Welcome Letter sent successfully"
        : "Details saved successfully",
      user: updatedUser,
      membership: updatedMembership
    });
  } catch (error) {
    console.error("Update and Send Error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Server error"
    });
  }
});

module.exports = router;