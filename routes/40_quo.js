const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const authUser = require('../middleware/authUser');
// Not set up yet, for check the value entered by user at the some specific column
const { check, validationResult } = require('express-validator');

const User = require('../models/10_User');
const Case = require('../models/20_Case');
const SRMtrl = require('../models/30_srMtrl');

// @route   GET api/quo
// @desc    Read the compnay's srMtrl from database
// @access  Private
router.get('/', authUser, async (req, res) => {
  // let dataIsDone_1 = true;
  // let dataIsDone_2 = true;
  // let arr = ["I'm", 'a', 'super', 'smart', 'man'];

  // let promise_1 = new Promise((resolve, reject) => {
  //   if (dataIsDone_1) {
  //     let n = 0;
  //     let string = '';
  //     arr.map((s) => {
  //       new Promise((resolve, reject) => {
  //         setTimeout(() => {
  //           string = string + ' ' + s;
  //           resolve();
  //         }, 3000);
  //       }).then(() => {
  //         n = n + 1;
  //         if (n === arr.length) {
  //           resolve(string);
  //           console.log('what hheppand');
  //         }
  //       });
  //     });
  //   } else {
  //     reject('The reject of promise_1 is triggered');
  //   }
  // });

  // let promise_2 = new Promise((resolve, reject) => {
  //   if (dataIsDone_2) {
  //     resolve('Yes promise_2 is fulfilled');
  //   } else {
  //     reject('The reject of promise_2 is triggered');
  //   }
  // });

  // Promise.all([promise_1, promise_2])
  //   .then((value) => {
  //     console.log(value);
  //   })
  //   .catch((value) => {
  //     console.log(value);
  //   });

  // res.json({ msg: 'this is test' });
  // let test = '1';
  let caseList = await Case.aggregate([
    {
      $match: { company: mongoose.Types.ObjectId(req.user.company) },
    },
    {
      $project: {
        user: 1,
        cNo: 1,
        caseType: 1,
        style: 1,
        client: 1,
        merchandiser: '',
      },
    },
  ]).sort({ date: -1 });

  let insertList = new Promise((resolve, reject) => {
    let n = 0;

    caseList.map(async (c) => {
      await User.findOne(
        { company: req.user.company, _id: c.user },
        { _id: 0, name: 1 }
      ).then(async (result) => {
        if (result) {
          c.userName = await result.name;
          c.style = 'go FXXX yourself';
          console.log(`${c} and ${c.name}`);
        }
        n = n + 1;
        if (n === caseList.length) {
          resolve();
        }
      });
    });
  });

  try {
    Promise.all([caseList, insertList]).then(async () => {
      console.log('this is list', caseList);
      return res.json(caseList);
    });

    console.log('here in try');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
