const Problem = require('../models/problem');
const express = require('express');
const router = express.Router();

// Initial route that a Get request will take.
// Visiting http://localhost:3000 will yield "hello API!"
// http://localhost:3000/api/v1/problems
router.get(`/`, async (req, res) => {
  // gets all Problems
  const query = { user_id: req.body.user_id }
  const problemList = await Problem.find(query);
  if (!problemList) {
    res.status(500).json({success: false});
  } else {
    res.send(problemList);
  }
});

router.post(`/`, async (req, res) => {
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
    res.status(500).json({success: false});
  } else {
    res.status(201).json(createdProblem);
  }
});

module.exports = router;