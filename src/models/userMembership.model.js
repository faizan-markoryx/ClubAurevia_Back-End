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

    tenure: {
      type: String,
      default: "3 Years"
    },
    mealPlan: {
      type: String,
      default: "Breakfast and Dinner"
    },
    validityFrom: {
      type: Date
    },
    validityTo: {
      type: Date
    },
    roomCapacity: {
      type: String,
      default: "2 Adult, 2 Kids below 12 years or 3 Adult + 1 Room"
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