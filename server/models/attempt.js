const mongoose = require('mongoose');

const AttemptSchema = mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  problem_id: {
    type: mongoose.Schema.ObjectId,
    ref: 'Problem',
    required: true
  },
  date: {
    type: Date,
    default: Date.now()
  },
  notes:{
    type: String,
    default: ''
  },
  isSend: {
    type: Boolean,
    required: true
  },
});

AttemptSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

AttemptSchema.set('toJSON', {
  virtuals: true,
});

module.exports = mongoose.model('Attempt', AttemptSchema);