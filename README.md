# 1Fi Full Stack Developer Assignment

A premium full-stack product EMI application built with React, Node.js, and MongoDB. This application allows users to explore smartphones and choose from various EMI plans backed by mutual funds.

## Tech Stack
- **Frontend:** React (Vite), Tailwind CSS, Lucide Icons, Axios, React Router
- **Backend:** Node.js, Express, MongoDB, Mongoose
- **Database:** MongoDB Atlas (Cloud)
- **Deployment Ready:** Vercel (Frontend), Render/DigitalOcean (Backend)

## Features
- **Dynamic Product Engine:** All data fetched via APIs from a dedicated database.
- **Advanced Variant Management:** Dynamic selection of Color and Storage with instant price/image updates.
- **Interactive EMI Calculator:** Plans displaying monthly amounts, tenures, interest rates, and cashback rewards.
- **Mutual Fund Theme:** Integrated messaging and UI elements for the 1Fi fintech theme.
- **Responsive & Premium UI:** Desktop and mobile-optimized design with a dark, modern aesthetic.

## Repository Link
- **Clone URL:** `https://github.com/rustyncode/snapmint-assigment.git`

## Setup & Local Development

### 1. Prerequisites
- Node.js (v18+)
- A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster (Localhost is not supported in this version).

### 2. Environment Configuration
#### Backend
Create a `.env` file in the `backend` directory based on `.env.example`:
```env
MONGODB_URI=your_mongodb_connection_string
PORT=5000
```

#### Frontend
Create a `.env` file in the `frontend` directory based on `.env.example`:
```env
VITE_API_URL=http://localhost:5000/api
```

### 3. Backend Setup
```bash
cd backend
npm install
node scripts/seed.js # Population script for Cloud DB
npm start
```

### 4. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## API Endpoints & Example Responses

### Get All Products
`GET /api/products`
```json
[
  {
    "id": "iphone-17-pro",
    "name": "Apple iPhone 17 Pro",
    "image": "/images/iphone-17-pro.jpg",
    "description": "The ultimate iPhone...",
    "variants": [...],
    "emiPlans": [...]
  }
]
```

### Get Product Details
`GET /api/products/iphone-17-pro`
```json
{
  "id": "iphone-17-pro",
  "name": "Apple iPhone 17 Pro",
  "variants": [
    {
      "id": "v1",
      "name": "128GB, Silver",
      "price": 119900,
      "mrp": 129900
    }
  ],
  "emiPlans": [
    {
      "tenure": 6,
      "interestRate": 0,
      "monthlyAmount": 19983
    }
  ]
}
```

## Database Schema

### Product Model
- `id`: String (Unique, slug-based)
- `name`: String
- `description`: String
- `image`: String
- `variants`: Array of Variant Objects
- `emiPlans`: Array of EMI Plan Objects

### Variant Object
- `id`: String
- `name`: String
- `storage`: String
- `color`: String
- `price`: Number
- `mrp`: Number
- `image`: String

### EMI Plan Object
- `id`: String
- `tenure`: Number (Months)
- `interestRate`: Number (%)
- `cashback`: Number
- `monthlyAmount`: Number

---
*Created for the 1Fi Full Stack Developer Assignment.*
