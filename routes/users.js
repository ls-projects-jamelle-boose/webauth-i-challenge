var bcrypt = require('bcrypt');
var express = require('express');
var router = express.Router();
var Users = require('../models/Users');
var restricted = require('../middlewares/restricted');

/* GET users listing. */
router.get('/', restricted, async (req, res, next) => {
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
  var hash = bcrypt.hashSync(body.password, 16);
  body.password = hash;

  try {
    const addUser = await Users.add(body);
    res.status(201).json({ addUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* POST login user */
router.post('/login', async (req, res, next) => {
  const body = req.body;
  const { username, password } = body;
  try {
    const [user] = await Users.findByUsername(username);
    if (user && bcrypt.compareSync(password, user.password)) {
      req.session.user = username;
      console.log('res', res);
      res.status(200).json({ message: `Welcome!` });
    } else if (!user) {
      res.status(401).json({ message: `Invalid username.` });
    } else if (user && !bcrypt.compareSync(password, user.password)) {
      res.status(401).json({ message: `Invalid password.` });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// TODO create LOGOUT route
router.post('/logout', (res, req, next) => {
  try {
  } catch (error) {}
});

module.exports = router;
