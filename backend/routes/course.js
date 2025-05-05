const express = require('express');
const { auth, isAdmin, isStudent, isInstructor } = require('../middleware/auth');
const { createCourse, getAllCourses, getCourseDetails, getFullCourseDetails, getInstructorCourses, editCourse, deleteCourse } = require('../controllers/Course');
const { createSection, updateSection, deleteSection } = require('../controllers/Section');
const { updateCourseProgress } = require('../controllers/CourseProgress');
const { createCategory, getAllCategory, categoryPageDetails } = require('../controllers/Category');
const { createRating, getAllRating, getAvgRating } = require('../controllers/Rating_Review');
const { createSubSection, updatedSubSection, deleteSubSection } = require('../controllers/SubSection');
const course_router = express.Router();


// ********************************************************************************************************
//                                      Course routes
// ********************************************************************************************************
// Route for get all courses
course_router.get('/getAllCourses', getAllCourses);
course_router.post('/getCourseDetails', getCourseDetails);

// Delete a Course
course_router.post("/deleteCourse", auth , deleteCourse)


// Route for create course
course_router.post('/createCourse', auth, isInstructor, createCourse);

// Section
// Route for create section 
course_router.post('/createSection', auth, isInstructor, createSection);

// Route for update section
course_router.post('/updateSection', auth, isInstructor, updateSection);

// Route for delete section
course_router.post('/deleteSection', auth, isInstructor, deleteSection);

// Sub Section 
// Edit Sub Section
course_router.post("/updateSubSection", auth, isInstructor, updatedSubSection)
// Delete Sub Section
course_router.post("/deleteSubSection", auth, isInstructor, deleteSubSection)
// Add a Sub Section to a Section
course_router.post("/addSubSection", auth, isInstructor, createSubSection);


// Get Details for a Specific Courses
course_router.post("/getFullCourseDetails", auth, getFullCourseDetails);
// Edit Course routes
course_router.post("/editCourse", auth, isInstructor, editCourse)

// Get all Courses Under a Specific Instructor
course_router.get("/getInstructorCourses", auth, isInstructor, getInstructorCourses)

course_router.post("/updateCourseProgress", auth, isStudent, updateCourseProgress);


// ********************************************************************************************************
//                                      Category routes (Only by Admin)
// ********************************************************************************************************
// Category can Only be Created by Admin
// TODO: Put IsAdmin Middleware here
course_router.post("/createCategory", auth, isAdmin, createCategory)
course_router.get("/showAllCategories", getAllCategory)
course_router.post("/getCategoryPageDetails", categoryPageDetails)


// ********************************************************************************************************
//                                      Rating and Review
// ********************************************************************************************************
course_router.post("/createRating", auth, isStudent, createRating);
course_router.get("/getAverageRating", getAvgRating);
course_router.get("/getReviews", getAllRating);

module.exports = course_router;