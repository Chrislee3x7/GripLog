const User = require('../models/user');
const express = require('express');
const router = express.Router();

// User routes below
router.get(`/`, async (req, res) => {
  // TODO: with the right username/email, should return corresponding user
  const query = { username: req.body.username }
  const user = await User.findOne(query);
  if (!user) {
    // user does not exist
    res.status(500).json({success: false});
  } else {
    res.send(user);
  }
});

// Create new user
router.post(`/`, async (req, res) => {
  // add a new user
  const user = new User({
    username: req.body.username,
    name: req.body.name,
    email: req.body.email,
    passwordHash: req.body.passwordHash
  });
  
  // TODO: field checking
  // make sure email is unique
  // valid name, etc
  const createdUser = await user.save();
  if (!createdUser) {
    res.status(500).json({success: false});
  } else {
    res.status(201).json(createdUser);
  }
});

module.exports = router;