const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // 1. Import bcrypt

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}, { timestamps: true });

// 2. The "Pre-save" Middleware (The Security Gate)
userSchema.pre('save', async function next() {
  // Only hash the password if it's new or being modified
  if (!this.isModified('password')) return next();

  // Generate a "salt" (random noise) and hash the password
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model('User', userSchema); // Capital 'U' to match your Controller