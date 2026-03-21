const express = require('express');
const router = express.Router();
// Import BOTH functions from the brain
const { newuser, loginuser } = require('../controllers/authcontroller.js');

router.post('/register', newuser);
router.post('/login', loginuser); // Don't forget the login path!

module.exports = router;