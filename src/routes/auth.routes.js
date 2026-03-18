const express = require('express');
const authcontroller = require('../controller/auth.controller');
const router = express.Router();
router.post('/register', authcontroller.register);
// C:\Users\nikhi\.vscode\tracker\src\controller\auth.controller.js

const register = async (req, res) => {
  // 1. CATCH the data from the frontend here
  const { email, username, password } = req.body;

  console.log(`Frontend sent: ${email}`);

  try {
    // 2. DO something with it (e.g., check usermodel)
    if (!email || !username || !password) {
      return res.status(400).json({ message: "Please provide all required fields" });
    }

    // 3. SEND a response back to the frontend
    res.status(200).json({ message: "Data received, sir!" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { register };
module.exports = router;