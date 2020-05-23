const express = require('express');
const router = express.Router();
const authUser = require('../middleware/authUser');
const { check, validationResult } = require('express-validator');

const Case = require('../models/Case');
const User = require('../models/User');
const MIC = require('../models/MIC');

// @route   GET api/bom/user/:id
// @desc    Read the user's cases from database
// @access  Private
router.get('/user', authUser, async (req, res) => {
  res.send('You got bom');
});

// @route   PUT api/bom/:id
// @desc    Update bom in case
// @access  Private
router.put('/:id', authUser, async (req, res) => {
  // Check if the user has authority to update case ---------------------------
  let user = await User.findById(req.user.id);
  if (!user.bom) {
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
  // Get the id of case from URL by params
  if (!cases)
    return res.status(404).json({
      msg: 'Case not found',
    });

  // Update case and update or generate material ---------------------------------------------------------------
  // req.body, fetch the body of browser.
  async function makefields(body) {
    let caseFields = { materials: [] };
    caseFields.materials = await body;

    // Generate MIC or fatch _id of MIC
    caseFields.materials.forEach(async (m) => {
      if (m.mic) {
        let mic = await MIC.findOne({
          IC: `${m.mic.spec}${m.mic.supplier}${m.mic.ref_no}`
            .toString()
            .toLowerCase()
            .trim(),
        });

        if (!mic) {
          // If not, generate a new mic
          let mic = new MIC({
            item: m.mic.item,
            spec: m.mic.spec,
            supplier: m.mic.supplier,
            ref_no: m.mic.ref_no,
            IC: (m.mic.spec + m.mic.supplier + m.mic.ref_no)
              .toString()
              .toLowerCase()
              .trim(),
          });
          await mic.save();
        }
        console.log('1 - this is No-', m.key, ' mic:', mic);

        // If the mic exist, insert it to the material.mic
        m.mic._id = await mic._id;
        m.mic.item = await mic.item;
        m.mic.spec = await mic.spec;
        m.mic.supplier = await mic.supplier;
        m.mic.ref_no = await mic.ref_no;
      } else {
        console.log("The body don't have mic");
        res.status(500).send('Server Error');
      }
      console.log('2 - this is No-', m.key, ' m.mic:', m.mic);
    });
    return caseFields;
  }

  async function updateDB(field, id) {
    let cases = await Case.findById(id);
    // Generate or Update Materials

    try {
      cases = await Case.findByIdAndUpdate(
        { _id: id },
        {
          $set: field,
          //   $set: { color: 'white' },
        },
        { new: true }
      );
      console.log('4 - write in the dataBase');
      res.json(cases);
    } catch (err) {
      console.log(err);
      res.status(500).send('Server Error');
    }
  }
  const field = await makefields(req.body.materials);
  try {
    updateDB(field, req.params.id);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/bom/:id
// @desc    Delete material in bom
// @access  Private
router.delete('/:caseID/:bomID', authUser, async (req, res) => {
  // Check if the user has authority to update case ---------------------------
  let user = await User.findById(req.user.id);
  if (!user.bom) {
    return res.status(400).json({
      msg: 'Out of authority',
    });
  }

  // Check if the user have the authority to update the case -------------------
  let cases = await Case.findById(req.params.caseID);
  // If the user is case creator, pass !
  if (cases.user.toString() === req.user.id) {
    // if the user's id is added to authorizedUser of this case, pass !
  } else if (cases.authorizedUser.includes(req.user.id)) {
  } else {
    return res.status(400).json({ msg: 'Not an authorized user.' });
  }
  try {
    // Get the id of the case from URL by params
    let cases = await Case.findById(req.params.caseID);
    if (!cases) return res.status(404).json({ msg: 'Contact not found' });

    // Delete the object in the array materials
    await Case.updateOne(
      { _id: req.params.caseID },
      { $pull: { materials: { _id: req.params.bomID } } },
      function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log('Removed the item');
        }
      }
    );

    res.json({
      msg: 'the material is removed from Bom',
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
