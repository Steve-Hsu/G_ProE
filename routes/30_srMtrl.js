const express = require('express');
const router = express.Router();
const authUser = require('../middleware/authUser');
// Not set up yet, for check the value entered by user at the some specific column
const { check, validationResult } = require('express-validator');

const User = require('../models/10_User');
const Case = require('../models/20_Case');
const SRMtrl = require('../models/30_srMtrl');

// @route   GET api/srmtrl
// @desc    Read the compnay's srMtrl from database
// @access  Private
router.get('/', authUser, async (req, res) => {
  const srMtrls = await SRMtrl.find({ company: req.user.company }).sort({
    supplier: 1,
    date: -1,
  });

  try {
    res.json(srMtrls);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/srmtrl/queryresult
// @desc    Response to the queried obj
// @access  Private
router.put('/queryresult', authUser, async (req, res) => {
  let body = req.body;
  delete body._id;
  const filed = Object.keys(body);
  const value = Object.values(body);
  const srMtrls = await SRMtrl.find({
    company: req.user.company,
    [filed[0]]: [value[0]],
  }).sort({
    supplier: 1,
    date: -1,
  });

  try {
    res.json(srMtrls);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/srmtrl/:caseId
// @desc    Update refs in srMtrls
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

  // Update srMtrl ---------------------------------------------------------------
  const mLists = req.body;
  // Compare with the existing List

  try {
    mLists.map(async (mList) => {
      if (mList.CSRIC === '' || mList.CSRIC === null) {
        //IF thie mList dosen't have SRIC, then do nothing.
        console.log('CSRIC passed is empty');
      } else {
        //Check if any item in mtrl is matched to refs in the srMtrl database
        let srMtrl = await SRMtrl.find({
          $and: [{ company: comId }, { CSRIC: mList.CSRIC }],
        });
        try {
          if (srMtrl.length !== 0) {
            //@ Insert mtrlColor
            await mList.mtrlColors.map(async (mtrlColor) => {
              let existingMtrlColor = [];
              existingMtrlColor = await SRMtrl.find({
                company: comId,
                CSRIC: mList.CSRIC,
                'mtrlColors.mColor': mtrlColor.mColor,
              });
              if (existingMtrlColor.length === 0) {
                // if no such mColor in the srMtrl.mtrlColors
                await SRMtrl.updateOne(
                  {
                    company: comId,
                    CSRIC: mList.CSRIC,
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
                  // $addToSet, the operatoer only push a unique item to the array. It prevent duplicated value be pushed to the refs
                  await SRMtrl.updateOne(
                    {
                      company: comId,
                      CSRIC: mList.CSRIC,
                      'mtrlColors.mColor': mtrlColor.mColor,
                    },
                    {
                      $addToSet: {
                        'mtrlColors.$.refs': ref,
                      },
                    }
                  );
                });
              }
            });
            //@ Inser SizeSPECS
            await mList.sizeSPECs.map(async (sizeSPEC) => {
              let existingSizeSPEC = [];
              existingSizeSPEC = await SRMtrl.find({
                company: comId,
                CSRIC: mList.CSRIC,
                'sizeSPECs.mSizeSPEC': sizeSPEC.mSizeSPEC,
              });

              if (existingSizeSPEC.length === 0) {
                // if no such mSizeSPEC in the srMtrl.sizeSPECs
                await SRMtrl.updateOne(
                  {
                    company: comId,
                    CSRIC: mList.CSRIC,
                  },
                  {
                    $push: {
                      sizeSPECs: sizeSPEC,
                    },
                  }
                );
              } else {
                // if dose have such sizeSPEC in the srMtrl.sizeSPECs, insert the ref to the existing sizeSPEC
                sizeSPEC.refs.map(async (ref) => {
                  // $addToSet, the operatoer only push a unique item to the array. It prevent duplicated value be pushed to the refs
                  await SRMtrl.updateOne(
                    {
                      company: comId,
                      CSRIC: mList.CSRIC,
                      'sizeSPECs.mSizeSPEC': sizeSPEC.mSizeSPEC,
                    },
                    {
                      $addToSet: {
                        'sizeSPECs.$.refs': ref,
                      },
                    }
                  );
                });
              }
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

    return res.json({ msg: 'srMtrl is updated' });
    // return res.json(mLists); // for test
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
});

// @route   PUT api/srmtrl/update/mpricevalues
// @desc    Update the value in mPrice
// @access  Private
router.put('/update/mpricevalues', authUser, async (req, res) => {
  const srMtrlList = req.body;
  const comId = req.user.company;
  const userId = req.user.id;
  let user = await User.findById(userId);
  // Check the authority of the user
  if (!user) {
    return res.status(400).json({
      msg: 'Invalid user',
    });
  } else if (!user.mp) {
    return res.status(400).json({
      msg: 'Out of authority',
    });
  }

  // Start update
  try {
    srMtrlList.map(async (srMtrl) => {
      srMtrl.mPrices.map(async (mPrice) => {
        // Check I.C.S
        let checkICS = await SRMtrl.find(
          {
            _id: srMtrl.id,
            mPrices: {
              $elemMatch: {
                id: mPrice.id,
                mColor: mPrice.mColor,
                sizeSPEC: mPrice.sizeSPEC,
              },
            },
          },
          { _id: 0, mPrices: 1 }
        );
        if (checkICS.length > 0) {
          // IF the mPrice (id, mColor and sizeSPEC duplicated) exisitng, update by replacing with new mPrice
          await SRMtrl.updateOne(
            {
              _id: srMtrl.id,
              mPrices: {
                $elemMatch: {
                  id: mPrice.id,
                  mColor: mPrice.mColor,
                  sizeSPEC: mPrice.sizeSPEC,
                },
              },
            },
            { $set: { 'mPrices.$': mPrice } }
          );
        } else {
          // If the mPrice (id, mColor ,sizeSPEC  duplicated) not exisitng, Check C.S
          let checkCS = await SRMtrl.find(
            {
              _id: srMtrl.id,
              mPrices: {
                $elemMatch: {
                  mColor: mPrice.mColor,
                  sizeSPEC: mPrice.sizeSPEC,
                },
              },
            },
            { _id: 0, mPrices: 1 }
          );
          if (checkCS.length > 0) {
            // If mColor and sizeSPEC is repeated then discard the mPrice by doing nothing.
          } else {
            // If the mPrice (mColor and sizeSPEC duplicated) not exisitng, Check ID
            let checkI = await SRMtrl.find(
              {
                _id: srMtrl.id,
                mPrices: {
                  $elemMatch: {
                    id: mPrice.id,
                  },
                },
              },
              { _id: 0, mPrices: 1 }
            );
            if (checkI.length > 0) {
              // If the mPrice is existing item, then update by replacing with new one.
              await SRMtrl.updateOne(
                {
                  _id: srMtrl.id,
                  mPrices: {
                    $elemMatch: {
                      id: mPrice.id,
                    },
                  },
                },
                { $set: { 'mPrices.$': mPrice } }
              );
            } else {
              // If the mPrice is not existing item, then push mPrice to be new one
              await SRMtrl.updateOne(
                {
                  _id: srMtrl.id,
                },
                { $push: { mPrices: mPrice } }
              );
            }
          }
        }
      });
    });

    console.log('Bend: Upload mPrice succeed');
    return res.json({ msg: 'mPrice is updated' });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
});

// @route   PUT api/srmtrl/caseId/mtrlId
// @desc    Delete the refs of rsMtrl by Mtrl
// @access  Private
router.put('/:caseId/:mtrlId', authUser, async (req, res) => {
  // Check if the user has authority to update case ---------------------------
  const { CSRIC } = req.body;
  const userId = req.user.id;
  const comId = req.user.company;
  const caseId = req.params.caseId;
  const mtrlId = req.params.mtrlId;
  // const CSRIC = mtrl.CSRIC;
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
  try {
    let srMtrl = await SRMtrl.findOne({
      $and: [{ company: comId }, { CSRIC: CSRIC }],
    });

    if (!srMtrl) {
      return res.json({ msg: 'The srMtrl dose not exist' });
    }

    //Don't know why the mathed "updateMany" seems not work on many seperated objects, so I use updateOne with .map(), going througth each objects

    //@ 1_Delete the ref from srMtrl.mtrlColors.refs, if more than one matched to the condition of $pull, after my test, this method will delete them all.

    if (srMtrl.mtrlColors.length > 0) {
      srMtrl.mtrlColors.map(async (mtrlColor) => {
        await SRMtrl.updateOne(
          {
            $and: [
              { CSRIC: CSRIC },
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
        return null;
      });
    } else {
      console.log('The srMtrl.mtrlColors is empty!');
    }

    if (srMtrl.sizeSPECs.length > 0) {
      //@ 1_Delete ref_This method do things as method above
      srMtrl.sizeSPECs.map(async (sizeSPEC) => {
        await SRMtrl.updateOne(
          {
            $and: [
              { CSRIC: CSRIC },
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

        return null;
      });
    } else {
      console.log('This srMtrl.sizeSPECs is empty');
    }

    return res.json({ msg: 'The srMtrl is deleted' });
  } catch (err) {
    console.log('The delete srMtrl is failed');
    return res.json(err);
  }
});

//Not done yet
// @route   PUT api/srmtrl/deletesrmtl
// @desc    Delete the srmtrl if the refs of the srmtrl is 0
// @access  Private
router.put('/:caseId/:mtrlId', authUser, async (req, res) => {
  // Check if the user has authority to update case ---------------------------
  const { CSRIC } = req.body;
  const userId = req.user.id;
  const comId = req.user.company;
  const caseId = req.params.caseId;
  const mtrlId = req.params.mtrlId;
  // const CSRIC = mtrl.CSRIC;
  let user = await User.findById(userId);
  if (!user.cases) {
    return res.status(400).json({
      msg: 'Out of authority',
    });
  }
});

module.exports = router;
