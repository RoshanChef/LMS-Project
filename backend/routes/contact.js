const express = require('express');
const { auth } = require('../middleware/auth');
const contact_router = express.Router();

// add contact
contact_router.use(auth);
contact_router.post('/contact', contactUsController);

module.exports = contact_router;