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
  },
  // Authorities of the user
  cases: {
    // case is a keyword in javaScript so here call case as cases.
    type: Boolean,
    // required: true,
    // default: false,
  },
  mtrl: {
    // Material,
    type: Boolean,
    // required: true,
    // default: false,
  },
  cst: {
    // consumption of materials, for sample room to fill in
    type: Boolean,
    // required: true,
    // default: false,
  },
  mp: {
    // material price.
    type: Boolean,
    // required: true,
    // default: false,
  },
  po: {
    // purchase order
    type: Boolean,
    // required: true,
    // default: false,
  },

  // Date
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('user', UserSchema);
