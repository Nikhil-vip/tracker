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
module.exports = { newjob };