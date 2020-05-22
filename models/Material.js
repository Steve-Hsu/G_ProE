const mongoose = require('mongoose');
// Make Mongoose use `findOneAndUpdate()`. Note that this option is `true`
// Check : https://mongoosejs.com/docs/deprecations.html#findandmodify
// by default, you need to set it to false.
mongoose.set('useFindAndModify', false);

const MaterialSchema = mongoose.Schema({
  item: {
    // it a term to describe the material, such as "fabric", "zip", "snap"
    type: String,
  },
  spec: {
    type: String,
  },
  supplier: {
    type: String,
    required: true,
  },
  ref_no: {
    type: String,
    required: true,
  },
  IC: {
    // It will take the spec, supplier, ref_no, to form a unique code. The shorten of Identify Code.
    // Before any new mateiral register to mongoDB, app will check if there are same IC, if yes, instead of creating a new material and taking its ID, app will only take the ID of this existing material and upload to case.
    type: String,
    unique: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('material', MaterialSchema);
