const profile = require("../models/profile");
const User = require('../models/users');
const Course = require('../models/courses');
const { uploadToCloudinary } = require("../utils/imageUpload");
const courseprogress = require("../models/courseprogress");

// updateProfile 
exports.updateProfile = async (req, res) => {
    try {
        // get data
        const {
            firstName,
            lastName,
            dateOfBirth,
            gender,
            contactNumber,
            about } = req.body;

        // validate data
        if (!gender || !dateOfBirth || !about || !contactNumber) {
            return res.status(400).json({
                success: false,
                message: "All field are required"
            })
        }

        // get user id 
        const id = req.user.id;

        // find user 
        const userDetails = await User.findById(id);

        // update user
        const user = await User.findByIdAndUpdate(id, {
            firstName,
            lastName,
        })

        // find profile
        const ProfileDetails = await profile.findById(userDetails.additionDetail);

        // update profile 
        ProfileDetails.gender = gender;
        ProfileDetails.dateOfBirth = dateOfBirth;
        ProfileDetails.about = about;
        ProfileDetails.ContactNumber = contactNumber;

        await ProfileDetails.save();

        // Find the updated user details
        const updatedUserDetails = await User.findById(id)
            .populate("additionDetail")
            .exec()



        // return response
        res.status(200).json({
            success: true,
            message: "user updated successfully",
            user: updatedUserDetails
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
        await courseprogress.deleteMany({ userId: id })

        // delete User
        const deletedUser = await User.findByIdAndDelete(id);

        // return response
        res.status(200).json({
            success: true,
            message: "User deleted successfully",
            deletedUser
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
        if (!req.files || !req.files.displayPic) {
            return res.status(401).json({
                success: false,
                message: "Please upload a file"
            })
        }
        const userId = req.user.id;

        const displayPic = req.files.displayPic;

        // // upload to clodinary
        const image = await uploadToCloudinary(displayPic, process.env.CLOUDINARY_FOLDER_NAME, 1000, 1000);

        const user = await User.findByIdAndUpdate(userId,
            { image: image.secure_url },
            { new: true }
        );

        return res.status(200).json({
            success: true,
            message: "Profile picture updated successfully",
            image: image.secure_url,
            user: user
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error,
            message: "error while updating profile picture"
        })
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
            data: user
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
        console.log(courseDetails);

        const courseData = courseDetails.map((course) => {
            const totalStudentsEnrolled = course.studentEnrolled.length;
            const totalAmountGenerated = totalStudentsEnrolled * course.price;

            // Create a new object with the additional fields
            const courseDataWithStats = {
                _id: course._id,
                courseName: course.courseName,
                courseDescription: course.courseDescription,
                // Include other course properties as needed
                thumbnail: course.thumbnail,
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