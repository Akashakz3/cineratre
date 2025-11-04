const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectDB } = require('./config/db');

dotenv.config();

const app = express();
app.use(cors());

app.get('/', (req, res) => {
	res.send('Server running');
});

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
	app.listen(PORT, () => console.log(`Server on ${PORT}`));
});


