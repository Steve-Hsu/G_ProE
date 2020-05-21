const mongoose = require('mongoose');
// Make Mongoose use `findOneAndUpdate()`. Note that this option is `true`
// Check : https://mongoosejs.com/docs/deprecations.html#findandmodify
// by default, you need to set it to false.
mongoose.set('useFindAndModify', false);

const MaterialSchema = mongoose.Schema({
  item: {
    // it a term to describe the material, such as "fabric", "zip", "snap"
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  spec: {
    type: String,
  },
  Supplier: {
    type: String,
  },
  ref_no: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('material', MaterialSchema);
