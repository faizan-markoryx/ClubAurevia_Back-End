const crypto = require("crypto");
const Payment = require("../models/payment.model");
const { createOrder } = require("../services/payment.service");

exports.createPayment = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, package: pkg, amount, message } =
      req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid amount",
      });
    }

    const order = await createOrder(amount);

    const payment = await Payment.create({
      firstName,
      lastName,
      email,
      phone,
      package: pkg,
      message,
      amount,
      razorpay_order_id: order.id,
      status: "pending",
    });

    res.json({
      success: true,
      orderId: order.id,
      key: process.env.RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      paymentId: payment._id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Payment creation failed",
    });
  }
};


exports.verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    const generated_signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generated_signature !== razorpay_signature) {
      await Payment.findOneAndUpdate(
        { razorpay_order_id },
        { status: "failed" }
      );

      return res.status(400).json({
        success: false,
        message: "Invalid signature",
      });
    }

    await Payment.findOneAndUpdate(
      { razorpay_order_id },
      {
        razorpay_payment_id,
        razorpay_signature,
        status: "success",
      }
    );

    res.json({
      success: true,
      message: "Payment verified successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Payment verification failed",
    });
  }
};


exports.razorpayWebhook = async (req, res) => {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

  const shasum = crypto.createHmac("sha256", secret);
  shasum.update(JSON.stringify(req.body));
  const digest = shasum.digest("hex");

  if (digest === req.headers["x-razorpay-signature"]) {
    const event = req.body.event;

    if (event === "payment.captured") {
      const paymentId = req.body.payload.payment.entity.order_id;

      await Payment.findOneAndUpdate(
        { razorpay_order_id: paymentId },
        { status: "success" }
      );
    }

    res.status(200).json({ status: "ok" });
  } else {
    res.status(400).json({ status: "invalid signature" });
  }
};