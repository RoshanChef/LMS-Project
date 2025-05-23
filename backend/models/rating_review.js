const mongoose = require('mongoose');
const { Schema } = mongoose;

module.exports = mongoose.model('Rate_review', new Schema({
	user: {
		type: Schema.Types.ObjectId,
		require: true,
		ref: "User"
	},
	rating: { type: Number, require: true },
	review: { type: String, require: true },
	course: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: "Course",
		index: true,
	},
	reviewedAt: { type: Date, default: Date.now }
}))