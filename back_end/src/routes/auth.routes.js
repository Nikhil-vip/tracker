const express = require('express');
const authcontroller = require('../controller/auth.controller');
const router = express.Router();
const usermodel = require('../db/modules/user.module'); // Match this name below
const bcrypt = require('bcrypt');

const register = async (req, res) => {
  const { email, username, password } = req.body;

  try {
    const userExists = await usermodel.findOne({ email });
    if (userExists) return res.status(400).json({ message: "Email already registered" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new usermodel({
      username,
      email,
      password: hashedPassword
    });

    await newUser.save();
    res.status(201).json({ message: "Registration successful, sir!" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { register }; // Export the function, not the router
module.exports = router;