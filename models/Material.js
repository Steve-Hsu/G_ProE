const mongoose = require('mongoose');

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
