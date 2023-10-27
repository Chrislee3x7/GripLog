const Problem = require('../models/problem');
const User = require('../models/user');
const express = require('express');
const router = express.Router();

// Initial route that a Get request will take.
// Visiting http://localhost:3000 will yield "hello API!"
// http://localhost:3000/api/v1/problems
router.get('/', async (req, res) => {
  // gets all Problems of this user (only color grade and name)
  // check user_Id first
  const user = await User.findById(req.body.user_id);
  if (!user) return res.status(400).send('User is invalid!');

  const query = { user_id: req.body.user_id }
  const problemList = await Problem.find(query).select('color grade name',);
  if (!problemList) {
    return res.status(500).json({success: false});
  }
  res.status(200).send(problemList);
});

// get problem with _id requested
router.get('/:id', async (req, res) => {
  const problem = await Problem.findById(req.params.id);
  if (!problem) {
    return res.status(500).json({success: false});
  }
  res.status(200).send(problem);
});

// create a new problem
router.post('/', async (req, res) => {
  // check user_Id first
  const user = await User.findById(req.body.user_id);
  if (!user) return res.status(400).send('User is invalid!');

  const problem = new Problem({
    user_id: req.body.user_id,
    name: req.body.name,
    grade: req.body.grade,
    color: req.body.color,
    attemptCount: req.body.attemptCount,
    image: req.body.image,
    location: req.body.location,
    dateCompleted: req.body.dateCompleted
  });

  const createdProblem = await problem.save();
  if (!createdProblem) {
    return res.status(400).send('Problem could not be created!');
  }
  res.status(201).json(createdProblem);
});

// delete a problem
router.delete('/:id', async (req,res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).send('Problem ID is invalid!');
  }
  
  const problem = await Problem.findByIdAndDelete(req.params.id);
  if (!problem) {
    return res.status(404).json({success: false, message: 'Problem not be found!'}); 
  }
  res.status(200).json({success: true, message: 'Problem was successfully deleted.'})
});

// edit a problem
router.put('/:id', async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).send('Problem ID is invalid!');
  }

  const problem = await Problem.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      grade: req.body.grade,
      color: req.body.color,
      location: req.body.location,
      dateCompleted: req.body.dateCompleted
    },
    { new: true } // means that we want the new updated data to be returned
  );

  if (!problem) {
    res.status(400).send('Problem could not be updated!');
  } else {
    res.send(problem);
  }
});

module.exports = router;