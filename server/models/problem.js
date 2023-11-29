const mongoose = require('mongoose');

const User = require('./user');

const ProblemSchema = mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    default: ''
  },
  grade: {
    type: Number,
    default: -1 // means no grade
  },
  color: {
    type: String,
    required: true
  },
  attemptCount: {
      type: Number,
      default: 0, // Initially 0 and depends on the count of attempts in attempts table
      min: 0,
      max: 255
  },
  sendCount: {
    type: Number,
    default: 0, // Initially 0 and depends on the count of attempts in attempts table
    min: 0,
    max: 255
  },
  images: [{
    type: String,
  }],
  dateStarted: {
    type: Date,
    default: Date.now
  },
  location: {
    type: String,
    required: false
  },
  dateCompleted: {
    type: Date,
    default: 0
  },
  lastAttemptDate: {
    type: Date,
    default: 0
  }
});

ProblemSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

ProblemSchema.set('toJSON', {
  virtuals: true,
});

module.exports = mongoose.model('Problem', ProblemSchema);
