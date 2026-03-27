const job = require('../models/jobs.js')
const newjob = async (req, res) => {
  try {
    const { company, role, date, salary } = req.body;

    // CRITICAL: Pull the user ID from your auth middleware
    // This assumes your middleware attaches the user object to 'req'
    const userId = req.user.id;

    const savejob = await job.create({
      company,
      role,
      date,
      salary,
      createdBy: userId // Explicitly link the job to the logged-in user
    });

    res.status(201).json(savejob);
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ message: "Error creating job" });
  }
};
module.exports = { newjob };