const UserMembership = require("../models/userMembership.model");
const MembershipPlan = require("../models/membershipPlan.model");
const User = require("../models/user.model");

const {
  getUserMembershipService,
  createMembershipPlanService,
  getMembershipPlanByIdService,
  updateMembershipPlanService,
  deleteMembershipPlanService
} = require("../services/membership.service");


// ===============================
// Get All Membership Plans
// ===============================
exports.getAllMembershipPlans = async (req, res) => {

  try {

    const filter = {};

    // Optional filters, e.g. /api/membership/plans?isCustom=true&isActive=true
    if (req.query.isCustom !== undefined) {
      filter.isCustom = req.query.isCustom === "true";
    }

    if (req.query.isActive !== undefined) {
      filter.isActive = req.query.isActive === "true";
    }

    const plans = await MembershipPlan.find(filter).sort({ price: 1 });

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
// exports.useNights = async (req, res) => {

//   try {

//     const { membershipId, nightsUsed } = req.body;

//     const membership = await UserMembership.findById(membershipId);

//     if (!membership) {
//       return res.status(404).json({
//         success: false,
//         message: "Membership not found"
//       });
//     }

//     if (membership.remainingNights < nightsUsed) {
//       return res.status(400).json({
//         success: false,
//         message: "Not enough nights remaining"
//       });
//     }

//     membership.usedNights += nightsUsed;

//     membership.remainingNights =
//       membership.totalNights - membership.usedNights;

//     await membership.save();

//     res.status(200).json({
//       success: true,
//       message: "Nights used successfully",
//       membership
//     });

//   } catch (error) {

//     res.status(500).json({
//       success: false,
//       message: error.message
//     });

//   }

// };
// ===============================
// Use Nights
// ===============================
exports.useNights = async (req, res) => {
  try {
    // 🔥 'remarks' ko bhi req.body se nikal lenge (optional hai)
    const { membershipId, nightsUsed, remarks } = req.body;

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

    // 1️⃣ Update Counts
    membership.usedNights += nightsUsed;
    membership.remainingNights = membership.totalNights - membership.usedNights;

    // 2️⃣ 🔥 NAYA CODE: History track karne ke liye array me data push karna
    membership.usageHistory.push({
      dateUsed: new Date(),
      nightsDeducted: nightsUsed,
      remarks: remarks || "Night(s) Deducted" // Agar frontend se remarks nahi aaye to default text
    });

    // Save in Database
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


// ===============================
// Create Custom Membership Plan
// (admin defines a brand new, reusable plan with configurable fields)
// ===============================
exports.createMembershipPlan = async (req, res) => {

  try {

    const plan = await createMembershipPlanService(req.body, req.user?.id);

    res.status(201).json({
      success: true,
      message: "Custom membership plan created successfully",
      plan
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};


// ===============================
// Get Single Membership Plan
// ===============================
exports.getMembershipPlanById = async (req, res) => {

  try {

    const plan = await getMembershipPlanByIdService(req.params.id);

    res.status(200).json({
      success: true,
      plan
    });

  } catch (error) {

    res.status(404).json({
      success: false,
      message: error.message
    });

  }

};


// ===============================
// Update Membership Plan
// ===============================
exports.updateMembershipPlan = async (req, res) => {

  try {

    const plan = await updateMembershipPlanService(req.params.id, req.body);

    res.status(200).json({
      success: true,
      message: "Membership plan updated successfully",
      plan
    });

  } catch (error) {

    const status = error.message === "Membership plan not found" ? 404 : 500;

    res.status(status).json({
      success: false,
      message: error.message
    });

  }

};


// ===============================
// Delete Membership Plan
// ===============================
exports.deleteMembershipPlan = async (req, res) => {

  try {

    await deleteMembershipPlanService(req.params.id);

    res.status(200).json({
      success: true,
      message: "Membership plan deleted successfully"
    });

  } catch (error) {

    let status = 500;

    if (error.message === "Membership plan not found") status = 404;
    if (error.code === "PLAN_IN_USE") status = 400;

    res.status(status).json({
      success: false,
      message: error.message
    });

  }

};