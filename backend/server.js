const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectDB } = require('./config/db');
const moviesRouter = require('./routes/movies');
const authRouter = require('./routes/auth');
const adminRouter = require('./routes/admin');
const reviewsRouter = require('./routes/reviews');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
	res.send('Server running');
});

app.use('/api/auth', authRouter);
app.use('/api/movies', moviesRouter);
app.use('/api/admin', adminRouter);
app.use('/api/movies/:id/reviews', (req, res, next) => {
	req.params.id = req.params.id; // ensure param present
	next();
}, reviewsRouter);

// 404 handler
app.use((req, res) => {
	res.status(404).json({ message: 'Not found' });
});

// Error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
	console.error('Unhandled error', err);
	res.status(500).json({ message: 'Internal server error' });
});

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
	app.listen(PORT, () => console.log(`Server on ${PORT}`));
});


