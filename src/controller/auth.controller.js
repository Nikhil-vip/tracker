const usermodel = require('../db/modules/user.module');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
async function register(req, res) {
  const { email, password } = req.body;
}
module.exports = { register }