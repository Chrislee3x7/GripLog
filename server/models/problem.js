const mongoose = require('mongoose');

const problemSchema = mongoose.Schema({
  name: String,
  grade: {
    type: Number,
    required: true},
  image: String,
  attemptCount: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Problem', problemSchema);
