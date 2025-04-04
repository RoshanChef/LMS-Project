const express = require('express');
const payment_router = express.Router();
const { createOrder, verifyPayment } = require('../controllers/Payment');

payment_router.post("/createOrder", createOrder);
payment_router.post("/verifyOrder", verifyPayment);

module.exports = payment_router;