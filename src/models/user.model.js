const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

  memberId: {
    type: String,
    unique: true
  },

  firstName: String,

  lastName: String,

  email: {
    type: String,
    unique: true
  },

  phone: String,

  // New Address Fields
  addressLine1: {
    type: String,
    trim: true
  },

  addressLine2: {
    type: String,
    trim: true
  },

  city: {
    type: String,
    trim: true
  },

  state: {
    type: String,
    trim: true
  },

  postalCode: {
    type: String,
    trim: true
  },

  country: {
    type: String,
    trim: true
  },

  activeMembership: String,

  welcomeLetter: Boolean,

  coApplicant: {
  type: String,
  trim: true,
  default: ""
},

  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
  },

  password: String,

  otp: String,

  otpExpire: Date

}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);