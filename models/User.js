const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  // Crendential of the User
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,

    // Right of the user
  },
  case: {
    type: Boolean,
    required: true,
  },
  bom: {
    type: Boolean,
    required: true,
  },
  cspt: {
    type: Boolean,
    required: true,
  },
  mp: {
    type: Boolean,
    required: true,
  },
  po: {
    type: Boolean,
    required: true,
  },

  // Date
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('user', UserSchema);
