const trackermodel = require('./db/modules/tracker.module');
const usermodel = require('./db/modules/user.module');
const authcontroller = require('./controller/auth.controller');
const express = require('express');
const app = express();
app.use(express.json());
app.use('/api/auth', authroutes);
module.exports = app;