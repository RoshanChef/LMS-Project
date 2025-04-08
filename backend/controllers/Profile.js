const profile = require("../models/profile");
const User = require('../models/users');
const Course = require('../models/courses');
const uploadToCloudinary = require('../utils/imageUpload');
const express = require("express");
const app = express();
const fileUpload = require('express-fileupload');
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));

require('dotenv').config();

// updateProfile 
exports.updateProfile = async (req, res) => {
    try {
        // get data
        const { gender, dateOfBirth, about, ContactNumber } = req.body;

        // validate data
        if (!gender || !dateOfBirth || !about || !ContactNumber) {
            return res.status(400).json({
                success: false,
                message: "All field are required"
            })
        }

        // get user id 
        const id = req.user.id;

        // find user 
        const user = await User.findById(id).populate('additionDetail');

        // find profile
        const ProfileDetails = await profile.findById(user.additionDetail);

        // update profile 
        ProfileDetails.gender = gender;
        ProfileDetails.dateOfBirth = dateOfBirth;
        ProfileDetails.about = about;
        ProfileDetails.ContactNumber = ContactNumber;

        await ProfileDetails.save();

        // return response
        res.status(200).json({
            success: true,
            message: "user updated successfully",
            user
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error updating sub section',
            error: error.message
        })
    }
}

// deleteAccount
exports.deleteAccount = async (req, res) => {
    try {
        // get id
        const id = req.user.id;

        // find user
        const user = await User.findById(id);

        // validate user
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        // delete profile
        await profile.findByIdAndDelete(user.additionDetail);

        // unenroll the user from all courses
        for (const courseId of user.courses) {
            await Course.findByIdAndUpdate(courseId, {
                $pull: { studentEnrolled: user._id }
            })
        }

        // delete courseProgress
        await CourseProgress.deleteMany({ userId: id })

        // delete User
        await User.findByIdAndDelete(id);

        // return response
        res.status(200).json({
            success: true,
            message: "User deleted successfully"
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error while deleting user',
            error: error.message
        })
    }
}

// geting only user's details 
exports.getAllUserDetails = async (req, res) => {
    try {
        const id = req.user.id;

        const user = await User.findById(id)
            .populate('additionDetail')
            .exec();

        return res.status(200).json({
            success: true,
            data: user,
            message: "Data got successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error while getting all user details',
            error: error.message
        })
    }
}

// updating user's Picture
exports.updateDisplayPicture = async (req, res) => {
    try {
        if(req.files)
            console.log("yes")
        // 1. Validate file exists
        if (!req.files || !req.files.displayPicture) {
            return res.status(400).json({
                success: false,
                message: "No file uploaded"
            });
        }
 
        const displayPicture = req.files.displayPicture;
        const userId = req.user.id;

        // 2. Validate file type (optional but recommended)
        const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
        if (!allowedTypes.includes(displayPicture.mimetype)) {
            return res.status(400).json({
                success: false,
                message: "Only JPEG, PNG, and WebP images are allowed"
            });
        }

        // 3. Upload to Cloudinary
        const image = await uploadToCloudinary(
            displayPicture.tempFilePath, // File path from express-fileupload
            process.env.CLOUDINARY_FOLDER_NAME || 'user_uploads', // Fallback folder
            1000, // Width (optional)
            1000  // Height (optional)
        );

        // 4. Update user profile
        const updatedProfile = await User.findByIdAndUpdate(
            userId,
            { image: image.secure_url },
            { new: true }
        ).select('-password'); // Exclude sensitive data

        // 5. Delete temporary file (optional cleanup)
        try {
            await fs.promises.unlink(displayPicture.tempFilePath);
        } catch (cleanupError) {
            console.warn("Could not delete temp file:", cleanupError.message);
        }

        return res.status(200).json({
            success: true,
            message: "Profile picture updated successfully",
            data: {
                imageUrl: image.secure_url,
                user: updatedProfile
            }
        });

    } catch (error) {
        console.error("Profile picture update error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to update profile picture",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// get total Enrolled courses
exports.getEnrolledCourses = async (req, res) => {
    try {

        const id = req.user.id;
        const user = await User.findById(id).populate({
            path: 'courses',
            populate: {
                path: 'courseContent',
                populate: {
                    path: "subSection"
                }
            }
        }).exec();

        return res.status(200).json({
            success: true,

        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error while getting enrolled courses',
            error: error.message
        })

    }
}

// get instructor enrolled courses
exports.instructorDashboard = async (req, res) => {
    try {

        const user_id = req.user.id;
        const courseDetails = await Course.find({ instructor: user_id });

        const courseData = courseDetails.map((course) => {
            const totalStudentsEnrolled = course.studentEnrolled.length;
            const totalAmountGenerated = totalStudentsEnrolled * course.price;

            // Create a new object with the additional fields
            const courseDataWithStats = {
                _id: course._id,
                courseName: course.courseName,
                courseDescription: course.courseDescription,
                // Include other course properties as needed
                totalStudentsEnrolled,
                totalAmountGenerated,
            }

            return courseDataWithStats
        })

        return res.status(200).json({
            success: true,
            message: 'Instructor dashboard',
            coursesDetails: courseData
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error while getting instructor dashboard',
            error: error.message
        })
    }
}