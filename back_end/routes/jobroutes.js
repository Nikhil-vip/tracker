const express = require('express');
const router = express.Router();
const { newjob } = require('../controllers/jobscontroller.js');
const { protect } = require('../middleware/auth.js');

// Only keep this line:
router.post("/newjob", protect, newjob);

module.exports = router;