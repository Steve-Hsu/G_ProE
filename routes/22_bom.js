const express = require('express');
const router = express.Router();
const authUser = require('../middleware/authUser');
const { check, validationResult } = require('express-validator');

const Case = require('../models/Case');
const User = require('../models/User');

// @route   GET api/bom/user/:id
// @desc    Read the user's cases from database
// @access  Private
router.get('/user', authUser, async (req, res) => {
  res.send('You got bom');
});

// @route   PUT api/bom/:id
// @desc    Update bom in case
// @access  Private
router.put('/:id', authUser, async (req, res) => {
  // Check if the user has authority to update case ---------------------------
  let user = await User.findById(req.user.id);
  if (!user.bom) {
    return res.status(400).json({
      msg: 'Out of authority',
    });
  }

  // Check if the user have the authority to update the case -------------------
  let cases = await Case.findById(req.params.id);
  // If the user is case creator, pass !
  if (cases.user.toString() === req.user.id) {
    // if the user's id is added to authorizedUser of this case, pass !
  } else if (cases.authorizedUser.includes(req.user.id)) {
  } else {
    return res.status(400).json({ msg: 'Not an authorized user.' });
  }

  // Update case and update or generate material ---------------------------------------------------------------
  // req.body, fetch the body of browser.
  const caseFields = { materials: [] };
  caseFields.materials = await req.body.materials;

  //   Build material filed for Schema material
  //   const mFields = {};
  //   if (item) mFields.item = item;
  //   if (spec) mFields.spec = spec;
  //   if (supplier) mFields.supplier = supplier;
  //   if (ref_no) mFields.ref_no = ref_no;

  try {
    // Get the id of case from URL by params
    if (!cases)
      return res.status(404).json({
        msg: 'Case not found',
      });

    cases = await Case.findByIdAndUpdate(
      req.params.id,
      {
        $set: caseFields,
      },
      { new: true }
    );

    res.json(cases);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/bom/:id
// @desc    Delete material in bom
// @access  Private
router.delete('/:caseID/:bomID', authUser, async (req, res) => {
  // Check if the user has authority to update case ---------------------------
  let user = await User.findById(req.user.id);
  if (!user.bom) {
    return res.status(400).json({
      msg: 'Out of authority',
    });
  }

  // Check if the user have the authority to update the case -------------------
  let cases = await Case.findById(req.params.caseID);
  // If the user is case creator, pass !
  if (cases.user.toString() === req.user.id) {
    // if the user's id is added to authorizedUser of this case, pass !
  } else if (cases.authorizedUser.includes(req.user.id)) {
  } else {
    return res.status(400).json({ msg: 'Not an authorized user.' });
  }
  try {
    // Get the id of the case from URL by params
    let cases = await Case.findById(req.params.caseID);
    if (!cases) return res.status(404).json({ msg: 'Contact not found' });

    // Delete the object in the array materials
    await Case.updateOne(
      { _id: req.params.caseID },
      { $pull: { materials: { _id: req.params.bomID } } },
      function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log('Removed the item');
        }
      }
    );

    res.json({
      msg: 'the material is removed from Bom',
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
