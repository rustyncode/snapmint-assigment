const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); // Allow all origins for Vercel dynamic previews
app.use(express.json());

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI && process.env.NODE_ENV !== 'production') {
    console.error('ERROR: MONGODB_URI is not set. Cloud DB is required.');
    process.exit(1);
}

if (MONGODB_URI) {
    mongoose.connect(MONGODB_URI)
        .then(() => console.log('Successfully connected to Cloud MongoDB'))
        .catch(err => {
            console.error('CRITICAL: Cloud MongoDB connection error:', err);
            process.env.DB_STATUS = 'DISCONNECTED';
        });
} else {
    console.error('WARNING: MONGODB_URI is totally missing from environment.');
}

// Middleware to check health
app.use((req, res, next) => {
    if (!process.env.MONGODB_URI) {
        console.error('Environment check failed: MONGODB_URI is missing for request:', req.url);
        // Only return 500 if it's an API route that actually needs the DB
        if (req.url.startsWith('/api/products') || req.url.startsWith('/products/')) {
            return res.status(500).json({
                error: 'Database connection not configured',
                tip: 'Please set MONGODB_URI in your Vercel project environment variables.'
            });
        }
    }
    next();
});

const productRoutes = require('./routes/productRoutes');
app.get('/', (req, res) => res.send('SNAPMINT Backend API Running'));
app.use('/api/products', productRoutes);
app.use('/products', productRoutes); // Support both styles of frontend calls

if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;
