const nodemailer = require("nodemailer");
const getPaymentContent = require('./Email_templates/payment_con');
const getResetContent = require('./Email_templates/resetPass');
const getOtpContent = require('./Email_templates/otpcontent');
const getContactContent = require('./Email_templates/getContactContent');

require('dotenv').config();

async function sendEmail(email, title, type, otp, link, firstname, lastname, message, phoneNo, countrycode) {
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
                content = getPaymentContent(title, link);
                break;
            case "reset":
                content = getResetContent(title, link);
                break;
            case "otp":
                content = getOtpContent(title, otp);
                break;
            case "confirm":
                content = getConfirmContent(title, link);
                break;
            case "contact":
                content = getContactContent(title, email, firstname, lastname, message, phoneNo, countrycode);
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