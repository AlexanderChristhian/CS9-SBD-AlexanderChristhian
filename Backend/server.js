require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cloudinary = require('cloudinary').v2;
const rateLimit = require('express-rate-limit'); // Rate limiter
const helmet = require('helmet'); // Security headers
const xss = require('xss-clean'); // Prevent XSS attacks
const { errorHandler } = require('./middlewares/errorHandler'); // Centralized error handler

const app = express();
const PORT = process.env.PORT || 5000;

// Update CORS configuration to allow requests from your frontend
const corsOptions = {
  // Update this to match your frontend URL
  origin: [
    'https://mie-babi-rodotua.vercel.app',
    'https://mie-babi-rodotua-frontend.vercel.app', 
    'http://localhost:5173', 
    'http://localhost:3000'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
};

// Additional CORS handling for preflight requests
app.options('*', cors(corsOptions));

// Middleware
app.use(cors(corsOptions));
app.use(helmet()); // Add security headers
app.use(xss()); // Sanitize inputs
app.use(bodyParser.json());
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests, please try again later.',
  })
);

// Import Routes
const storeRoutes = require('./routes/storeRoutes')();
const userRoutes = require('./routes/userRoutes')();
const itemRoutes = require('./routes/itemRoutes')();
const transactionRoutes = require('./routes/transactionRoutes')();
app.use('/store', storeRoutes);
app.use('/user', userRoutes);
app.use('/item', itemRoutes);
app.use('/transaction', transactionRoutes);

// Centralized error handling middleware
app.use(errorHandler);

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
