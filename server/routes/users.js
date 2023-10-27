const User = require('../models/user');
const express = require('express');
const router = express.Router();

// User routes below
router.get('/', async (req, res) => {
  // TODO: with the right username/email, should return corresponding user
  const query = { username: req.body.username }
  const user = await User.findOne(query);
  if (!user) {
    // user does not exist
    res.status(500).json({success: false, message: 'User not found!'});
  } else {
    res.status(200).send(user);
  }
});

// Create new user
router.post('/', async (req, res) => {
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
    res.status(400).json('User could not be created!');
  }
  res.status(201).json(createdUser);
});

// delete User
router.delete('/:id', async (req,res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).send('User ID is invalid!');
  }
  
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) {
    res.status(404).json({success: false, message: 'User not be found!'}); 
  } else {
    res.status(200).json({success: true, message: 'User was successfully deleted.'})
  }
});

module.exports = router;