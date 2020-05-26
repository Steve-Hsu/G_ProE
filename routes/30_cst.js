const express = require('express');
const router = express.Router();
const authUser = require('../middleware/authUser');
// Not set up yet, for check the value entered by user at the some specific column
const { check, validationResult } = require('express-validator');

const Case = require('../models/Case');
const User = require('../models/User');

// @route   GET api/cspt/user/:id
// @desc    Read the user's cases from database
// @access  Private
router.get('/user', authUser, async (req, res) => {
  res.send('You got bom');
});

// @route   PUT api/cst/:id
// @desc    Update cst in case
// @Steve   Notice: The method PUT have the feature updating entire data, as well as in this route, we instance the req.body.mateirals and push it to the mongoDB, both way are updating entire .materials in collection "case", it means if there are some you don't wnat to update, you have to keep it there with the updated one to be pushed together to the cloud. Or, it will be, similar to be deleted, repalced to be empty. 2020/05/24
// @access  Private
router.put('/:caseID/:materialID', authUser, async (req, res) => {
  // Check if the user has authority to update case ---------------------------
  let user = await User.findById(req.user.id);
  if (!user.cst) {
    return res.status(400).json({
      msg: 'Out of authority',
    });
  }

  // Get the id of materials from URL by params
  // Check if the material exist
  let material = await Case.findById({
    _id: req.params.caseID,
    'materials._id': req.params.materialID,
  });

  // Update entire case.cst and it some are not exist before, just generate it -------------------------------------------
  // req.body, fetch the body of browser.
  const { cst } = req.body;
  const caseFields = {};
  if (cst) caseFields.cst = cst;

  try {
    // Get the id of case from URL by params
    let cases = await Case.findById(req.params.caseID);

    // If the case dosen't exist
    if (!cases)
      return res.status(404).json({
        msg: 'Case not found',
      });

    // Check if the user have the authority to update this specific case -------------------
    // If the user is case creator, pass !
    if (cases.user.toString() === req.user.id) {
      // if the user's id is added to authorizedUser of this case, pass !
    } else if (cases.authorizedUser.includes(req.user.id)) {
    } else {
      return res.status(400).json({ msg: 'Not an authorized user.' });
    }

    // Update cst ----------------------------
    cases = await Case.updateOne(
      { _id: req.params.caseID, 'materials._id': req.params.materialID },
      {
        $set: {
          'materials.$.cst': caseFields.cst,
        },
      },
      { new: true }
    );
    res.json('Cst Updated in database');
    console.log('Written in dataBase');
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
});

module.exports = router;
