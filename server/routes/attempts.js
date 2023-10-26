const Attempt = require('../models/attempt');
const express = require('express');
const router = express.Router();

// Attempt routes below
router.get('/', async (req, res) => {
  // get all attempts of a problem that have problem_id requested
  const query = { problem_id: req.body.problem_id }
  const attemptsList = await Attempt.find(query);
  if (!attemptsList) {
    res.status(500).json({success: false});
  } else {
    res.send(attemptsList);
  }
});

router.post('/', async (req, res) => {
  // add a new attempt with problem_id
  const attempt = new Attempt({
    problem_id: req.body.problem_id,
    attemptNumber: req.body.attemptNumber,
    date: req.body.date,
    is_send: req.body.is_send
  });

  const createdAttempt = await attempt.save();
  if (!createdAttempt) {
    res.status(400).send('Attempt could not be created!');
  } else {
    res.status(201).json(createdAttempt);
  }
});

router.delete('/:id', async (req,res) => {
  const attempt = await Attempt.findByIdAndDelete(req.params.id);
  if (!attempt) {
    res.status(404).json({success: false, message: 'Attempt not be found!'}); 
  } else {
    res.status(200).json({success: true, message: 'Attempt was successfully deleted.'})
  }
});

// router.delete('/:id', (req, res) => {
//   Attempt.findByIdAndDelete(req.params.id).then(attempt => {
//     if (!attempt) {
//       return res.status(404).json({success: false, message: 'Attempt not be found!'});
//     }
//     return res.status(200).json({success: true, message: 'Attempt was successfully deleted.'})
//   }).catch(err => {
//     return res.status(400).json({success: false, error: err});
//   });
// });

module.exports = router;