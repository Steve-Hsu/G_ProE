const express = require('express');
const router = express.Router();
const authUser = require('../middleware/authUser');
// Not set up yet, for check the value entered by user at the some specific column
const { check, validationResult } = require('express-validator');

const Case = require('../models/Case');
const User = require('../models/User');
const CaseMtrl = require('../models/CaseMaterial');

// @route   GET api/mtrl/:caseId
// @desc    Read the materals of the case from database
// @access  Private
router.get('/:caseId', authUser, async (req, res) => {
  try {
    const caseMtrl = await CaseMtrl.find({ caseId: req.params.caseId });
    res.json(caseMtrl);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/mtrl/:caseId
// @desc    Add material to case
// @access  Private
router.post('/:caseId', authUser, async (req, res) => {
  // Check if the user has authority to update case ---------------------------
  let user = await User.findById(req.user.id);
  if (!user.mtrl) {
    return res.status(400).json({
      msg: 'Out of authority',
    });
  }

  // Check if the user have the authority to update this specific case -------------------
  // Get the id of case from URL by params
  let cases = await Case.findById(req.params.caseId);

  // If the case dosen't exist
  if (!cases)
    return res.status(404).json({
      msg: 'Case not found',
    });

  // If the user is case creator, pass !
  if (cases.user.toString() === req.user.id) {
    // if the user's id is added to authorizedUser of this case, pass !
  } else if (cases.authorizedUser.includes(req.user.id)) {
  } else {
    return res.status(400).json({ msg: 'Not an authorized user.' });
  }

  // req.body, fetch the body of browser.
  const {
    cWay,
    size,
    item,
    spec,
    supplier,
    ref_no,
    position,
    description,
    color,
    specForSize,
    unit,
  } = req.body;

  try {
    caseMtrl = new CaseMtrl({
      caseId: req.params.caseId,
      cWay,
      size,
      item,
      spec,
      supplier,
      ref_no,
      position,
      description,
      color,
      specForSize,
      unit,
    });

    await caseMtrl.save();

    console.log('Written in dataBase');
    return res.json(caseMtrl);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
});

// @route   PUT api/mtrl/:caseId/:mtrlId
// @desc    Update case
// @Steve   Don't allow to change the name of style. Prevent messing up the jobs of user.
// @access  Private
router.put('/:caseId/:mtrlId', authUser, async (req, res) => {
  // Check if the user has authority to update case ---------------------------
  let user = await User.findById(req.user.id);
  if (!user.mtrl) {
    return res.status(400).json({
      msg: 'Out of authority',
    });
  }

  // Check if the user have the authority to update the case -------------------
  let cases = await Case.findById(req.params.caseId);
  // Get the id of case from URL by params
  if (!cases)
    return res.status(404).json({
      msg: 'Case not found',
    });

  // If the user is case creator, pass !
  if (cases.user.toString() === req.user.id) {
    // if the user's id is added to authorizedUser of this case, pass !
  } else if (cases.authorizedUser.includes(req.user.id)) {
  } else {
    return res.status(400).json({ msg: 'Not an authorized user.' });
  }

  // Update material ---------------------------------------------------------------
  // req.body, fetch the body of browser.
  const {
    cWay,
    size,
    item,
    spec,
    supplier,
    ref_no,
    position,
    description,
    color,
    specForSize,
    unit,
  } = req.body;

  // Build case object
  const mtrlFields = {};
  if (cWay) mtrlFields.cWay = cWay;
  if (size) mtrlFields.size = size;
  if (item) mtrlFields.item = item;
  if (spec) mtrlFields.spec = spec;
  if (supplier) mtrlFields.supplier = supplier;
  if (ref_no) mtrlFields.ref_no = ref_no;
  if (position) mtrlFields.position = position;
  if (description) mtrlFields.description = description;
  if (color) mtrlFields.color = color;
  if (specForSize) mtrlFields.specForSize = specForSize;
  if (unit) mtrlFields.unit = unit;
  try {
    let caseMtrl = await CaseMtrl.findById(req.params.mtrlId);
    if (!caseMtrl) {
      return res.status(404).json({
        msg: 'Material not found',
      });
    }
    caseMtrl = await CaseMtrl.findByIdAndUpdate(
      req.params.mtrlId,
      {
        $set: mtrlFields,
      },
      { new: true }
    );
    res.json(caseMtrl);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/mtrl/:caseId/:mtrlId
// @desc    Delete material from the case
// @access  Private
router.delete('/:caseId/:mtrlId', authUser, async (req, res) => {
  // Check if the user has authority to update case ---------------------------
  let user = await User.findById(req.user.id);
  if (!user.mtrl) {
    return res.status(400).json({
      msg: 'Out of authority',
    });
  }

  // Check if the user have the authority to update the case -------------------
  let cases = await Case.findById(req.params.caseId);
  // If the case dosen't exist
  if (!cases)
    return res.status(404).json({
      msg: 'Case not found',
    });
  // If the user is case creator, pass !
  if (cases.user.toString() === req.user.id) {
    // if the user's id is added to authorizedUser of this case, pass !
  } else if (cases.authorizedUser.includes(req.user.id)) {
  } else {
    return res.status(400).json({ msg: 'Not an authorized user.' });
  }
  try {
    await CaseMtrl.deleteOne({ _id: req.params.mtrlId });
    res.json({ msg: 'The materal is deleted from the Case' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
