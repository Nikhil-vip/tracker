const mongoose = require('mongoose');
const userschema = new mongoose.Schema({
  username: { type: String, required: true }, // Add this line
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true }
});
const trackermodel = mongoose.model("tracker", userschema);
module.exports = trackermodel;
