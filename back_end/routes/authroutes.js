const express = require('express');
const router = express.Router();
// Import the "Brain" we just made
const { newuser } = require('../controllers/auth.controller.js');

// Match the URL exactly to what your React app is calling
router.post('/register', newuser);

module.exports = router;