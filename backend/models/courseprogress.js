const mongoose = require('mongoose');
const { Schema } = mongoose;

const courseProgressSchema = new Schema({
    course_id: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
    completedVideos: [{ type: mongoose.Schema.Types.ObjectId, ref: "SubSection" }],
})

module.exports = mongoose.model('CourseProgress', courseProgressSchema);