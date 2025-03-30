const User = require("../models/User");
const OTP = require("../models/otp");
const otpGenerator = require('otp-generator');

// sendOTP
exports.sendOTP = async (req, res) => {
    try {
        const { email } = req.body;

        // check if user exists
        const user = await User.findOne({ email });

        // user exists
        if (user) {
            return res.status(401).json({
                success: false,
                message: "User Already exists"
            })
        }

        let otp = otpGenerator.generate(6, { upperCaseAlphabets: false, lowerCaseAlphabets: false, specialChars: false });

        let check_otp = await OTP.findOne({ otp }); 

        while (check_otp) {
            otp = otpGenerator.generate(6, { upperCaseAlphabets: false, lowerCaseAlphabets: false, specialChars: false });
            check_otp = await OTP.findOne({ otp });
        }

        let payload = { email, otp };

        const otpBody = await OTP.create(payload);
        res.json({ success: true, message: "OTP sent successfully" });


    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        })
    }
}

// signUp

// Login

// changePassword
