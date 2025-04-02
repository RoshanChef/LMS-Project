const profile = require("../models/profile");
const User = require('../models/users');
const Course = require('../models/courses');

exports.updateProfile = async (req, res) => {
    try {
        // get data
        const { gender, dateOfBirth, about, ContactNumber } = req.body;

        // get user id 
        const id = req.token.id;

        // validate data
        if (!gender || !dateOfBirth || !about || !ContactNumber) {
            return res.status(400).json({
                success: false,
                message: "All field are required"
            })
        }

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


//deleteAccount
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

exports.getAllUserDetails = async (req, res) => {
    try {
        const id = req.token.id;

        const user = await User.findById(id).populate('additionDetail').populate('accountType');

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