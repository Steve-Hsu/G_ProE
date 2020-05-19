const express = require('express');
const router = express.Router();

// @route   GET api/bom/:id
// @desc    Read the bom from database
// @access  Private
router.get('/', (req, res) => {
  res.send('Get all your own boms');
});

// @route   POST api/bom/:id
// @desc    Add a new bom to database
// @access  Private
router.post('/', (req, res) => {
  res.send('Add new boms');
});

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
