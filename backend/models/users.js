const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    accountType: {
        type: String,
        enum: ["Admin", "Student", "Instructor"],
        required: true
    },
    mobile: {
        type: String,
        // required: true,
        trim: true
    },
    image: {
        type: String,
        require: true,
        trim: true
    },
    additionDetail: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Profile",
        required: true
    },
    courses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
    }],
    courseProgress: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CourseProgress'
    }],    
    token: {
        type: String
    },
    resetPasswordExpires: {
        type: Date
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const User = mongoose.model('User', userSchema);

module.exports = User;