const express = require('express');
const router = express.Router();
const { newjob } = require('../controllers/jobscontroller.js');
const { protect } = require('../middleware/auth.js');
const { getJobs } = require('../controllers/jobscontroller.js'); // New line
// Only keep this line:
const { deleteJob } = require('../controllers/jobscontroller.js'); // New line
router.delete("/delete/:id", protect, deleteJob);
router.post("/newjob", protect, newjob);
router.get("/getall", protect, getJobs); // New line
module.exports = router;