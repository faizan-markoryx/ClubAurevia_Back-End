const express = require("express");
const emailFunctions = require("../helpers/email");
const User = require("../models/user.model");

const router = express.Router();

router.post("/send", async (req, res) => {

    try {

        const {
            name,
            email,
            phone,
            membershipName,
            membershipPrice,
            memberId
        } = req.body;

        await emailFunctions.sendWelcomeLetter(
            name,
            email,
            phone,
            membershipName,
            membershipPrice,
            memberId
        );


        // Find user by email
        const user = await User.findOne({ email });


        if (user) {
            user.welcomeLetter = true;
            await user.save();
        }


        res.status(200).json({
            success: true,
            message: "Email sent successfully"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

});

module.exports = router;