const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require('cookie-parser');

// CORS middleware with options
app.use(cors({
  origin: 'https://notetaker-client.vercel.app',  // Allow this specific origin
  credentials: true,  // Allow credentials (cookies, etc.)
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],  // Allow these HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],  // Allow specific headers
}));

// Body parsers
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

// Handle preflight (OPTIONS) request globally
app.options('*', cors());  // Enable CORS preflight for all routes

// Routes
const userRouter = require('./routes/user.routes');
app.use('/api/v1/user', userRouter);

module.exports = app;
