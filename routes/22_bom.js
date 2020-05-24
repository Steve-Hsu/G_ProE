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
// @Steve   Notice: The method put have the feature updating entire data, as well as in this route, we instance the req.body.mateirals and push it to the mongoDB, both way are updating entire .materials in collection "case", it means if there are some you don't wnat to update, you have to keep it there with the updated one to be pushed together to the cloud. Or, it will be, similar to be deleted, repalced to be empty. 2020/05/24
// @access  Private
router.put('/:id', authUser, async (req, res) => {
  // Check if the user has authority to update case ---------------------------
  let user = await User.findById(req.user.id);
  if (!user.bom) {
    return res.status(400).json({
      msg: 'Out of authority',
    });
  }

  // Check if the user have the authority to update this specific case -------------------
  // Get the id of case from URL by params
  let cases = await Case.findById(req.params.id);

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

  // Update entire case.materials and it some are not exist before, just generate it -------------------------------------------
  // req.body, fetch the body of browser.
  const caseFields = { materials: [] };
  caseFields.materials = await req.body.materials;

  try {
    cases = await Case.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: caseFields,
        //   $set: { color: 'white' },
      },
      { new: true }
    );

    console.log('Written in dataBase');
    return res.json(cases);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
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
