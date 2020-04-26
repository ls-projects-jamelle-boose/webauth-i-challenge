const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const Users = require('../models/Users');

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

/* POST login user */
router.post('/login', async (req, res, next) => {
  const body = req.body;
  const { username, password } = body;
  try {
    const [user] = await Users.findByUsername(username);
    if (user && bcrypt.compareSync(password, user.password)) {
      req.session.user = username;
      console.log('req.session', req.session);
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

/* GET logout user */
router.get('/logout', (req, res, next) => {
  try {
    if (req.session) {
      req.session.destroy((err) => {
        if (err) {
          res.send(`unable to logout`);
        } else {
          res.send(`logged out.`);
        }
      });
    }
  } catch (error) {
    res.json({ error: error.message });
  }
});

module.exports = router;
