const express = require('express');
const Review = require('../models/Review');
const Movie = require('../models/Movie');
const { authRequired } = require('../middleware/auth');

const router = express.Router({ mergeParams: true });

// POST /api/movies/:id/reviews
router.post('/', authRequired, async (req, res) => {
	try {
		const movieId = req.params.id;
		const { rating, text = '' } = req.body;
		if (!rating) return res.status(400).json({ message: 'Rating is required' });
		const review = await Review.create({ movie: movieId, user: req.user.id, rating, text });
		// Update aggregate on Movie
		const stats = await Review.aggregate([
			{ $match: { movie: review.movie } },
			{ $group: { _id: '$movie', avg: { $avg: '$rating' }, count: { $sum: 1 } } },
		]);
		if (stats[0]) {
			await Movie.findByIdAndUpdate(movieId, {
				averageRating: Number(stats[0].avg.toFixed(2)),
				ratingsCount: stats[0].count,
			});
		}
		res.status(201).json(review);
	} catch (err) {
		if (err.code === 11000) return res.status(409).json({ message: 'You already reviewed this movie' });
		console.error('Create review error', err);
		res.status(500).json({ message: 'Internal server error' });
	}
});

// POST /api/movies/:id/reviews/:reviewId/upvote
router.post('/:reviewId/upvote', authRequired, async (req, res) => {
	try {
		const { reviewId } = req.params;
		const updated = await Review.findByIdAndUpdate(reviewId, { $inc: { upvotes: 1 } }, { new: true });
		if (!updated) return res.status(404).json({ message: 'Review not found' });
		res.json(updated);
	} catch (err) {
		console.error('Upvote review error', err);
		res.status(400).json({ message: 'Invalid id' });
	}
});

// GET /api/movies/:id/reviews
router.get('/', async (req, res) => {
	try {
		const movieId = req.params.id;
		const reviews = await Review.find({ movie: movieId }).populate('user', 'name');
		res.json(reviews);
	} catch (err) {
		console.error('List reviews error', err);
		res.status(500).json({ message: 'Internal server error' });
	}
});

module.exports = router;


