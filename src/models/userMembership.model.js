const mongoose = require("mongoose");

const userMembershipSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    membershipPlan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MembershipPlan"
    },

    customName: {
      type: String
    },

    totalNights: {
      type: Number,
      required: true
    },

    usedNights: {
      type: Number,
      default: 0
    },

    remainingNights: {
      type: Number
    },

    pricePaid: {
      type: Number
    },

    status: {
      type: String,
      enum: ["active", "expired"],
      default: "active"
    },

    usageHistory: [
      {
        dateUsed: { type: Date, default: Date.now },
        nightsDeducted: { type: Number, required: true },
        remarks: { type: String }
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserMembership", userMembershipSchema);