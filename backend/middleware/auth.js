const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
app.use(cookieParser());

require('dotenv').config();

// auth
const auth = async (req, res, next) => {
    try {
        const token = req.cookies.token
            || req.body.token
            || req.header("Authorization").replace("Bearer ", "");

        // console.log('token ', token);
        if (!token)
            return res.status(401).json({ success: false, message: "Unauthrised access" });

        try {
            const user = jwt.verify(token, process.env.JWT_SECRET);
            req.user = user;
            next();
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: "wrong token passed",
                error: error.message
            })
        }

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "authentication failed here",
            error: error.message
        })
    }
}

// isStudent
const isStudent = async (req, res, next) => {
    try {
        if (req.user.accountType !== "Student")
            return res.status(401).json({ success: false, message: "This route is only for Student" });

        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error
        })
    }
}

// isInstructor
const isInstructor = async (req, res, next) => {
    try {
        if (req.user.accountType !== "Instructor")
            return res.status(401).json({ success: false, message: "This route is only for Instructor" });

        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error
        })
    }
}

// isAdmin
const isAdmin = async (req, res, next) => {
    try {
        if (req.user.accountType !== "Admin")
            return res.status(401).json({ success: false, message: "This route is only for Admin" });

        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error
        })
    }
}

module.exports = { auth, isStudent, isInstructor, isAdmin };