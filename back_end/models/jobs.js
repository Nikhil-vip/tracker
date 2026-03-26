const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  company: { type: String, required: true },
  role: { type: String, required: true },
  date: { type: Date, default: Date.now }, // Defaults to today if you forget to pick a date
  salary: { type: Number, required: true },

  // CRITICAL: This links the job to the specific User who is logged in
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // This must match the name you gave your User model
    required: true
  }
}, { timestamps: true }); // Automatically adds "createdAt" and "updatedAt"

module.exports = mongoose.model("Job", jobSchema);