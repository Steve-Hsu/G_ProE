const express = require('express');
const router = express.Router();
const authUser = require('../middleware/authUser');
const { check, validationResult } = require('express-validator');

const Case = require('../models/Case');

// @route   GET api/cases/:id
// @desc    Read the cases from database
// @access  Private
router.get('/', authUser, async (req, res) => {
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

// @route   POST api/cases/:id
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
        // I want insert the grandparent ID, the company id, but it seems not allow
        // company: req.user.company,
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

// @route   PUT api/bom/:id
// @desc    Update bom
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
