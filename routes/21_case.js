const express = require('express');
const router = express.Router();
const authUser = require('../middleware/authUser');
const { check, validationResult } = require('express-validator');

const Case = require('../models/Case');

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
// @access  Private
router.put('/:id', (req, res) => {
  res.send('Update a bom');
});

// @route   DELETE api/bom/:id
// @desc    Delete bom
// @access  Private
router.delete('/:id', (req, res) => {
  res.send('Delete contacts');
});

module.exports = router;
