require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
// Make sure this path matches your folder name (route vs routes)
const authroutes = require('./routes/authroutes.js');
const jobRoutes = require('./routes/jobroutes.js');
const corsOptions = {
  origin: 'https://quesstt.netlify.app', // Your specific Netlify URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
  optionsSuccessStatus: 200
};
const app = express();
app.use(cors(corsOptions));



app.use(express.json());

// 2. ROUTES
app.use('/api/auth', authroutes);
app.use('/api/jobs', jobRoutes);
// 3. DATABASE
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("DB Connected, Sir!"))
  .catch((err) => console.log("Connection Error:", err));

app.listen(3000, () => console.log("Server running on port 3000"));