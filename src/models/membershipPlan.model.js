const mongoose = require("mongoose");

const membershipPlanSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    price: {
      type: Number,
      required: true
    },

    nights: {
      type: Number,
      required: true
    },

    days: {
      type: Number
    },

    benefits: [
      {
        type: String
      }
    ],

    isCustom: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("MembershipPlan", membershipPlanSchema);