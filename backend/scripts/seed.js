const mongoose = require('mongoose');
const Product = require('../models/Product');
require('dotenv').config();

// STRICT: No localhost fallback. Must use MONGODB_URI from environment.
const MONGODB_URI = process.env.MONGODB_URI;

const products = [
    {
        id: 'iphone-17-pro',
        name: 'Apple iPhone 17 Pro',
        image: '/images/iphone-17-pro.jpg',
        description: 'The ultimate iPhone with the most advanced pro-camera system, A18 Pro chip, and unprecedented battery life.',
        variants: [
            { id: 'ip17-128-silver', name: '128GB, Silver', storage: '128GB', color: 'Silver', price: 119900, mrp: 129900, image: '/images/iphone-17-pro-silver.jpg' },
            { id: 'ip17-256-silver', name: '256GB, Silver', storage: '256GB', color: 'Silver', price: 129900, mrp: 139900, image: '/images/iphone-17-pro-silver.jpg' },
            { id: 'ip17-128-black', name: '128GB, Black', storage: '128GB', color: 'Black', price: 119900, mrp: 129900, image: '/images/iphone-17-pro-black.jpg' },
            { id: 'ip17-512-black', name: '512GB, Black', storage: '512GB', color: 'Black', price: 149900, mrp: 159900, image: '/images/iphone-17-pro-black.jpg' }
        ],
        emiPlans: [
            { id: 'p1', tenure: 6, interestRate: 0, cashback: 2000, monthlyAmount: 19983 },
            { id: 'p2', tenure: 12, interestRate: 10.5, cashback: 0, monthlyAmount: 10500 },
            { id: 'p3', tenure: 24, interestRate: 12, cashback: 5000, monthlyAmount: 5800 }
        ]
    },
    {
        id: 'samsung-s24-ultra',
        name: 'Samsung Galaxy S24 Ultra',
        image: '/images/s24-ultra.jpg',
        description: 'Galaxy AI is here. Welcome to the era of mobile AI. With S Pen, 200MP camera, and Snapdragon 8 Gen 3.',
        variants: [
            { id: 's24u-256-gray', name: '256GB, Titanium Gray', storage: '256GB', color: 'Titanium Gray', price: 129900, mrp: 139900, image: '/images/s24-ultra-gray.jpg' },
            { id: 's24u-512-gray', name: '512GB, Titanium Gray', storage: '512GB', color: 'Titanium Gray', price: 139900, mrp: 149900, image: '/images/s24-ultra-gray.jpg' },
            { id: 's24u-256-black', name: '256GB, Titanium Black', storage: '256GB', color: 'Titanium Black', price: 129900, mrp: 139900, image: '/images/s24-ultra.jpg' }
        ],
        emiPlans: [
            { id: 'p4', tenure: 9, interestRate: 0, cashback: 3000, monthlyAmount: 12211 },
            { id: 'p5', tenure: 18, interestRate: 9.5, cashback: 0, monthlyAmount: 6800 }
        ]
    },
    {
        id: 'pixel-9-pro',
        name: 'Google Pixel 9 Pro',
        image: '/images/pixel-9-pro.jpg',
        description: 'The most powerful Pixel yet, with Gemini built-in, pro-level cameras, and the advanced Tensor G4 chip.',
        variants: [
            { id: 'p9p-128-obsidian', name: '128GB, Obsidian', storage: '128GB', color: 'Obsidian', price: 99900, mrp: 109900, image: '/images/pixel-9-pro-obsidian.jpg' },
            { id: 'p9p-256-obsidian', name: '256GB, Obsidian', storage: '256GB', color: 'Obsidian', price: 109900, mrp: 119900, image: '/images/pixel-9-pro-obsidian.jpg' },
            { id: 'p9p-128-porcelain', name: '128GB, Porcelain', storage: '128GB', color: 'Porcelain', price: 99900, mrp: 109900, image: '/images/pixel-9-pro.jpg' }
        ],
        emiPlans: [
            { id: 'p6', tenure: 3, interestRate: 0, cashback: 1000, monthlyAmount: 33300 },
            { id: 'p7', tenure: 12, interestRate: 8, cashback: 1500, monthlyAmount: 9000 }
        ]
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        await Product.deleteMany({});
        await Product.insertMany(products);
        console.log('Database seeded successfully to Cloud DB');
        process.exit();
    } catch (err) {
        console.error('Seed error:', err);
        process.exit(1);
    }
};

seedDB();
