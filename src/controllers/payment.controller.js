// const crypto = require("crypto");
// const Payment = require("../models/payment.model");
// const { createOrder } = require("../services/payment.service");

// exports.createPayment = async (req, res) => {
//   try {
//     const { firstName, lastName, email, phone, package: pkg, amount, message } =
//       req.body;

//     if (!amount || amount <= 0) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid amount",
//       });
//     }

//     const order = await createOrder(amount);

//     const payment = await Payment.create({
//       firstName,
//       lastName,
//       email,
//       phone,
//       package: pkg,
//       message,
//       amount,
//       razorpay_order_id: order.id,
//       status: "pending",
//     });

//     res.json({
//       success: true,
//       orderId: order.id,
//       key: process.env.RAZORPAY_KEY_ID,
//       amount: order.amount,
//       currency: order.currency,
//       paymentId: payment._id,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: "Payment creation failed",
//     });
//   }
// };


// exports.verifyPayment = async (req, res) => {
//   try {
//     const {
//       razorpay_order_id,
//       razorpay_payment_id,
//       razorpay_signature,
//     } = req.body;

//     const generated_signature = crypto
//       .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//       .update(razorpay_order_id + "|" + razorpay_payment_id)
//       .digest("hex");

//     if (generated_signature !== razorpay_signature) {
//       await Payment.findOneAndUpdate(
//         { razorpay_order_id },
//         { status: "failed" }
//       );

//       return res.status(400).json({
//         success: false,
//         message: "Invalid signature",
//       });
//     }

//     await Payment.findOneAndUpdate(
//       { razorpay_order_id },
//       {
//         razorpay_payment_id,
//         razorpay_signature,
//         status: "success",
//       }
//     );

//     res.json({
//       success: true,
//       message: "Payment verified successfully",
//     });
//   } catch (error) {
//     console.error(error);

//     res.status(500).json({
//       success: false,
//       message: "Payment verification failed",
//     });
//   }
// };


// exports.razorpayWebhook = async (req, res) => {
//   const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

//   const shasum = crypto.createHmac("sha256", secret);
//   shasum.update(JSON.stringify(req.body));
//   const digest = shasum.digest("hex");

//   if (digest === req.headers["x-razorpay-signature"]) {
//     const event = req.body.event;

//     if (event === "payment.captured") {
//       const paymentId = req.body.payload.payment.entity.order_id;

//       await Payment.findOneAndUpdate(
//         { razorpay_order_id: paymentId },
//         { status: "success" }
//       );
//     }

//     res.status(200).json({ status: "ok" });
//   } else {
//     res.status(400).json({ status: "invalid signature" });
//   }
// };









const axios = require('axios');
// const { v4: uuidv4 } = require('uuid');
const Payment = require('../models/payment.model.js');

// Cashfree API Base URL based on environment
const getCashfreeBaseUrl = () => {
    return process.env.CASHFREE_ENV === 'PRODUCTION' 
        ? 'https://api.cashfree.com/pg' 
        : 'https://sandbox.cashfree.com/pg';
};

// Headers config for Cashfree API
const getCashfreeHeaders = () => ({
    'x-client-id': process.env.CASHFREE_APP_ID,
    'x-client-secret': process.env.CASHFREE_SECRET_KEY,
    'x-api-version': '2023-08-01',
    'Content-Type': 'application/json',
});

// 1️⃣ Create Order API
exports.createOrder = async (req, res) => {
    try {

        const { v4: uuidv4 } = await import('uuid');

        const { firstName, lastName, email, phone, package, amount, message } = req.body;
        
        // Generate unique order ID
        const orderId = `ORDER_${uuidv4().replace(/-/g, '').substring(0, 10)}`;

        // Save PENDING status in MongoDB immediately
        const newPayment = await Payment.create({
            orderId,
            firstName,
            lastName,
            email,
            phone,
            package,
            amount,
            message,
            status: 'PENDING'
        });

        // Prepare payload for Cashfree
        const requestData = {
            order_id: orderId,
            order_amount: amount,
            order_currency: 'INR',
            customer_details: {
                customer_id: phone,
                customer_name: `${firstName} ${lastName}`,
                customer_email: email,
                customer_phone: phone,
            },
            order_meta: {
                // Return URL frontend ka hoga jaha payment ke baad user jayega
                return_url: `https://clubaurevia.com/payment-status?order_id=${orderId}`,
                notify_url: `https://api.clubaurevia.com/api/payments/webhook`
            }
        };

        // Call Cashfree API
        const response = await axios.post(`${getCashfreeBaseUrl()}/orders`, requestData, {
            headers: getCashfreeHeaders()
        });

        // Update DB with Cashfree IDs
        newPayment.cfOrderId = response.data.cf_order_id;
        newPayment.paymentSessionId = response.data.payment_session_id;
        await newPayment.save();

        // Send session ID to frontend
        res.status(200).json({ 
            success: true, 
            payment_session_id: response.data.payment_session_id,
            order_id: orderId 
        });

    } catch (error) {
        console.error("Create Order Error:", error.response?.data || error.message);
        res.status(500).json({ success: false, message: 'Failed to initiate payment' });
    }
};

// 2️⃣ Webhook & Status Verification API (Bulletproof Flow)
exports.verifyPayment = async (req, res) => {
    try {
        const orderId = req.body.orderId || req.query.orderId;

        if (!orderId) {
            return res.status(400).json({ success: false, message: "Order ID is required" });
        }

        const paymentRecord = await Payment.findOne({ orderId });
        if (!paymentRecord) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        // Server-to-Server Verification (Never trust frontend or unverified webhooks)
        const response = await axios.get(`${getCashfreeBaseUrl()}/orders/${orderId}`, {
            headers: getCashfreeHeaders()
        });

        const orderStatus = response.data.order_status; // PAID, ACTIVE (Pending), etc.

        if (orderStatus === 'PAID') {
            paymentRecord.status = 'SUCCESS';
        } else if (orderStatus === 'FAILED' || orderStatus === 'USER_DROPPED') {
            paymentRecord.status = 'FAILED';
        }

        await paymentRecord.save();

        res.status(200).json({ 
            success: true, 
            status: paymentRecord.status,
            message: "Payment status verified successfully" 
        });

    } catch (error) {
        console.error("Verify Payment Error:", error.response?.data || error.message);
        res.status(500).json({ success: false, message: 'Status verification failed' });
    }
};


// Ye function pehle se imported Payment model ka use karega
// const Payment = require('../models/payment.model.js'); // Make sure ye upar already hai

// payment.controller.js

exports.getAllPayments = async (req, res) => {
    try {
        // Extract query parameters
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search || "";
        
        const skip = (page - 1) * limit;

        // 🔍 Search filter construct karein
        // Hum amount ko bhi string based regex match ke liye check karna chahte the, 
        // par MongoDB me Number ko directly string regex se filter nahi kar sakte without extra processing.
        // Usually OrderID, Name, Email pehl filter hoti hai. Agar aapko exact amount match karwana ho:
        
        let searchFilter = {};
        
        if (search) {
             // Check karein kya search term puri tarah numeric hai
            const isNumericSearch = !isNaN(search) && search.trim() !== "";

            searchFilter = {
                $or: [
                    { firstName: { $regex: search, $options: "i" } },
                    { lastName: { $regex: search, $options: "i" } },
                    { email: { $regex: search, $options: "i" } },
                    { orderId: { $regex: search, $options: "i" } }
                ]
            };
            
            // Agar number hai to amount parameter mein exact match ke liye bhi push karein
            if (isNumericSearch) {
                 searchFilter.$or.push({ amount: Number(search) });
            }
        }

        // Total records check
        const totalPayments = await Payment.countDocuments(searchFilter);

        // Fetch records with limit, skip and search
        const payments = await Payment.find(searchFilter)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        res.status(200).json({
            success: true,
            pagination: {
                total: totalPayments,
                page,
                limit,
                totalPages: Math.ceil(totalPayments / limit)
            },
            payments
        });

    } catch (error) {
        console.error("Fetch Payments Error:", error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to fetch payments data' 
        });
    }
};



// ==============================================
// 3️⃣ Cashfree Webhook Handler (Direct Verification)
// ==============================================
exports.cashfreeWebhook = async (req, res) => {
    try {
        console.log("\n🔔 [WEBHOOK] Webhook received from Cashfree!");

        // 1. Webhook body se Order ID nikalna
        const orderId = req.body?.data?.order?.order_id;

        if (!orderId) {
            console.log("❌ [WEBHOOK] Order ID missing in webhook payload.");
            return res.status(200).send("Invalid Payload");
        }

        console.log(`🔍 [WEBHOOK] Checking real status for Order ID: ${orderId} directly from Cashfree...`);

        // 2. Cashfree ke server se direct puchenge ki is order ka kya hua (100% Secure)
        const response = await axios.get(`${getCashfreeBaseUrl()}/orders/${orderId}`, {
            headers: getCashfreeHeaders()
        });

        const orderStatus = response.data.order_status; // PAID, FAILED, ACTIVE
        console.log(`✅ [WEBHOOK] Real status from Cashfree is: ${orderStatus}`);

        // 3. Database me status update karna
        const paymentRecord = await Payment.findOne({ orderId: orderId });

        if (paymentRecord) {
            // Agar Cashfree me 'PAID' hai, toh DB me 'SUCCESS' kar do
            if (orderStatus === 'PAID' && paymentRecord.status !== 'SUCCESS') {
                paymentRecord.status = 'SUCCESS';
                await paymentRecord.save();
                console.log(`💾 [WEBHOOK] Database updated to SUCCESS for: ${orderId}`);
            } 
            else if ((orderStatus === 'FAILED' || orderStatus === 'USER_DROPPED') && paymentRecord.status !== 'FAILED') {
                paymentRecord.status = 'FAILED';
                await paymentRecord.save();
                console.log(`💾 [WEBHOOK] Database updated to FAILED for: ${orderId}`);
            } else {
                console.log(`ℹ️ [WEBHOOK] Database already up to date for: ${orderId}`);
            }
        } else {
            console.log(`❌ [WEBHOOK] Order ID not found in database: ${orderId}`);
        }

        // Cashfree ko 200 OK bhej do taaki wo webhook bhejna band kare
        res.status(200).send("Webhook Processed Successfully");

    } catch (error) {
        console.error("❌ [WEBHOOK] Verification Error:", error.response?.data || error.message);
        res.status(500).send("Internal Server Error");
    }
};