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

  activeMembership: String,

  welcomeLetter: Boolean,

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