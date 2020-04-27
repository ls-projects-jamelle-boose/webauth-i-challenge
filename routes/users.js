const express = require('express');
const router = express.Router();
const Users = require('../models/Users');
const restricted = require('../middlewares/restricted');

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

module.exports = router;
