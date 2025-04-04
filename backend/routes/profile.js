const express = require('express');
const { deleteAccount, getAllUserDetails, updateProfile } = require("../controllers/Profile");
const { auth } = require("../middleware/auth");
const profile_router = express.Router();

profile_router.use(auth);

profile_router.get('/getAllUserDetails', getAllUserDetails);
profile_router.delete('/deleteAccount', deleteAccount);
user_router.post('/updateprofile', updateProfile);

module.exports = profile_router;