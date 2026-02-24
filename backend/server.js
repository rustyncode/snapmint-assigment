const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: ['https://snapmint-clone.vercel.app', 'http://localhost:5173'],
    credentials: true
}));
app.use(express.json());

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI && process.env.NODE_ENV !== 'production') {
    console.error('ERROR: MONGODB_URI is not set. Cloud DB is required.');
    process.exit(1);
}

if (MONGODB_URI) {
    mongoose.connect(MONGODB_URI)
        .then(() => console.log('Connected to Cloud MongoDB'))
        .catch(err => console.error('MongoDB connection error:', err));
}

app.use((req, res, next) => {
    if (!process.env.MONGODB_URI) {
        return res.status(500).json({ error: 'MONGODB_URI not configured in Vercel Environment Variables' });
    }
    next();
});

const productRoutes = require('./routes/productRoutes');
app.get('/', (req, res) => res.send('SNAPMINT Backend API Running'));
app.use('/api/products', productRoutes);

if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;
