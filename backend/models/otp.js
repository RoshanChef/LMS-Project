const mongoose = require('mongoose');
const sendEmail = require('../utils/sendEmail');
const { Schema } = mongoose;

const otp_schema = new Schema({
    email: {
        type: String,
        trim: true
    },
    otp: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 5 * 60 // Time in seconds (5 Minutes+)
    }
});

otp_schema.pre('save', async function (next) {
    await sendEmail(this.email, "OTP Verification !!", "otp", this.otp);
    next();
});

const OTP = mongoose.model('OTP', otp_schema);

module.exports = OTP;