const express = require('express');
const { deleteAccount, updateProfile, getAllUserDetails, updateDisplayPicture, getEnrolledCourses, instructorDashboard } = require("../controllers/Profile");
const { auth, isInstructor, isStudent } = require('../middleware/auth');
const profile_router = express.Router();

profile_router.post('/deleteAccount', auth, deleteAccount);
profile_router.put('/updateprofile', auth, updateProfile);
profile_router.get('/getAllUserDetails', auth, getAllUserDetails);

profile_router.post('/updateDisplayPicture', auth, updateDisplayPicture); //updateDisplayPicture
profile_router.get('/getEnrolledCourses',auth, getEnrolledCourses);
profile_router.get('/instructorDashboard', auth, isInstructor, instructorDashboard);

module.exports = profile_router;  