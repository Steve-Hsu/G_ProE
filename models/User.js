const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  // Crendential of the User
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'companies',
  },
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
    default: false,
  },
  bom: {
    type: Boolean,
    required: true,
    default: false,
  },
  cspt: {
    type: Boolean,
    required: true,
    default: false,
  },
  mp: {
    type: Boolean,
    required: true,
    default: false,
  },
  po: {
    type: Boolean,
    required: true,
    default: false,
  },

  // Date
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('user', UserSchema);
