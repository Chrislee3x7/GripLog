const Attempt = require('../models/attempt');
const express = require('express');
const Problem = require('../models/problem');
const router = express.Router();
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

// get attempt with problem_id requested
router.get('/', async (req, res) => {
  const problemId = req.query.problem_id;
  if (!mongoose.isValidObjectId(problemId)) {
    return res.status(400).send('Problem ID is invalid!');
  }
  const attempts = await Attempt.find({ problem_id: problemId}).select("date is_send notes");
  // if (!attempt) {
  //   return res.status(500).json({success: false});
  // }
  res.status(200).send(attempts);
});

// post new attempt
router.post('/', async (req, res) => {
  // check problem Id first
  const problemId = req.query.problem_id;
  const problem = await Problem.findById(problemId);
  if (!problem) return res.status(400).send('Problem is invalid!');

  // add a new attempt with problem_id
  const attempt = new Attempt({
    problem_id: problemId,
    date: req.body.date,
    notes: req.body.notes,
    isSend: req.body.is_send
  });

  const createdAttempt = await attempt.save();
  if (!createdAttempt) {
    return res.status(400).send('Attempt could not be created!');
  }

  console.log("attempt.is_send", attempt.isSend);
  // need to update problem
  const updateRes = await Problem.findByIdAndUpdate(problemId, { 
    attemptCount: problem.attemptCount + 1, 
    sendCount: attempt.isSend ? problem.sendCount + 1 : problem.sendCount,
    dateCompleted: problem.dateCompleted == 0 && attempt.isSend ? attempt.date : problem.dateCompleted,
    lastAttemptDate: attempt.date
  }, {new: true});

  console.log(updateRes)

  res.status(201).json(createdAttempt);
});

// delete attempt
router.delete('/:id', async (req,res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).send('Attempt ID is invalid!');
  }

  const attempt = await Attempt.findByIdAndDelete(req.params.id);
  if (!attempt) {
    return res.status(404).json({success: false, message: 'Attempt not be found!'}); 
  }
  res.status(200).json({success: true, message: 'Attempt was successfully deleted.'})
  
});

// edit attempt
router.put('/:id', async (req, res) => {
  // does not edit problemId as it should stay the same
  const attempt = await Attempt.findByIdAndUpdate(
    req.params.id,
    {
      date: req.body.date,
      notes: req.body.notes,
      is_send: req.body.is_send
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