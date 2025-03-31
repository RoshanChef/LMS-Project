const User = require("../models/User");
const OTP = require("../models/otp");
const otpGenerator = require('otp-generator');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwt_secret = process.env.JWT_SECRET;

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

        let otp = otpGenerator.generate(2, { upperCaseAlphabets: false, lowerCaseAlphabets: false, specialChars: false });
        otp = Number.parseInt(`${otp}${crypto.randomInt(1000, 9999)}`);

        // send otp to email
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
exports.signUp = async (req, res) => {
    try {
        const { otp, email, firstName, lastName, password, confirmPassword, accountType, mobile } = req.body;


        // validate data 
        if (!firstName || !lastName || !email || !password || !confirmPassword || !accountType || !mobile || !otp) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the fields"
            })
        }

        // password and confirm password should be same
        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Password and confirm password should be same"
            })
        }

        // check if user exists
        const user = await User.findOne({ email });

        // user exists
        if (user) {
            return res.status(401).json({
                success: false,
                message: "User Already exists"
            })
        }

        const recentOTP = await User.find({ email }).sort({ createdAt: -1 }).limit(1);

        console.log(recentOTP);
        if (recentOTP.length === 0) {
            return res.status(400).json({
                success: false,
                message: "OTP not found"
            })
        } else if (otp !== recentOTP[0].otp) {
            return res.status(400).json({
                success: false,
                message: "invalid OTP"
            })
        }

        // Hash Password
        const hashPassword = await bcrypt.hash(password, 5);

        // Profile
        const profileDetails = await Profile.create({
            gender: null, dateOfBirth: null, about: null, ContactNumber: null
        });

        user = await User.create({
            firstName, lastName, email, password: hashPassword, accountType, mobile, additionDetail: profileDetails._id,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
        });

        return res.json({
            success: true,
            message: 'User is registered'
        })
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "User is not registered",
            error: error
        })
    }
}

// Login


// changePassword
