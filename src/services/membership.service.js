const UserMembership = require("../models/userMembership.model");
const User = require("../models/user.model");

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