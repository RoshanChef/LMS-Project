const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
app.use(cookieParser());
require('dotenv').confit();

// auth
const auth = async (req, res, next) => {
    try {
        const token = res.cookie.token
            || res.header('Authorization').replace('Bearer', '')
            || req.body.token;

        if (!token)
            return res.status(401).json({ success: false, message: "Unauthrised access" });

        try {
            const token = jwt.verify(token, process.env.JWT_SECRET);
            res.token = token;
            next();
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: "wrong token passed"
            })
        }

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error
        })
    }
}

// isStudent
const isStudent = async (req, res, next) => {
    try {
        if (req.token.accountType !== "Student")
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
        if (req.token.accountType !== "Instructor")
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
        if (req.token.accountType !== "Admin")
            return res.status(401).json({ success: false, message: "This route is only for Admin" });

        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error
        })
    }
}

module.exports = { auth, isStudent, isInstructor, isAdmin }