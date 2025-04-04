const express = require("express");
const { signUp, sendOTP, login, changePassword } = require("../controllers/Auth");
const { auth } = require("../middleware/auth");
const { resetPassword, resetPasswordToken } = require("../controllers/ResetPassword");
const user_router = express.Router();


// ********************************************************************************************************
//                                      Authentication routes
// ********************************************************************************************************


// Route for sending OTP to the user's email
router.post("/sendotp", sendOTP);

// Route for user signup
user_router.post('/signUp', signUp);

// Route for user login
user_router.post('/login', login);

// Route for Changing the password
user_router.post('/changepassowd', auth, changePassword);

// ********************************************************************************************************
//                                      Reset Password
// ********************************************************************************************************

// Route for generating a reset password token and mail it
router.post("/reset-password-token", resetPasswordToken);

// Route for resetting user's password after verification
router.post("/reset-password", resetPassword);


module.exports = user_router;