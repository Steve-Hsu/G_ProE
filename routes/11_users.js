const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const authCom = require('../middleware/authCom');

// Schema
const User = require('../models/User');
const Company = require('../models/Company');

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
    // check if the user number is out of limit of the company -------------------
    let isUserFull = false;
    await Company.find({ _id: req.company.id }, function (err, obj) {
      const userNumLimit = obj[0].userNumLimit;
      const userNum = obj[0].userNum;
      try {
        if (userNum >= userNumLimit) {
          return (isUserFull = true);
        }
      } catch (err) {
        console.log(err);
      }
    });
    if (isUserFull) {
      return res.status(400).json({ msg: 'User is full' });
    }

    // Generate user --------------------------------------------------------------
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
      // Update the userNum in Company -------------------------------------------
      // If the user added, add 1 for the userNum of the company to restrict the number of user.
      await Company.find({ _id: req.company.id }, function (err, obj) {
        const userNum = obj[0].userNum + 1;
        Company.findOneAndUpdate(
          { _id: req.company.id },
          { $set: { userNum: userNum } },
          function (err, results) {
            if (err) {
              return res.status(500).json({
                msg: 'Server Error, In setting userNum',
              });
            }
          }
        );
        console.log(`New user is set up, userNum is now ${userNum}`);
      });
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

// @route   PUT api/users/:id
// @desc    Update a user
// @Steve   Don't allow the company to update the password of the user. It will prevent some dispution. Whereas the user miss his password, the account will not lock down any function, the company jsut need to create a new account to take care the cases of the order missing accout. Or use another account with same right to take care the cases.
// @access  Private
router.put('/:id', authCom, async (req, res) => {
  const { cases, bom, cspt, mp, po, name, email } = req.body;

  // Build a user object
  const userFields = {};
  if (cases) userFields.cases = cases;
  if (bom) userFields.bom = bom;
  if (cspt) userFields.cspt = cspt;
  if (mp) userFields.mp = mp;
  if (po) userFields.po = po;
  if (name) userFields.name = name;
  if (email) userFields.email = email;

  try {
    // Get the id from URL by params
    let user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    // Make sure company own this user
    if (user.company.toString() !== req.company.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }
    user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: userFields },
      // if there are no this user, just create a new user.
      { new: true }
    );
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/users/:id
// @desc    Delete User
// @access  Private
router.delete('/:id/', authCom, async (req, res) => {
  // Get the id from URL by params
  let user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ msg: 'User not found' });
  // Make sure company own this user --------------------------------------
  if (user.company.toString() !== req.company.id) {
    return res.status(401).json({ msg: 'Not authorized' });
  }

  try {
    // Get the id of the case from URL by params
    let user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    // Delete the User
    await User.deleteOne({ _id: req.params.id }, async function (err) {
      if (err) {
        console.log(err);
      } else {
        // Update the userNum in Company -------------------------------------------
        // If the user deleted, minus 1 for the userNum of the company for restriction of user quantity.
        await Company.find({ _id: req.company.id }, function (err, obj) {
          const userNum = obj[0].userNum - 1;
          Company.findOneAndUpdate(
            { _id: req.company.id },
            { $set: { userNum: userNum } },
            function (err, results) {
              if (err) {
                return res.status(500).json({
                  msg: 'Server Error, In setting userNum',
                });
              }
            }
          );
          console.log(`New user is set up, userNum is now ${userNum}`);
        });
        console.log('Removed the item');
      }
    });

    res.json({
      msg: 'the material is removed from Bom',
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
