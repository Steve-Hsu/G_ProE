const mongoose = require('mongoose');
// Make Mongoose use `findOneAndUpdate()`. Note that this option is `true`
// Check : https://mongoosejs.com/docs/deprecations.html#findandmodify
// by default, you need to set it to false.
mongoose.set('useFindAndModify', false);

const CaseSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'companies',
  },
  style: {
    type: String,
    required: true,
    unique: true,
  },
  client: {
    type: String,
    required: true,
  },
  cWay: {
    type: Array,
    required: true,
    // ColorWay
  },
  size: {
    type: Array,
    required: true,
  },
  // * materials: array, contains the IDs of materials.
  materials: [
    {
      // ColorWay, for which colorWay to use this material
      cWay: {
        type: String,
      },
      size: {
        type: String,
      },
      // Actually this "material" should be an object, however, I want it saved as ID in database. When user need it, it will fetch the object by ID from database to from a complete mateiral on the browser for the user.
      material: {
        type: String,
      },
      color: {
        type: String,
      },
      specForSize: {
        // Such as zip,  L:79cm, the L is sizeOfCloth, the 79cm is specForSize
        type: String,
      },
      cspt: {
        // consumption, The fabric will be float like 1.79, and zip may be 1 or 2
        type: Number,
      },
      unit: {
        // pcs, yd, m, etc. In thw browser, we must constrain the way to enter the unit. It affect how to count the number of the material.
        type: String,
      },
    },
  ],
  date: {
    // The date, this "case" established on the date base, it can be the register date of the case,
    type: Date,
    default: Date.now,
  },
  authorizedUser: [
    {
      // The user generate this case can draw in other users, so they can update this case.
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
    },
  ],
  bomDate: {
    // The date, all material be established. As long as the material info is changed, this date will be dupdate.
    type: Date,
  },
  csptDate: {
    // The date, all the consumption of material be filled out.
    type: Date,
  },
  mpDate: {
    // The date, all the price of materials be filled out.
    type: Date,
  },
  poDate: {
    // The date, all the PO related to this case are completed.
  },
});

module.exports = mongoose.model('case', CaseSchema);
