const nodemailer = require("nodemailer");
const getPaymentContent = require('./Email_templates/payment_con');
const getResetContent = require('./Email_templates/resetPass');
const getOtpContent = require('./Email_templates/otpcontent');
const getContactContent = require('./Email_templates/getContactContent');
const getConfirmContent = require("./Email_templates/confirmation");

require('dotenv').config();

async function sendEmail(email, title, type, otp, link, firstname, lastname, message, phoneNo, countrycode) {
    try {
        console.log(email);
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.NODEMAILER_USER,
                pass: process.env.NODEMAILER_PASS,
            },
        });

        let content;
        switch (type) {
            case "payment":
                content = getPaymentContent();
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
            case "contact":
                content = getContactContent(firstname, lastname, message, phoneNo);
                break;
        }

        const info = await transporter.sendMail({
            from: process.env.NODEMAILER_USER,
            to: email,
            subject: title,
            html: content
        });
        console.log('mail info ', info);
    }
    catch (error) {
        console.log("error while sending otp via email\n", error);
    }
}

module.exports = sendEmail;