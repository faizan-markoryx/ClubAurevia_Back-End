const nodemailer = require("nodemailer");
const emailTemplates = require("./template");

const MAIL_SETTINGS = {
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.APP_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(MAIL_SETTINGS);

// Common email sender
const sendEmail = async (email, subject, htmlContent) => {
  try {

    if (!email) {
      throw new Error("Recipient email is missing");
    }

    const mailOptions = {
      from: '"Club Aurevia" <pathanfaizan.1999@gmail.com>',
      to: email,
      subject: subject,
      html: htmlContent,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("✅ Email sent:", info.messageId);

    return info;

  } catch (error) {

    console.error("❌ Email send error:", error.message);

    throw error;
  }
};

const emailFunctions = {

  // Welcome Membership Email
  sendWelcomeLetter: async (
    name,
    email,
    phone,
    membershipName,
    membershipPrice,
    memberId
  ) => {

    const html = emailTemplates.membershipWelcomeLetter(
      name,
      email,
      phone,
      membershipName,
      membershipPrice,
      memberId
    );

    return sendEmail(email, "Welcome to Club Aurevia", html);
  },
  
  sendVerifyOtp: async (email, userName, otp) => {

    const html = emailTemplates.verifyOtp(userName, otp);

    return sendEmail(email, "Email Verification OTP", html);
  },
  sendForgotPassword: (email, otp) => {
    const html = emailTemplates.forgotPassword(otp);
    return sendEmail(email, "Forgot Password OTP", html);
  },

};

module.exports = emailFunctions;