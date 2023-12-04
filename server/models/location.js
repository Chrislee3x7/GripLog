const mongoose = require('mongoose');

const LocationSchema = mongoose.Schema({
  user_id: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    default: ""
  }
});

module.exports = mongoose.model('Location', LocationSchema);