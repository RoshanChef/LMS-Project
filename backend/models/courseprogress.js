const mongoose = require('mongoose');
const { Schema } = mongoose;

const courseProgressSchema = new Schema({
    course_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    completedVideos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubSection"
    }],
})

module.exports = mongoose.model('CourseProgress', courseProgressSchema);