const mongoose = require('mongoose');

const User = require('./user');

const ProblemSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  grade: {
    type: Number,
    required: true
  },
  color: {
    type: Number,
    required: true
  },
  attemptCount: {
      type: Number,
      required: true
  },
  image: {
    type: String,
    required: false
  },
  // dateStarted: {
  //   type: Date,
  //   required: true
  // },
  location: {
    type: String,
    required: false
  },
  completed: {
    type: Boolean,
    required: true
  }
})

module.exports = mongoose.model('Problem', ProblemSchema);
