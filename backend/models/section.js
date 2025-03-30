const mongoose = require('mongoose');
const { Schema } = mongoose;

module.exports = mongoose.model('Section', new Schema({
    sectionName: { type: String, required: true },
    subSection: { type: mongoose.Schema.Types.ObjectId, ref: "SubSection", required: true }
}))