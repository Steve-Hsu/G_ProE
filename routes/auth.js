const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

// Schema
const Company = require('../models/Company');
const User = require('../models/User');

// @route   GET api/auth for company
// @desc    Get logged in user
// @access  Private
router.get('/company', (req, res) => {
  res.send('Get loggoed in user');
});

// @route   POST api/auth for company
// @desc    Register a user
// @access  Public
router.post(
  '/company',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      // Check if database has this company
      let company = await Company.findOne({ email });
      if (!company) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }

      // Check the password
      const isMatch = await bcrypt.compare(password, company.password);
      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }

      // JWT
      // payload : Waht we send to generate a JWT
      const payload = {
        company: {
          id: company.id,
        },
      };

      // Generate JWT
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          // The JWT expires in 1 hour
          expiresIn: 36000,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   GET api/auth for user
// @desc    Get logged in user
// @access  Private
router.get('/', (req, res) => {
  res.send('Get loggoed in user');
});

// @route   POST api/auth for user
// @desc    Register a user
// @access  Public
router.post('/', (req, res) => {
  res.send('Log in user');
});

module.exports = router;
