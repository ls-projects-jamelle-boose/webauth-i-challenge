var express = require('express');
var router = express.Router();
var Users = require('../models/Users');

/* GET users listing. */
router.get('/', async (req, res, next) => {
  try {
    const getUsers = await Users.find();

    if (!getUsers) res.status(404).json(`No users found.`);
    else res.status(200).json({ getUsers });
  } catch (error) {
    res.status(500).json(`Not implemented.`);
  }
});

module.exports = router;
