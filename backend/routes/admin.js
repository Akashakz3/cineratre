const express = require('express');
const Movie = require('../models/Movie');
const { authRequired, adminOnly } = require('../middleware/auth');

const router = express.Router();

// POST /api/admin/movies
router.post('/movies', authRequired, adminOnly, async (req, res) => {
	try {
		const movie = await Movie.create(req.body);
		res.status(201).json(movie);
	} catch (err) {
		console.error('Create movie error', err);
		res.status(400).json({ message: 'Invalid movie payload' });
	}
});

// PUT /api/admin/movies/:id
router.put('/movies/:id', authRequired, adminOnly, async (req, res) => {
	try {
		const updated = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
		if (!updated) return res.status(404).json({ message: 'Movie not found' });
		res.json(updated);
	} catch (err) {
		console.error('Update movie error', err);
		res.status(400).json({ message: 'Invalid id or payload' });
	}
});

module.exports = router;


