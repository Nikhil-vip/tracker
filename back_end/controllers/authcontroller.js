const User = require('../models/user.js'); // Capital 'U' for the Model import
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const newuser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // 1. Check if user already exists (Using the Capital 'U' Model)
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists, sir." });
    }

    // 2. Create the user in MongoDB (Naming the result 'savedUser' to avoid conflict)
    const savedUser = await User.create({
      username,
      email,
      password
    });

    // 3. Generate the Token using the 'savedUser' ID
    const token = jwt.sign(
      { id: savedUser._id },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    // 4. Send EVERYTHING back to React
    return res.status(200).json({
      message: "User registered successfully!",
      token,
      user: {
        id: savedUser._id,
        username: savedUser.username,
        email: savedUser.email
      }
    });

  } catch (error) {
    return res.status(500).json({ message: "Server Error", error: error.message });
  }
};
const loginuser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials, sir." });
    }

    // 2. Compare the entered password with the hashed one in DB
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials, sir." });
    }

    // 3. If match, generate a fresh Token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    // 4. Send response
    res.status(200).json({
      message: "Login successful!",
      token,
      user: { id: user._id, username: user.username, email: user.email }
    });

  } catch (error) {
    return res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Don't forget to export it!
module.exports = { newuser, loginuser };
