const trackermodel = require('./db/modules/tracker.module');
const express = require('express');
const app = express();
app.use(express.json());
app.post('/about', async (req, res) => {
  await res.send("data sent from posttmamn");
})
app.get('/tracker', async (req, res) => {
  await res.send("data sent from gettmamn");
})
module.exports = app;