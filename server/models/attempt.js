const mongoose = require('mongoose');

const AttemptSchema = mongoose.Schema({
  // user_id: {
  //   type: mongoose.Schema.ObjectId,
  //   ref: 'User',
  //   required: true
  // },
  problem_id: {
    type: mongoose.Schema.ObjectId,
    ref: 'Problem',
    required: true
  },
  attemptNumber: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  is_send: {
    type: Boolean,
    required: true
  },
});

module.exports = mongoose.model('Attempt', AttemptSchema);