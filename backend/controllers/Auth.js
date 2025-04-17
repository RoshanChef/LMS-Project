const User = require("../models/users");
const OTP = require("../models/otp");
const otpGenerator = require('otp-generator');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const express = require('express');
const profile = require("../models/profile");
const app = express();
app.use(cookieParser());
app.use(express.json());

require('dotenv').config();
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

        let otp = otpGenerator.generate(2, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false
        });

        otp = Number.parseInt(`${otp}${crypto.randomInt(1000, 9999)}`);

        // send otp to email
        let payload = { email, otp };


        await OTP.create(payload);

        res.json({ success: true, message: "OTP sent successfully", otp });

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
        const { otp, email, firstName, lastName, password, accountType, mobile, confirmPassword } = req.body;

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


        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "User already exists"
            });
        }

        // Verify OTP
        const recentOTP = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);

        if (recentOTP.length === 0) {
            return res.status(400).json({
                success: false,
                message: "OTP not found"
            });
        }
        else if (otp !== recentOTP[0].otp) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP"
            });
        }

        // Hash Password
        const hashPassword = await bcrypt.hash(password, 10);

        // Profile
        const profileDetails = await profile.create({
            gender: null,
            dateOfBirth: null,
            about: null,
            ContactNumber: null
        });
        // Generate avatar URL
        const imageUrl = `https://api.dicebear.com/5.x/initials/svg?seed=${encodeURIComponent(firstName)} ${encodeURIComponent(lastName)}`;


        // Create User
        const newUser = await User.create({
            firstName, lastName, email,
            password: hashPassword,
            accountType, mobile,
            additionDetail: profileDetails._id,
            image: imageUrl
        });

        return res.status(201).json({ // Changed to 201 Created
            success: true,
            message: 'User registered successfully',
            user: newUser
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "User is not signUp successfully",
            error: error,
        })
    }
}

// Login
exports.login = async (req, res) => {
    try {
        // get data
        const { email, password } = req.body;

        // validation of data
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the field"
            })
        }

        // chech if user exit
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User Not Found"
            })
        }

        // generate jwt token , after pass check
        const pass_check = await bcrypt.compare(password, user.password);

        if (!pass_check) {
            return res.status(401).json({ success: false, message: "wrong password" });
        }

        const token = jwt.sign({ id: user._id, accountType: user.accountType }, jwt_secret, { expiresIn: '3d' });

        //set cookie
        res.status(200).cookie('token', token, { maxAge: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), httpOnly: true }).json({
            success: true,
            token,
            user,
            message: 'Logged in Successfully'
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "User is not registered",
            error: error
        })
    }
}

// changePassword - I never use this function
exports.changePassword = async (req, res) => {
    try {
        //get data from req body
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: No token provided"
            });
        }

        try {
            const { id } = jwt.verify(token, jwt_secret);
            res.user.id = id;
        } catch (error) {
            res.status(401).json({
                success: false,
                message: "wrong token passed"
            })
        }

        const user = await User.findById(res.user.id);

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not Found"
            })
        }

        // get oldPassword , newPassword , confirmPassword
        const { oldPassword, newPassword } = req.body
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Incorrect password"
            });
        }
        console.log(token);
        // update password in db
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        const result = await User.updateOne({ _id: user._id }, { $set: { password: hashedPassword } });

        // return with response
        return res.status(200).json({
            success: true,
            message: "Password updated successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "User is not registered",
            error: error
        })
    }
}

