const mongoose = require('mongoose');
const { Schema } = mongoose;
const Category = mongoose.model('Category', new Schema({
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
    courses: [{
        type: Schema.Types.ObjectId,
        ref: "Course"
    }]
}));
module.exports = Category;