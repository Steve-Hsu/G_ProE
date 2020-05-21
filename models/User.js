const mongoose = require('mongoose');
// Make Mongoose use `findOneAndUpdate()`. Note that this option is `true`
// Check : https://mongoosejs.com/docs/deprecations.html#findandmodify
// by default, you need to set it to false.
mongoose.set('useFindAndModify', false);

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
  cases: {
    // case is a keyword in javaScript so here call case as cases.
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
