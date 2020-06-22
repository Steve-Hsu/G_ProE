const express = require('express');
const router = express.Router();
const authUser = require('../middleware/authUser');
const { check, validationResult } = require('express-validator');

const User = require('../models/10_User');
const Case = require('../models/20_Case');
const CaseMtrl = require('../models/21_CaseMrtl');

// @route   GET api/case/user
// @desc    Read the user's cases from database
// @access  Private
router.get('/user', authUser, async (req, res) => {
  try {
    const cases = await Case.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(cases);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/case/company
// @desc    Read the company's cases from database
// @access  Private
router.get('/company', authUser, async (req, res) => {
  try {
    const cases = await Case.find({ company: req.user.company }).sort({
      date: -1,
    });
    res.json(cases);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/case/existingcase
// @desc    Read specific case by _id of the case
// @access  Private
router.get('/existingcase/:id', authUser, async (req, res) => {
  try {
    const cases = await Case.find({ _id: req.params.id });
    res.json(cases);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/case/user/newcase
// @desc    Add a new case to database
// @access  Private
router.post(
  '/user/newcase',
  [authUser, [check('style', 'Style is required')]],
  async (req, res) => {
    // Check if the user has authority to add a new case --------------------------
    let user = await User.findById(req.user.id);
    if (!user.cases) {
      return res.status(400).json({ msg: 'Out of authority' });
    }

    // Generate case --------------------------------------------
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { style, client, cWays, sizes, gQtys, mtrls } = req.body;
    const comSymbol = user.comSymbol;

    //Generator newCaseNumber

    //Get last 2 digits of year
    let strDate = new Date(); // By default Date empty constructor give you Date.now
    let shortYear = strDate.getFullYear();
    let twoDigitYear = shortYear.toString().substr(-2); // Add this line

    const cases = await Case.find({
      $and: [
        { company: req.user.company },
        { cNo: { $regex: 'C' + comSymbol + twoDigitYear, $options: 'i' } }, // Query the same cases in same year by cNo, It promises return cases of same company in same year
      ],
    }).sort({
      date: -1,
    });
    let caseQty = 1;
    if (cases.length < 1) {
    } else {
      caseQty = Number(caseQty + cases.length);
    }

    const digits = 5 - caseQty.toString().length;

    const caseNumber = [];
    for (let i = 1; i <= digits; i++) {
      caseNumber.push('0');
    }

    caseNumber.push(caseQty);

    let newCaseNumber = caseNumber.toString().split(',').join('');
    let newCNO = 'C' + comSymbol + twoDigitYear + '_' + newCaseNumber;

    try {
      const newCase = new Case({
        user: req.user.id,
        company: req.user.company,
        cNo: newCNO,
        style,
        client,
        cWays,
        sizes,
        gQtys,
        mtrls,
      });
      // name variable "case" will cause problem, so here name it "nCase"
      const nCase = await newCase.save();

      res.json(nCase);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Errors');
    }
  }
);

// @route   PUT api/case/:id
// @desc    Update case
// @Steve   Don't allow to change the name of style. Prevent messing up the jobs of user.
// @access  Private
router.put('/:id', authUser, async (req, res) => {
  // Check if the user has authority to update case ---------------------------
  let user = await User.findById(req.user.id);
  if (!user.cases) {
    return res.status(400).json({
      msg: 'Out of authority',
    });
  }

  // Check if the user have the authority to update the case -------------------
  let cases = await Case.findById(req.params.id);
  // If the user is case creator, pass !
  if (cases.user.toString() === req.user.id) {
    // if the user's id is added to authorizedUser of this case, pass !
  } else if (cases.authorizedUser.includes(req.user.id)) {
  } else {
    return res.status(400).json({ msg: 'Not an authorized user.' });
  }

  // Update case ---------------------------------------------------------------
  // req.body, fetch the body of browser.
  const { client, cWay, size, authorizedUser } = req.body;

  // Build case object
  const caseFields = {};
  if (client) caseFields.client = client;
  // The 3 varaible below are arries, so if you update you must put new data with old datas all together, or you will only get new data in the database, and old data all deleted.
  if (cWay) caseFields.cWay = cWay;
  if (size) caseFields.size = size;
  if (authorizedUser) caseFields.authorizedUser = authorizedUser;
  try {
    // Get the id of case from URL by params
    if (!cases)
      return res.status(404).json({
        msg: 'Case not found',
      });

    cases = await Case.findByIdAndUpdate(
      req.params.id,
      {
        $set: caseFields,
      },
      { new: true }
    );
    res.json(cases);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/case/:id
// @desc    Delete case
// @Steve   Only the creator of the case have the right to delete the case.
// @access  Private
router.delete('/:id', authUser, async (req, res) => {
  try {
    // Get the id of the case from URL by params
    let cases = await Case.findById(req.params.id);

    if (!cases) return res.status(404).json({ msg: 'Contact not found' });

    // Make sure user owns contact
    if (cases.user.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ msg: 'Not authorized to delete this case' });
    }

    await Case.findByIdAndRemove(req.params.id);
    // Delete the caseMaterials belong to the case
    await CaseMtrl.deleteMany({ caseId: req.params.id });

    res.json({
      msg: 'Case removed',
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
