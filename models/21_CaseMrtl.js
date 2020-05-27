const mongoose = require('mongoose');
// Make Mongoose use `findOneAndUpdate()`. Note that this option is `true`
// Check : https://mongoosejs.com/docs/deprecations.html#findandmodify
// by default, you need to set it to false.
mongoose.set('useFindAndModify', false);

// @desc    Materal belong to cases.
// Steve    The material will be generated after case is created, each materal in the bom (case) will generate 1 material in this collection by this schema. Each materal will be inserted the ID of the case, after the case are moved to purchase order, the materal in this collection of the case should be all deleted. Because we will have another collection to hold all the data of the materals by it MIC, the spec, supplier, and ref_no. 2020/05/26
const CaseMtrlSchema = mongoose.Schema({
  // ColorWay, for which colorWay to use this material
  caseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'cases',
  },
  cWay: [
    {
      // Size of cloth, it should grab the data from Case
      type: String,
    },
  ],
  size: [
    {
      // Size of cloth, it should grab the data from Case
      type: String,
    },
  ],
  item: {
    // it a term to describe the material, such as "fabric", "zip", "snap"
    type: String,
  },
  spec: {
    // -- ** Used to be 1 of the 3 Mics, crucial info of material ** --
    type: String,
  },
  supplier: {
    // -- ** Used to be 1 of the 3 Mics, crucial info of material ** --
    type: String,
    required: true,
  },
  ref_no: {
    // -- ** Used to be 1 of the 3 Mics, crucial info of material ** --
    type: String,
    required: true,
  },
  position: {
    // Which part of the garment use this material.
    type: String,
  },
  description: {
    // Describing how the material used in this garment. This column bascically only for human not for machines to read.
    type: String,
  },
  color: {
    type: String,
  },
  specForSize: [
    {
      // Such as zip,  L:79cm, the L is sizeOfCloth, the 79cm is specForSize
      type: String,
    },
  ],
  unit: {
    // pcs, yd, m, etc. In thw browser, we must constrain the way to enter the unit. It affect how to count the number of the material.
    type: String,
  },
  // Authority for cspt only ----
  cst: [
    {
      // consumption, The fabric will be float like 1.79, and zip may be 1 or 2
      type: Number,
    },
  ],
});
module.exports = mongoose.model('caseMtrl', CaseMtrlSchema);
