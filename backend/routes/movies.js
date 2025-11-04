const express = require('express');
const Movie = require('../models/Movie');

const router = express.Router();

// GET /api/movies?q=&genre=&year=&page=&limit=
router.get('/', async (req, res) => {
	try {
		const {
			q = '',
			genre,
			year,
			page = 1,
			limit = 20,
		} = req.query;

		const filters = {};
		if (q) filters.title = { $regex: q, $options: 'i' };
		if (genre) filters.genres = { $in: genre.split(',') };
		if (year) filters.year = Number(year);

		const pageNum = Math.max(parseInt(page, 10) || 1, 1);
		const pageSize = Math.min(Math.max(parseInt(limit, 10) || 20, 1), 50);

		const [items, total] = await Promise.all([
			Movie.find(filters)
				.sort({ createdAt: -1 })
				.skip((pageNum - 1) * pageSize)
				.limit(pageSize),
			Movie.countDocuments(filters),
		]);

		res.json({ items, total, page: pageNum, limit: pageSize });
	} catch (err) {
		console.error('List movies error', err);
		res.status(500).json({ message: 'Internal server error' });
	}
});

// GET /api/movies/:id
router.get('/:id', async (req, res) => {
	try {
		const movie = await Movie.findById(req.params.id);
		if (!movie) return res.status(404).json({ message: 'Movie not found' });
		res.json(movie);
	} catch (err) {
		console.error('Get movie error', err);
		res.status(400).json({ message: 'Invalid id' });
	}
});

module.exports = router;


