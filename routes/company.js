const express = require('express');
const router = express.Router();

// @route   GET api/company
// @desc    Get logged in as a company
// @access  Private
router.get('/', (req, res) => {
  res.send('Get loggoed in as a company');
});

// @route   POST api/company
// @desc    loggin as a company
// @access  Public
router.post('/', (req, res) => {
  res.send('Log in as a company');
});

module.exports = router;
