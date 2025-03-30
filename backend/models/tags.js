const mongoose = require('mongoose');
const { Schema } = mongoose;

module.exports = mongoose.model('Tag', new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    course: {
        type: Schema.Types.ObjectId,
        ref: "Course"
    }
}))