const Problem = require('../models/problem');
const express = require('express');
const router = express.Router();

// Initial route that a Get request will take.
// Visitinghttp://localhost:3000 will yield "hello API!"
// http://localhost:3000/api/v1/problems
router.get(`/`, async (req, res) => {
  // gets all Problems
  const problemList = await Problem.find();
  if (!problemList) {
    res.status(500).json({succes: false});
  }
  res.send(problemList);
});

router.post(`/`, async (req, res) => {
  const problem = new Problem({
    name: req.body.name,
    grade: req.body.grade,
    image: req.body.image,
    attemptCount: req.body.attemptCount
  });

  const createdProblem = await problem.save();
  if (!createdProblem) {
    res.status(500).json({
      error: err,
      success: false
    });
  } else {
    res.status(201).json(createdProblem);
  }
});

module.exports = router;