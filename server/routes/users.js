const User = require('../models/user');
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
require('dotenv/config');

// User routes below
// Get all Users
router.get('/', async (req, res) => {
  const userList = await User.find().select('-passwordHash');
  if (!userList) {
    // return no users found
    return res.status(500).json({success: false});
  }
  res.send(userList);
});

// Get user by Id
router.get('/:id', async (req, res) => {
  const user = await User.findById(req.params.id).select('-passwordHash');
  if (!user) {
    //user does not exist
    return res.status(500).json({message: 'User with the given ID was not found!'});
  }
  res.status(200).send(user);
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

// User login route
router.post('/login', async (req, res) => {
  // find user by email
  const user = await User.findOne({email: req.body.email});
  if (!user) {
    return res.status(400).send('User was not found!');
  }
  // now we know user exists
  // check unhashed password with user entered password
  if (!bcrypt.compareSync(req.body.password, user.passwordHash)) {
    return res.status(400).send('Password is wrong!');
  }
  // if the password is correct, provide the user with a jwt
  // that lasts 1 day (can be changed later)
  const token = jwt.sign(
    {
      userId: user.id
    },
    process.env.ACCESS_TOKEN_SECRET,
    {expiresIn: '1d'} // expires in 10s
  );

  res.status(200).send({id: user.id, email: user.email, token: token});
});

// router.post('/logout', async (req, res) => {
//   const cookies = req.cookies;
//   if (!cookies?.jwt) return res.status(204);

//   //res.json({ message: "Cookie cleared" });
// })

// User register route
router.post('/register', async (req, res) => {
  // Try to find user with email, if exists, then cannot create with this email
  // usernames can have duplicates, emails must be unique
  const user = await User.findOne({email: req.body.email}); 
  const secret = process.env.SECRET;
  if (user) {
    return res.status(409).send('A user with this email already exists!');
  }
  let newUser = new User({
    username: req.body.username,
    name: req.body.name,
    email: req.body.email,
    passwordHash: bcrypt.hashSync(req.body.password, 10)
  });

  // TODO: field checking
  // make sure email is unique
  // valid name, etc
  newUser = await newUser.save();
  if (!newUser) {
    return res.status(401).json('User could not be created!');
  }
  
  res.status(201).json(newUser);
});

module.exports = router;