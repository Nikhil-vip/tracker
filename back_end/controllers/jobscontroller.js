const Job = require('../models/jobs.js'); // Ensure this matches your filename exactly

const newjob = async (req, res) => {
  try {
    const { company, role, date, salary, status } = req.body;

    // Use .id to match the middleware change above
    const userId = req.user.id;

    const savejob = await Job.create({
      company,
      role,
      date,
      salary,
      status,
      createdBy: userId
    });

    res.status(201).json(savejob);
  } catch (error) {
    res.status(500).json({ message: "Error creating job", error: error.message });
  }
};
// GET all jobs for the logged-in user
const getJobs = async (req, res) => {
  try {
    // We use req.user.id which was set by your 'protect' middleware
    const jobs = await Job.find({ createdBy: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching jobs", error: error.message });
  }
};
const deleteJob = async (req, res) => {
  try {
    const jobId = req.params.id;

    // Find job and ensure it belongs to the logged-in user
    const job = await Job.findOneAndDelete({
      _id: jobId,
      createdBy: req.user.id
    });

    if (!job) {
      return res.status(404).json({ message: "Job not found or unauthorized" });
    }

    res.status(200).json({ message: "Job deleted successfully, sir." });
  } catch (error) {
    res.status(500).json({ message: "Error deleting job", error: error.message });
  }
};
// Export BOTH functions
module.exports = { newjob, getJobs, deleteJob };