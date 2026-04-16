const express = require("express");

const router = express.Router();

const authController = require("../controllers/auth.controller");
const { adminAuth } = require("../middleware/auth.middleware");

const {
  register,
  login,
  forgotPassword,
  verifyOtp,
  resetPassword
} = require("../controllers/auth.controller");


router.post("/register", register);

router.post("/login", login);

router.post("/forgot-password", forgotPassword);

router.post("/verify-otp", verifyOtp);

router.post("/reset-password", resetPassword);

router.get("/users", adminAuth, authController.getUsers);


module.exports = router;