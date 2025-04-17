const express = require('express');
const payment_router = express.Router();
const { createOrder, verifyPayment, sendPaymentSuccessEmail } = require('../controllers/Payment');
const { auth, isStudent } = require('../middleware/auth');

payment_router.post("/createOrder", createOrder);
payment_router.post("/verifyOrder", verifyPayment);
payment_router.post("/sendPaymentSuccessEmail", auth, isStudent, sendPaymentSuccessEmail);

module.exports = payment_router;