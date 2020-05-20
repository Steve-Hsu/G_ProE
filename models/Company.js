const mongoose = require('mongoose');

const ComSchema = mongoose.Schema({
  comName: {
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
  },
  userLimit: {
    // defines the company can have how many users
    type: Number,
    default: 5,
  },
  userNum: {
    // defines how many user the company has generated
    type: Number,
    default: 0,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('company', ComSchema);
