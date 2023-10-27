const mongoose = require('mongoose');

const AttemptSchema = mongoose.Schema({
  problem_id: {
    type: mongoose.Schema.ObjectId,
    ref: 'Problem',
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  is_send: {
    type: Boolean,
    required: true
  },
});

module.exports = mongoose.model('Attempt', AttemptSchema);