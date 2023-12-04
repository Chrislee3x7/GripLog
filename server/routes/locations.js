const express = require('express');
const router = express.Router();
const Location = require('../models/location');
const User = require('../models/user');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const { default: mongoose } = require('mongoose');

// Get all the locations for a given user
router.get('/', async (req, res) => {
  // check user_Id first
  // get token 'x-access-token' from header
  const token = req.get('Authorization').split(' ')[1];
  // decode jwt
  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  // get the user from the userId from the decoded jwt
  const userId = await User.findById(decoded.userId).select('_id');

  // console.log("got userId", userId)
  if (!userId) return res.status(400).send('User is invalid!');

  const query = { user_id: new mongoose.Types.ObjectId(userId) }
  const locations = await Location.find(query);

  return res.status(201).json(locations);
});

router.post('/', async (req, res) => {
  // check user_Id first
  const token = req.get('Authorization').split(' ')[1];
  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  const userId = await User.findById(decoded.userId).select('_id');

  if (!userId) return res.status(400).send('User is invalid!');

  // check that location with this name does not exist with this user already
  const name = req.body.name;

  const location = await Location.find({ user_id: userId, name: name });

  // console.log(location);
  if (location.length > 0) return res.status(400).send('Location already exists for this user')

  const newLocation = new Location({
    user_id: userId,
    name: req.body.name,
  });

  const createdLocation = await newLocation.save();
  if (!createdLocation) {
    return res.status(401).json('Location could not be created!');
  }

  res.status(201).json(createdLocation);
});

module.exports = router;
