const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('ERROR: MONGODB_URI is not set. Cloud DB is required.');
    process.exit(1);
}

mongoose.connect(MONGODB_URI)
    .then(() => console.log('Connected to Cloud MongoDB'))
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });

const productRoutes = require('./routes/productRoutes');
app.use('/api/products', productRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
