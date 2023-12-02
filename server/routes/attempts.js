const express = require('express');
const router = express.Router();
const Attempt = require('../models/attempt');
const Problem = require('../models/problem');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

// Attempt routes below
// get all attempts of a problem that have problem_id requested
// router.get('/', async (req, res) => {
//   console.log("req.body: ", req);
//   console.log("got to attempt get!!");
//   // check problem Id first
//   const problem = await Problem.findById(req.body.problem_id);
//   if (!problem) {
//     return res.status(400).send('Problem is invalid!');
//   }

//   const query = { problem_id: req.body.problem_id }
//   const attemptsList = await Attempt.find(query);
//   if (!attemptsList) {
//     return res.status(500).json({success: false});
//   }
//   res.status(200).send(attemptsList);
// });

// get attempts with problem_id requested
router.get('/', async (req, res) => {
  const problemId = req.query.problem_id;
  if (!mongoose.isValidObjectId(problemId)) {
    return res.status(400).send('Problem ID is invalid!');
  }
  const attempts = await Attempt.find({ problem_id: problemId }).select("date isSend notes");
  // if (!attempt) {
  //   return res.status(500).json({success: false});
  // }
  res.status(200).send(attempts);
});

// post new attempt
router.post('/', async (req, res) => {
  // check user_Id first
  // get token 'x-access-token' from header
  const token = req.get('Authorization').split(' ')[1];
  // decode jwt
  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  // get the user from the userId from the decoded jwt
  const userId = await User.findById(decoded.userId).select('_id');
  // console.log("got userId", userId)
  if (!userId) return res.status(400).send('User is invalid!');

  // then check problem Id
  const problemId = req.body.problem_id;
  const problem = await Problem.findById(problemId);
  if (!problem) return res.status(400).send('Problem is invalid!');

  // add a new attempt with problem_id
  const attempt = new Attempt({
    problem_id: problemId,
    date: req.body.date,
    notes: req.body.notes,
    isSend: req.body.isSend
  });

  const createdAttempt = await attempt.save();
  if (!createdAttempt) {
    return res.status(400).send('Attempt could not be created!');
  }

  // console.log("attempt.is_send", attempt.isSend);
  // need to update problem
  // const updateRes = await Problem.findByIdAndUpdate(problemId, { 
  //   attemptCount: problem.attemptCount + 1, 
  //   sendCount: attempt.isSend ? problem.sendCount + 1 : problem.sendCount,
  //   dateCompleted: problem.dateCompleted == 0 && attempt.isSend ? attempt.date : problem.dateCompleted,
  //   lastAttemptDate: attempt.date
  // }, {new: true});

  // console.log(updateRes)

  res.status(201).json(createdAttempt);
});

// delete attempt
router.delete('/', async (req,res) => {
  // check user_Id first
  // get token 'x-access-token' from header
  const token = req.get('Authorization').split(' ')[1];
  // decode jwt
  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  // get the user from the userId from the decoded jwt
  const userId = await User.findById(decoded.userId).select('_id');
  if (!userId) return res.status(400).send('User is invalid!');

  // check if problem id is valid
  if (!mongoose.isValidObjectId(req.body.attempt_id)) {
    return res.status(400).send('Attempt ID is invalid!');
  }

  const attempt = await Attempt.findByIdAndDelete(req.body.attempt_id);
  if (!attempt) {
    return res.status(404).json({success: false, message: 'Attempt not be found!'}); 
  }
  res.status(200).json({success: true, message: 'Attempt was successfully deleted.'})
  
});

// edit attempt
router.put('/', async (req, res) => {
  console.log("got to attempt put")
  // check user_Id first
  // get token 'x-access-token' from header
  const token = req.get('Authorization').split(' ')[1];
  // decode jwt
  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  // get the user from the userId from the decoded jwt
  const userId = await User.findById(decoded.userId).select('_id');
  // console.log("got userId", userId)
  if (!userId) return res.status(400).send('User is invalid!');

  console.log("user id is valid");
  console.log(req.body);
  // does not edit problemId as it should stay the same
  const attempt = await Attempt.findByIdAndUpdate(
    req.body.attempt_id,
    {
      date: req.body.date,
      notes: req.body.notes,
      isSend: req.body.isSend
    },
    { new: true } // means that we want the new updated data to be returned
  );

  if (!attempt) {
    res.status(400).send('Attempt could not be updated!');
  } else {
    res.send(attempt);
  }
});

module.exports = router;