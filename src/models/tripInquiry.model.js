const mongoose = require("mongoose");

const tripInquirySchema = new mongoose.Schema(
  {
    memberId: {
      type: String
    },

    membershipName: {
      type: String
    },

    firstName: {
      type: String,
      required: true
    },

    lastName: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true
    },

    phone: {
      type: String,
      required: true
    },

    destination: {
      type: String,
      required: true
    },

    numberOfAdults: {
      type: Number,
      required: true
    },

    numberOfChildren: {
      type: Number
    },

    specialRequest: {
      type: String
    },

    travelDate: {
      type: String,
      required: true
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }


  },
  { timestamps: true }
);

module.exports = mongoose.model("TripInquiry", tripInquirySchema);