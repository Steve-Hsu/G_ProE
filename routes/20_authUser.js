const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const authUser = require('../middleware/authUser');

// Schema
const User = require('../models/10_User');
const Com = require('../models/00_Company');

// @route   Get api/auth/users
// @desc    Get logged in as a user
// @access  Private
router.get('/', authUser, async (req, res) => {
  const user = await User.findOne(
    { _id: req.user.id },
    { name: 1, comName: 1, comSymbol: 1 }
  );
  const comId = req.user.company;
  const company = await Com.findOne(
    { _id: comId },
    { address: 1, phone: 1, comNameTail: 1 }
  );

  const returnUser = {
    ...user._doc,
    comAddress: company.address,
    comPhone: company.phone,
    comNameTail: company.comNameTail,
  };
  try {
    res.json(returnUser);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/auth/users
// @desc    Auth user & get token
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
          company: user.company,
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

module.exports = router;
