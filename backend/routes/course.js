const express = require('express');
const { auth, isAdmin, isStudent, isInstructor } = require('../middleware/auth');
const { createCourse, getAllCourses, getCourseDetails } = require('../controllers/Course');
const { createSection, updateSection, deleteSection } = require('../controllers/Section');
const course_router = express.Router();


// Route for get all courses
course_router.get('/getAllCourses', getAllCourses);
course_router.get('/getCourseDetails', getCourseDetails);

course_router.use(auth);

// Route for create course
course_router.post('/createCourse', isInstructor, createCourse);

// Route for create section 
course_router.post('/createSection', isInstructor, createSection);

// Route for update section
course_router.post('/updateSection', isInstructor, updateSection);

// Route for delete section
course_router.post('/deleteSection', isInstructor, deleteSection);


module.exports = course_router;