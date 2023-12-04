const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  passwordHash: {
    type: String,
    required: true
  },
});

// UserSchema.virtual('id').get(function() {
//   return this._id.toHexString();
// });

// UserSchema.set('toJSON', {
//   virtuals: true,
// });


module.exports = mongoose.model('User', UserSchema);