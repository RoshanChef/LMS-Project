const profile = require("../models/profile");
const User = require('../models/users');
const Course = require('../models/courses');
const uploadToCloudinary = require('../utils/imageUpload');

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
        const id = req.token.id;

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
        const id = req.token.id;

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
        const id = req.token.id;

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
        const id = req.token.id;
        const image = req.files.image;

        const imageUrl = await uploadToCloudinary(image, process.env.CLOUDINARY_FOLDER_NAME);

        const updatedUser = await User.findByIdAndUpdate(id,
            { image: imageUrl.secure_url },
            { new: true });

        res.json({
            success: true,
            data: updatedUser
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error while updating display picture',
            error: error.message
        })
    }
}

// get total Enrolled courses
exports.getEnrolledCourses = async (req, res) => {
    try {

        const id = req.token.id;
        const user = await User.findById(id).populate({
            path: 'courses',
            populate: {
                path: 'courseContent',
                populate: {
                    path: "subSection"
                }
            }
        }).exec();

        user = user.toObject();


        var SubsectionLength = 0
        for (var i = 0; i < userDetails.courses.length; i++) {
            let totalDurationInSeconds = 0;
            SubsectionLength = 0;

            for (var j = 0; j < userDetails.courses[i].courseContent.length; j++) {
                totalDurationInSeconds += userDetails.courses[i].courseContent[
                    j
                ].subSection.reduce((acc, curr) => acc + parseInt(curr.timeDuration), 0)
                userDetails.courses[i].totalDuration = convertSecondsToDuration(
                    totalDurationInSeconds
                )
                SubsectionLength +=
                    userDetails.courses[i].courseContent[j].subSection.length
            }

            let courseProgressCount = await CourseProgress.findOne({
                courseID: userDetails.courses[i]._id,
                userId: userId,
            })
            courseProgressCount = courseProgressCount?.completedVideos.length
            if (SubsectionLength === 0) {
                userDetails.courses[i].progressPercentage = 100
            } else {
                // To make it up to 2 decimal point
                const multiplier = Math.pow(10, 2)
                userDetails.courses[i].progressPercentage =
                    Math.round(
                        (courseProgressCount / SubsectionLength) * 100 * multiplier
                    ) / multiplier
            }
        }

        if (!userDetails) {
            return res.status(400).json({
                success: false,
                message: `Could not find user with id: ${userDetails}`,
            })
        }

        return res.status(200).json({
            success: true,
            data: userDetails.courses,
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

        const user_id = req.token.id;
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