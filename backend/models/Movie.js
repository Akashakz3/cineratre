const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema(
	{
		title: { type: String, required: true, index: true },
		year: { type: Number, required: true, index: true },
		genres: [{ type: String, index: true }],
		synopsis: { type: String, default: '' },
		cast: [{ type: String }],
		posterUrl: { type: String, default: '' },
		trailerUrl: { type: String, default: '' },
		averageRating: { type: Number, default: 0 },
		ratingsCount: { type: Number, default: 0 },
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Movie', movieSchema);


