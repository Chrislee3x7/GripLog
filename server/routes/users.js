const User = require('../models/user');
const express = require('express');
const router = express.Router();

// User routes below
router.get(`/`, async (req, res) => {
  // TODO: with the right username/email, should return corresponding user
  res.send({
    user: {
      name: Chris,
      username: Chrislee3x7
    }
  });
});

router.post(`/`, async (req, res) => {
  // add a new user
});

module.exports = router;