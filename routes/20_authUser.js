const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

// Schema
const User = require('../models/User');

// @route   POST api/auth for user
// @desc    loggin a user
// @access  Public
router.post(
  '/',
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
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }

      // Check the password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }

      // JWT
      // payload : Waht we send to generate a JWT
      const payload = {
        user: {
          id: user.id,
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
router.get('/company', (req, res) => {
  res.send('Get loggoed in user');
});

module.exports = router;
