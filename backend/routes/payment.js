const express = require('express');
const payment_router = express.Router();
const { auth, isStudent } = require('../middleware/auth');
const { createOrder, verifyPayment, sendPaymentSuccessEmail } = require('../controllers/Payment');

payment_router.post("/createOrder", auth, isStudent, createOrder);
payment_router.post("/verifyOrder", auth, isStudent, verifyPayment);
payment_router.post("/sendPaymentSuccessEmail", auth, isStudent, sendPaymentSuccessEmail);

module.exports = payment_router;