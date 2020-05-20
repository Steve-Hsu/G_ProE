const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const authCom = require('../middleware/authCom');

// Schema
const User = require('../models/User');

// @route   GET api/users
// @desc    Get the list of all user
// @access  Private
router.get('/', authCom, async (req, res) => {
  try {
    const users = await User.find({ company: req.company.id }).sort({
      date: -1,
    });
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/users
// @desc    Register a user
// @access  Public
router.post(
  '/',
  // 1st middleware
  //The [] is a middleware 'express-validator' for checking the values the user enter is in right format or not
  [
    check('name', 'Please add name').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  // 2nd middleware - Only the authrized company can register a new user
  authCom,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }

      user = new User({
        name,
        email,
        password,
        company: req.company.id,
      });

      //bcrypt the password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      // JWT
      const payload = {
        user: {
          id: user.id,
          company: req.company.id,
        },
      };

      // Generate JWT
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
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
      // dispatch({
      //   type: REGISTER_FAIL,
      //   payload: err.response.data.msg,
      // });
    }
  }
);

module.exports = router;
