// const express = require("express");
// const router = express.Router();

// const paymentController = require("../controllers/payment.controller");

// router.post("/create-payment", paymentController.createPayment);

// router.post("/verify-payment", paymentController.verifyPayment);

// router.post("/webhook", paymentController.razorpayWebhook);

// module.exports = router;








const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/payment.controller.js');
const { adminAuth } = require('../middleware/auth.middleware.js');

router.post('/create-order', paymentController.createOrder);
router.post('/verify-payment', paymentController.verifyPayment);
router.get('/all-payments', adminAuth, paymentController.getAllPayments);
router.post('/webhook', paymentController.cashfreeWebhook);

module.exports = router;