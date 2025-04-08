const mongoose = require('mongoose');
const { Schema } = mongoose;

module.exports = mongoose.model('Invoices', new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, require: true, ref: "User" },
    courseName: { type: String, require: true },
    address: { type: String, require: true, trim: true },
    pincode: { type: String, require: true, trim: true },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" }
})); 