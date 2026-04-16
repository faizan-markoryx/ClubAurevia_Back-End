const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },

    lastName: {
      type: String,
    },

    email: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    package: {
      type: String,
    },

    message: {
      type: String,
    },

    amount: {
      type: Number,
      required: true,
    },

    razorpay_order_id: {
      type: String,
      required: true,
      unique: true,
    },

    razorpay_payment_id: {
      type: String,
      default: null,
    },

    razorpay_signature: {
      type: String,
      default: null,
    },

    status: {
      type: String,
      enum: ["created", "pending", "success", "failed", "cancelled"],
      default: "created",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", paymentSchema);