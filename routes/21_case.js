const express = require('express');
const router = express.Router();
const authUser = require('../middleware/authUser');
const { check, validationResult } = require('express-validator');

const Case = require('../models/Case');
const User = require('../models/User');

// @route   GET api/case/user/:id
// @desc    Read the user's cases from database
// @access  Private
router.get('/user', authUser, async (req, res) => {
  try {
    const cases = await Case.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(cases);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/case/company/:id
// @desc    Read the company's cases from database
// @access  Private
router.get('/company', authUser, async (req, res) => {
  try {
    const cases = await Case.find({ company: req.user.company }).sort({
      date: -1,
    });
    res.json(cases);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/case/:id
// @desc    Add a new case to database
// @access  Private
router.post(
  '/',
  [authUser, [check('style', 'Style is required')]],
  async (req, res) => {
    // Check if the user has authority to add a new case --------------------------
    let user = await User.findById(req.user.id);
    if (!user.cases) {
      return res.status(400).json({ msg: 'Out of authority' });
    }

    // Generate case --------------------------------------------
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { style, client, cWay, size, materials } = req.body;
    try {
      const newCase = new Case({
        user: req.user.id,
        company: req.user.company,
        style,
        client,
        cWay,
        size,
        materials,
      });
      // name variable "case" will cause problem, so here name it "nCase"
      const nCase = await newCase.save();

      res.json(nCase);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   PUT api/case/:id
// @desc    Update case
// @Steve   Don't allow to change the name of style. Prevent messing up the jobs of user.
// @access  Private
router.put('/:id', authUser, async (req, res) => {
  // Check if the user has authority to update case ---------------------------
  let user = await User.findById(req.user.id);
  if (!user.cases) {
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

  // Update case ---------------------------------------------------------------
  // req.body, fetch the body of browser.
  const { client, cWay, size, authorizedUser } = req.body;

  // Build contact object
  const caseFields = {};
  if (client) caseFields.client = client;
  if (cWay) caseFields.cWay = cWay;
  if (size) caseFields.size = size;
  if (authorizedUser) caseFields.authorizedUser = authorizedUser;
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
// @desc    Delete bom
// @access  Private
router.delete('/:id', (req, res) => {
  res.send('Delete contacts');
});

module.exports = router;
