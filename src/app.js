const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const authRoutes = require("./routes/auth.routes");
const paymentRoutes = require("./routes/payment.routes");
const membershipRoutes = require("./routes/membership.routes");
const tripInquiryRoutes = require("./routes/tripInquiry.routes");
const welcomeLetterRoutes = require("./routes/welcomeLetter.routes");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/membership", membershipRoutes);
app.use("/api/trip-inquiries", tripInquiryRoutes);
app.use("/api/welcome-letter", welcomeLetterRoutes);

module.exports = app;