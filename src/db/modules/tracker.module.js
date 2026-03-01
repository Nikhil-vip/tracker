const mongoose = require('mongoose');
const trackerschema = newmongoose.Schema({
  company: String,
  role: String,
  status: {
    type: String,
    enum: ["applied", "interviewing", "rejected", "accepted"],
    default: "applied"
  },
  date: Date
})
const trackermodel = mongoose.model("tracker", trackerschema);
module.exports = trackermodel;
