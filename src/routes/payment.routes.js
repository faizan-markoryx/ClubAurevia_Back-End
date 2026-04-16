const express = require("express");
const router = express.Router();

const paymentController = require("../controllers/payment.controller");

router.post("/create-payment", paymentController.createPayment);

router.post("/verify-payment", paymentController.verifyPayment);

router.post("/webhook", paymentController.razorpayWebhook);

module.exports = router;