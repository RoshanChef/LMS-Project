const nodemailer = require("nodemailer");
const getPaymentContent = require('./Email_templates/payment_con');
const getResetContent = require('./Email_templates/resetPass');
const getOtpContent = require('./Email_templates/otpcontent');

require('dotenv').config();

async function sendEmail(email, title, type, link) {
    try {

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.nodemailer_user,
                pass: process.env.nodemailer_pass,
            },
        });

        let content;
        switch (type) {
            case "payment":
                content = getPaymentContent(link);
                break;
            case "reset":
                content = getResetContent(link);
                break;
            case "otp":
                content = getOtpContent(otp);
                break;
            case "confirm":
                content = getConfirmContent(link);
                break;
        }

        const info = await transporter.sendMail({
            from: process.env.nodemailer_user,
            to: email,
            subject: title,
            html: content
        });
        console.log('mail info ', info);
    }
    catch (error) {
        console.log("error while sending otp via email", error);
    }
}

module.exports = sendEmail;