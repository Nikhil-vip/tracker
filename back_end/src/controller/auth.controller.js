const usermodel = require('../db/modules/user.module');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const register = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Check if user already exists
    const existingUser = await usermodel.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    // 2. Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Save to DB
    const newUser = new usermodel({ email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = { register }