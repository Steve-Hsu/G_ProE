const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

// Schema
const Company = require('../models/Company');

// @route   POST api/company
// @desc    Register a user
// @access  Private, I only allow myself access in this page
router.post(
  '/registercomp',
  // The [] is a middleware 'express-validator' for checking the values the user enter is in right format or not
  [
    check('comName', 'Please add name').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { comName, email, password } = req.body;

    try {
      let company = await Company.findOne({ email });

      if (company) {
        return res.status(400).json({ msg: 'User already exists' });
      }

      company = new Company({
        comName,
        email,
        password,
      });

      //bcrypt the password
      const salt = await bcrypt.genSalt(10);
      company.password = await bcrypt.hash(password, salt);

      await company.save();

      //JWT
      //Payload : what we send to generate JSON web token
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
          // the JWT we expires in 1 hour.
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
