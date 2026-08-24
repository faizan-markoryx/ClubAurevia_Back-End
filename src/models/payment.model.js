// const mongoose = require("mongoose");

// const paymentSchema = new mongoose.Schema(
//   {
//     firstName: {
//       type: String,
//       required: true,
//     },

//     lastName: {
//       type: String,
//     },

//     email: {
//       type: String,
//       required: true,
//     },

//     phone: {
//       type: String,
//       required: true,
//     },

//     package: {
//       type: String,
//     },

//     message: {
//       type: String,
//     },

//     amount: {
//       type: Number,
//       required: true,
//     },

//     razorpay_order_id: {
//       type: String,
//       required: true,
//       unique: true,
//     },

//     razorpay_payment_id: {
//       type: String,
//       default: null,
//     },

//     razorpay_signature: {
//       type: String,
//       default: null,
//     },

//     status: {
//       type: String,
//       enum: ["created", "pending", "success", "failed", "cancelled"],
//       default: "created",
//     },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Payment", paymentSchema);










const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true }, // Apna custom order ID
  cfOrderId: { type: String }, // Cashfree ka generated order ID
  paymentSessionId: { type: String },
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  package: String,
  amount: Number,
  message: String,
  status: { 
    type: String, 
    enum: ['PENDING', 'SUCCESS', 'FAILED', 'USER_DROPPED'], 
    default: 'PENDING' 
  },
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);