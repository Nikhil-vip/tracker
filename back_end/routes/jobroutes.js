const express = require('express');
const router = express.Router();
const { newjob } = require('../controllers/jobcontroller.js')
router.post("/newjob", newjob)
module.exports = router;