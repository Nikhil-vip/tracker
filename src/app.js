const trackermodel = require('./db/modules/tracker.module');
const express = require('express');
const app = express();
app.post('/', (req, res) => {
  res.send("hello world");
})
module.exports = app;