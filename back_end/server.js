require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
// Make sure this path matches your folder name (route vs routes)
const authroutes = require('./routes/authroutes.js');

const app = express();

// 1. SECURITY & PARSING (Must come BEFORE routes)
app.use(cors());
app.use(express.json());

// 2. ROUTES
app.use('/api/auth', authroutes);

// 3. DATABASE
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("DB Connected, Sir!"))
  .catch((err) => console.log("Connection Error:", err));

app.listen(3000, () => console.log("Server running on port 3000"));