const express = require('express');
const router = express.Router();
const authUser = require('../middleware/authUser');
// Not set up yet, for check the value entered by user at the some specific column
const { check, validationResult } = require('express-validator');

const User = require('../models/10_User');
const Case = require('../models/20_Case');
const SRMtrl = require('../models/30_srMtrl');

// @route   GET api/purchase
// @desc    Read the user's cases from database
// @access  Private
router.get('/mtrls', authUser, async (req, res) => {
  const cases = await Case.find({ user: req.user.id }).sort({
    date: -1,
  });

  try {
    res.json(cases);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/purchase
// @desc    Update materials in mPrice
// @access  Private
router.put('/:caseId', authUser, async (req, res) => {
  // Check if the user has authority to update case ---------------------------
  const userId = req.user.id;
  const comId = req.user.company;
  const caseId = req.params.caseId;
  let user = await User.findById(userId);
  if (!user.cases) {
    return res.status(400).json({
      msg: 'Out of authority',
    });
  }

  // Check if the user have the authority to update the case -------------------
  let cases = await Case.findById(caseId);
  // If the user is case creator, pass !
  if (cases.user.toString() === userId) {
    // if the user's id is added to authorizedUser of this case, pass !
  } else if (cases.authorizedUser.includes(userId)) {
  } else {
    return res.status(400).json({ msg: 'Not an authorized user.' });
  }

  // Update case ---------------------------------------------------------------
  const mLists = req.body;
  // Compare with the existing List
  console.log('Thi is the mLists', mLists);

  try {
    mLists.map(async (mList) => {
      if (mList.CSRIC === '' || mList.CSRIC === null) {
        //IF thie mList dosen't have SRIC, then do nothing.
      } else {
        let srMtrl = await SRMtrl.find({
          $and: [{ company: comId }, { SRIC: mList.CSRIC }],
        });
        try {
          if (srMtrl.length !== 0) {
            mList.mtrlColors.map(async (mtrlColor) => {
              await SRMtrl.find(
                {
                  $and: [
                    { company: comId },
                    { SRIC: mList.CSRIC },
                    //Nest Query, the key word "$elemMatch"
                    {
                      mtrlColors: { $elemMatch: { mColor: mtrlColor.mColor } },
                    },
                  ],
                },
                async function (err, obj) {
                  if (err) {
                    console.log(err);
                  } else if (obj.length === 0) {
                    // if no such mColor in the srMtrl.mtrlColors
                    await SRMtrl.updateOne(
                      {
                        $and: [{ company: comId }, { SRIC: mList.CSRIC }],
                      },
                      {
                        $push: {
                          mtrlColors: mtrlColor,
                        },
                      },
                      { new: true }
                    );
                  } else {
                    // if dose have such mColor in the srMtrl.mtrlColors, insert the ref to the existing mtrlColor
                    mtrlColor.refs.map(async (ref) => {
                      await SRMtrl.updateOne(
                        {
                          $and: [
                            { company: comId },
                            { SRIC: mList.CSRIC },
                            //Nest Query, the key word "$elemMatch"
                            {
                              mtrlColors: {
                                $elemMatch: { mColor: mtrlColor.mColor },
                              },
                            },
                          ],
                        },
                        {
                          $push: {
                            'mtrlColors.$.refs': ref,
                          },
                        },
                        { new: true }
                      );
                    });
                  }
                }
              );
            });
            // Inser SizeSPECS
            mList.sizeSPECs.map(async (sizeSPEC) => {
              await SRMtrl.findOne(
                {
                  $and: [
                    { company: comId },
                    { SRIC: mList.CSRIC },
                    //Nest Query, the key word "$elemMatch"
                    {
                      sizeSPECs: {
                        $elemMatch: { mSizeSPEC: sizeSPEC.mSizeSPEC },
                      },
                    },
                  ],
                },
                async function (err, obj) {
                  // console.log('this is the obj of ', mtrlColor.mColor, obj);
                  if (err) {
                    console.log(err);
                  } else if (obj.length === 0) {
                    // if no such mSizeSPEC in the srMtrl.sizeSPECs
                    await SRMtrl.updateOne(
                      {
                        $and: [{ company: comId }, { SRIC: mList.CSRIC }],
                      },
                      {
                        $push: {
                          sizeSPECs: sizeSPEC,
                        },
                      },
                      { new: true }
                    );
                  } else {
                    // if dose have such mSizeSPEC in the srMtrl.sizeSPECs, insert the ref to the existing sizeSPEC
                    sizeSPEC.refs.map(async (ref) => {
                      await SRMtrl.updateOne(
                        {
                          $and: [
                            { company: comId },
                            { SRIC: mList.CSRIC },
                            //Nest Query, the key word "$elemMatch"
                            {
                              sizeSPECs: {
                                $elemMatch: { mSizeSPEC: sizeSPEC.mSizeSPEC },
                              },
                            },
                          ],
                        },
                        {
                          $push: {
                            'sizeSPECs.$.refs': ref,
                          },
                        },
                        { new: true }
                      );
                    });
                  }
                }
              );
            });

            // return res.json(mPrice);
          } else {
            // If have SRIC then generater a new srMtrl
            const newSRMtrl = new SRMtrl(mList);
            // name variable "case" will cause problem, so here name it "nCase"
            await newSRMtrl.save();
          }
        } catch (err) {
          console.error(err.message);
        }
      }
    });
    console.log('srMtrl List updated');
    return res.json({ msg: 'srMtrl List update' });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
});

// @route   PUT api/purchase/mtrlId
// @desc    Delete the rsMtrl by Mtrl
// @access  Private
router.delete('/:caseId/:mtrlId', authUser, async (req, res) => {
  // Check if the user has authority to update case ---------------------------
  const mtrl = req.body;
  const userId = req.user.id;
  const comId = req.user.company;
  const caseId = req.params.caseId;
  const mtrlId = req.params.mtrlId;
  const SRIC = mtrl.CSRIC;
  let user = await User.findById(userId);
  if (!user.cases) {
    return res.status(400).json({
      msg: 'Out of authority',
    });
  }
  console.log('this is mtrlId', mtrlId);
  console.log('this is comID', comId);
  console.log('this is the SRIC', SRIC);

  // Check if the user have the authority to update the case -------------------
  let cases = await Case.findById(caseId);
  // If the user is case creator, pass !
  if (cases.user.toString() === userId) {
    // if the user's id is added to authorizedUser of this case, pass !
  } else if (cases.authorizedUser.includes(userId)) {
  } else {
    return res.status(400).json({ msg: 'Not an authorized user.' });
  }
  try {
    await SRMtrl.findOne({
      $and: [{ company: comId }, { SRIC: SRIC }],
    });
    await SRMtrl.updateOne(
      {
        $and: [
          { company: comId },
          { SRIC: SRIC },
          {
            'mtrlColors.refs.mtrlId': mtrlId,
          },
        ],
      },
      {
        $pull: {
          'mtrlColors.$.refs': { mtrlId: mtrlId },
        },
      }
    );
    await SRMtrl.updateOne(
      {
        $and: [
          { company: comId },
          { SRIC: SRIC },
          {
            'sizeSPECs.refs.mtrlId': mtrlId,
          },
          {
            'sizeSPECs.refs.caseId': caseId,
          },
        ],
      },
      {
        $pull: { 'sizeSPECs.$.refs': { mtrlId: mtrlId } },
      }
    );
    return res.json({ msg: 'The srMtrl is deleted' });
  } catch (err) {
    console.log('The delete srMtrl is failed');
    return res.json(err);
  }
});

module.exports = router;