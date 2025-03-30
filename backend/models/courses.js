const mongoose = require('mongoose');
const { Schema } = mongoose;

const courseSchema = new Schema({
    courseName: { type: String, required: true, trim: true },
    courseDescription: { type: String, required: true, trim: true },
    instructor: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    what_learn: { type: String, required: true, trim: true },
    courseContent: { type: mongoose.Schema.Types.ObjectId, ref: "Section", required: true },
    rate_review: { type: mongoose.Schema.Types.ObjectId, ref: "Rate_review" },
    price: { type: Number, required: true },
    thumbnail: { type: String, require: true, trim: true },
    tag: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Tag" },
    studentEnrolled: [{ type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" }]
})

module.exports = mongoose.model('Course', courseSchema);