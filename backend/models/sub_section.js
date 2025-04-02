const mongoose = require('mongoose');
const { Schema } = mongoose;

module.exports = mongoose.model('SubSection', new Schema({
    title: { type: String, required: true, trim: true },
    timeDuration: { type: String, required: true },
    description: { type: String, required: true, trim: true },
    videoUrl: { type: String, required: true, trim: true }
}));