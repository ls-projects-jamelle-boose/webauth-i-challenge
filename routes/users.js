var bcrypt = require('bcrypt');
var express = require('express');
var router = express.Router();
var Users = require('../models/Users');

/* GET users listing. */
router.get('/', async (req, res, next) => {
  try {
    const getUsers = await Users.find();
    if (!getUsers) res.status(404).json(`No users found.`);
    return res.status(200).json({ Users: getUsers });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* POST new user */
router.post('/register', async (req, res) => {
  var body = req.body;
  var hash = bcrypt.hashSync(body.password, 8);
  body.password = hash;

  try {
    const addUser = await Users.add(body);
    res.status(201).json({ addUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
