const mongoose = require('mongoose');
// Make Mongoose use `findOneAndUpdate()`. Note that this option is `true`
// Check : https://mongoosejs.com/docs/deprecations.html#findandmodify
// by default, you need to set it to false.
mongoose.set('useFindAndModify', false);

const ComSchema = mongoose.Schema({
  comName: {
    type: String,
    required: true,
  },
  comSymbol: {
    // This comSymbol is a shortened name of the company, It will be used when generate document numbers, for example for purchase order or quotations
    type: String,
    required: true,
    unique: true,
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
  userNumLimit: {
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
