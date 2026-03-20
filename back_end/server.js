require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authroutes = require('../route/authroutes.js');
const app = express();

app.use(cors()); // WHY: Stops the "CORS error" by telling the browser React is a friend.
app.use(express.json()); // WHY: Translates incoming raw text into JS Objects we can read.
app.use('/api/auth', authroutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("db connected"))
  .catch((err) => console.log("this is your error", err));

app.get('/', (req, res) => {
  res.send("hello world");
})
app.listen(3000, () => {
  console.log("server is running on port 3000");
});