const mongoose = require('mongoose');
const { Schema } = mongoose;

const courseSchema = new Schema({
    courseName: { type: String, required: true, trim: true },
    courseDescription: { type: String, required: true, trim: true },
    what_learn: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    thumbnail: { type: String, required: true, trim: true },
    category: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Category" },
    instructor: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    rate_review: [{ type: mongoose.Schema.Types.ObjectId, ref: "Rate_review" }],
    courseContent: [{ type: mongoose.Schema.Types.ObjectId, ref: "Section", }],
    studentEnrolled: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    tag: { type: [String], required: true },
    instruction: {
        type: [String]
    },
    status: {
        type: String,
        enum: ["Draft", "Published"],
        default: "Draft"
    },
})
module.exports = mongoose.model('Course', courseSchema);