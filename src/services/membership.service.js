const UserMembership = require("../models/userMembership.model");
const User = require("../models/user.model");
const MembershipPlan = require("../models/membershipPlan.model");

exports.getUserMembershipService = async (userId) => {

  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  const membership = await UserMembership.findOne({
    user: userId,
    status: "active"
  })
    .populate("membershipPlan")
    .sort({ createdAt: -1 });

  return {
    user,
    membership
  };
};


/* GET ALL MEMBERSHIP PLANS */

exports.getAllMembershipPlansService = async () => {

  const plans = await MembershipPlan.find().sort({ price: 1 });

  return plans;

};


// ===============================
// CREATE CUSTOM MEMBERSHIP PLAN
// ===============================
exports.createMembershipPlanService = async (data, adminUserId) => {

  const {
    name,
    price,
    nights,
    days,
    benefits,
    description,
    customFields
  } = data;

  const plan = await MembershipPlan.create({
    name,
    price,
    nights,
    days,
    benefits,
    description,
    customFields,
    isCustom: true,      // plans created through this feature are always custom
    isActive: true,
    createdBy: adminUserId
  });

  return plan;

};


// ===============================
// GET SINGLE MEMBERSHIP PLAN BY ID
// ===============================
exports.getMembershipPlanByIdService = async (planId) => {

  const plan = await MembershipPlan.findById(planId);

  if (!plan) {
    throw new Error("Membership plan not found");
  }

  return plan;

};


// ===============================
// UPDATE MEMBERSHIP PLAN
// ===============================
exports.updateMembershipPlanService = async (planId, data) => {

  const plan = await MembershipPlan.findById(planId);

  if (!plan) {
    throw new Error("Membership plan not found");
  }

  const allowedFields = [
    "name",
    "price",
    "nights",
    "days",
    "benefits",
    "description",
    "customFields",
    "isActive"
  ];

  allowedFields.forEach((field) => {
    if (data[field] !== undefined) {
      plan[field] = data[field];
    }
  });

  await plan.save();

  return plan;

};


// ===============================
// DELETE MEMBERSHIP PLAN
// ===============================
exports.deleteMembershipPlanService = async (planId) => {

  const plan = await MembershipPlan.findById(planId);

  if (!plan) {
    throw new Error("Membership plan not found");
  }

  // Prevent deleting a plan that is currently assigned to an active member,
  // so existing UserMembership records never end up pointing at nothing.
  const activeAssignment = await UserMembership.findOne({
    membershipPlan: planId,
    status: "active"
  });

  if (activeAssignment) {
    const error = new Error(
      "Cannot delete this plan, it is currently assigned to one or more active members. Deactivate it instead."
    );
    error.code = "PLAN_IN_USE";
    throw error;
  }

  await MembershipPlan.findByIdAndDelete(planId);

  return true;

};