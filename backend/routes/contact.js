const express = require('express');
const { auth } = require('../middleware/auth');
const { contactUsController } = require('../controllers/ContactUs');
const contact_router = express.Router();

// add contact
contact_router.post('/contact', contactUsController);

module.exports = contact_router;