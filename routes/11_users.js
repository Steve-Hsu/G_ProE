const express = require('express');
const router = express.Router();
const { check, body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const authCom = require('../middleware/authCom');

// Schema
const Company = require('../models/00_Company');
const User = require('../models/10_User');

// @route   GET api/users
// @desc    Get the list of all user
// @access  Private
router.get('/', authCom, async (req, res) => {
  try {
    const users = await User.find({ company: req.company.id })
      .select('-password')
      .sort({
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
    // body('password2').custom((value, { req }) => {
    //   if (value !== req.body.password) {
    //     throw new Error('Password confirmation does not match password');
    //   }
    //   return true;
    // }),
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
      console.log('Hit User nubmer Limit');
      return res.status(400).json({ msg: 'User is full' });
    }

    // Generate user --------------------------------------------------------------
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('Validation problem');
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, cases, mtrl, cspt, mp, quo, po } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        console.log('User already exist');
        return res.status(400).json({ msg: 'User already exists' });
      }

      //Company Id get from token of the company
      const comId = req.company.id;
      //Insert comSymbol to new user

      const existingUser = await User.findOne({ company: comId });
      const com = await Company.findOne({ _id: comId });

      //Setting Loss
      let loss = {
        sets: [
          { set1: 70 },
          { set2: 200 },
          { set3: 500 },
          { set4: 1000 },
          { set5: 3000 },
        ],
        // set1: 70,
        // set2: 200,
        // set3: 500,
        // set4: 1000,
        // set5: 3000,
        elastic: {
          loss1: 0.05,
          loss2: 0.05,
          loss3: 0.05,
          loss4: 0.05,
          loss5: 0.05,
          loss6: 0.05,
        },
        fabric: {
          loss1: 0.04,
          loss2: 0.025,
          loss3: 0.02,
          loss4: 0.015,
          loss5: 0.01,
          loss6: 0.01,
        },
        insulation: {
          loss1: 0.03,
          loss2: 0.02,
          loss3: 0.015,
          loss4: 0.01,
          loss5: 0.01,
          loss6: 0.01,
        },
        interfacing: {
          loss1: 0.03,
          loss2: 0.02,
          loss3: 0.015,
          loss4: 0.01,
          loss5: 0.01,
          loss6: 0.01,
        },
        knit: {
          loss1: 0.06,
          loss2: 0.04,
          loss3: 0.035,
          loss4: 0.03,
          loss5: 0.02,
          loss6: 0.02,
        },
        label: {
          loss1: 0.01,
          loss2: 0.01,
          loss3: 0.01,
          loss4: 0.01,
          loss5: 0.01,
          loss6: 0.01,
        },
        thread: {
          loss1: 0.05,
          loss2: 0.05,
          loss3: 0.05,
          loss4: 0.05,
          loss5: 0.05,
          loss6: 0.05,
        },
        woven: {
          loss1: 0.04,
          loss2: 0.025,
          loss3: 0.02,
          loss4: 0.015,
          loss5: 0.01,
          loss6: 0.01,
        },
        zipper: {
          loss1: 0.05,
          loss2: 0.03,
          loss3: 0.02,
          loss4: 0.01,
          loss5: 0.01,
          loss6: 0.01,
        },
        other: {
          loss1: 0.01,
          loss2: 0.01,
          loss3: 0.01,
          loss4: 0.01,
          loss5: 0.01,
          loss6: 0.01,
        },
      };
      if (existingUser) {
        loss = existingUser.loss;
      }

      user = new User({
        name: name.toLowerCase(),
        email: email.toLowerCase(),
        password: password.toLowerCase(),
        company: comId,
        comName: com.comName,
        comSymbol: com.comSymbol,
        cases,
        mtrl,
        cspt,
        mp,
        quo,
        po,
        loss: loss,
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
          // res.json({ token });
          // This res.json is for test when in the frontend to get token
        }
      );

      res.json({ msg: 'New User is added' });
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
      // console.log(err.message);
      res.status(500).send('Server Error, Make new user failed');
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
  let userForm = req.body;
  if (userForm.password === '' && userForm.password2 === '') {
    //No password update
    delete userForm.password;
    delete userForm.password2;
    console.log('No password update');
  } else {
    //Update the password
    delete userForm.password2;
    userForm.password = userForm.password.toLowerCase();
    const salt = await bcrypt.genSalt(10);
    userForm.password = await bcrypt.hash(userForm.password, salt);
  }

  try {
    // Get the id from URL by params
    // The method .select('-password) is for not showing the password on result
    let user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    // Make sure company own this user
    if (user.company.toString() !== req.company.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }
    user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: userForm },
      // if there are no this user, just create a new user.
      { new: true }
      // The method .select('-password) is for not showing the password on result
    ).select('-password');
    // console.log(user);
    // res.json(user);
    res.json({ msg: `User ${user.name}Update succssed!` });
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
        console.log('Removed the User');
      }
    });

    res.json({
      msg: 'the User is removed from Bom',
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
