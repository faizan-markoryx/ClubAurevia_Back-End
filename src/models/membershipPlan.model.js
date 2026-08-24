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

    description: {
      type: String,
      trim: true
    },

    // Lets admin attach any number of additional, ad-hoc attributes
    // to a plan (e.g. "Spa Access" -> "Included") without changing the schema.
    customFields: [
      {
        label: {
          type: String,
          required: true,
          trim: true
        },
        value: {
          type: String,
          required: true,
          trim: true
        }
      }
    ],

    isCustom: {
      type: Boolean,
      default: false
    },

    isActive: {
      type: Boolean,
      default: true
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("MembershipPlan", membershipPlanSchema);