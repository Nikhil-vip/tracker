const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authroutes = require('./routes/authroutes.js');
const jobRoutes = require('./routes/jobroutes.js');
require('dotenv').config();

const app = express();

// 1. DYNAMIC CORS (Works for Local & Netlify)
const allowedOrigins = [
  'http://localhost:3000',      // Local React (CRA)
  'http://localhost:5173',      // Local React (Vite)
  'https://questting.netlify.app' // Your Netlify Production URL
];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS, sir.'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

// 2. ROUTES
app.use('/api/auth', authroutes);
app.use('/api/jobs', jobRoutes);

// 3. DATABASE
// Using a variable for URI to ensure it's loaded from .env
const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI)
  .then(() => console.log("DB Connected, Sir!"))
  .catch((err) => console.log("Connection Error:", err));

// 4. PORT LOGIC
// Use process.env.PORT for Vercel/Render, fallback to 5000 for local
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is live on port ${PORT}, Sir!`);
});

// 5. THE VERCEL EXPORT (Must be at the bottom)
module.exports = app;