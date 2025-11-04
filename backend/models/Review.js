const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
	{
		movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true, index: true },
		user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
		rating: { type: Number, min: 1, max: 5, required: true },
		text: { type: String, default: '' },
		upvotes: { type: Number, default: 0 },
	},
	{ timestamps: true }
);

reviewSchema.index({ movie: 1, user: 1 }, { unique: true });

module.exports = mongoose.model('Review', reviewSchema);


