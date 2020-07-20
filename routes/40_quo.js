const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const authUser = require('../middleware/authUser');
// Not set up yet, for check the value entered by user at the some specific column
const { check, validationResult } = require('express-validator');
const { v4: uuidv4 } = require('uuid');
const myModule = require('../myModule/myModule');

const User = require('../models/10_User');
const Case = require('../models/20_Case');
const SRMtrl = require('../models/30_srMtrl');
const QUO = require('../models/40_Quotation');

// @route   GET api/quogarment/
// @desc    Read the compnay's srMtrl from database
// @access  Private
router.get('/', authUser, async (req, res) => {
  let user = await User.findById(req.user.id);
  if (!user.quo) {
    return res.status(400).json({ msg: 'Out of authority' });
  }
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
        quoNo: '',
      },
    },
  ]).sort({ date: -1 });

  let insertList = await new Promise((resolve, reject) => {
    let n = 0;

    caseList.map(async (c) => {
      await User.findOne(
        { company: req.user.company, _id: c.user },
        { _id: 0, name: 1 }
      )
        .then(async (result) => {
          if (result) {
            c.merchandiser = await result.name;
          }
          n = n + 1;
          return n;
        })
        .then((n) => {
          if (n === caseList.length) {
            resolve();
          }
        });
    });
  });

  try {
    Promise.all([caseList, insertList]).then(async () => {
      console.log('caseList is sent out', caseList);
      return res.json(caseList);
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/quogarment/quoform/cNo
// @desc    Read the compnay's srMtrl from database, and if the quo not existing, create a new one
// @access  Private
router.get('/quoform/:cNo', authUser, async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user.quo) {
    return res.status(400).json({ msg: 'Out of authority' });
  }

  const comId = req.user.company;
  const cNo = req.params.cNo;
  await QUO.findOne({ cNo: cNo, company: comId })
    .then(async (result) => {
      const cases = await Case.findOne(
        { cNo: cNo, company: comId },
        { mtrls: 1 }
      );
      const mtrls = cases.mtrls;
      // console.log('The cases', cases); // Test Code
      if (mtrls.length > 0) {
        //@ Part_1 getTheResult
        const getTheResult = new Promise(async (resolve, reject) => {
          // console.log('Start Promise - getTheResult '); // Test Code
          let theResult = {};
          if (result) {
            // console.log('get existing quo'); // Test Code

            theResult = {
              quoForms: result.quoForms,
              versionNum: result.versionNum,
              _id: result._id,
              company: result.company,
              cNo: result.cNo,
              date: result.date,
              materialPrice: [],
            };
            // console.log('resolve Promise - getTheResult - exist Quo'); // Test Code
            return resolve(theResult);
          } else {
            // console.log('start create new quo');
            theResult = await Case.aggregate([
              {
                $match: {
                  cNo: cNo,
                  company: mongoose.Types.ObjectId(req.user.company),
                },
              },
              {
                $project: {
                  totalGarmentQty: { $sum: '$gQtys.gQty' },
                },
              },
            ])
              .then((totalQtySum) => {
                // console.log('the totalQtySum', totalQtySum); // Test Code
                return totalQtySum;
              })
              .then(async (totalQtySum) => {
                const totalGarmentQty = totalQtySum[0].totalGarmentQty;
                const newQuo = new QUO({
                  company: comId,
                  cNo: cNo,
                  quoForms: [],
                  gTQty: totalGarmentQty,
                });
                newQuo.save();
                return newQuo;
              })
              .then((newQuo) => {
                theResult = {
                  quoForms: newQuo.quoForms,
                  versionNum: newQuo.versionNum,
                  _id: newQuo._id,
                  company: newQuo.company,
                  cNo: newQuo.cNo,
                  date: newQuo.date,
                  materialPrice: [],
                };
                return resolve(theResult);
              });
          }
        });

        //@ Part_2 insertMPrice
        Promise.all([getTheResult]).then(async (result) => {
          let theResult = result[0];

          // console.log('the theResult', theResult); // Test Code
          const comName = user.comName;
          const comSymbol = user.comSymbol;
          let num = 0;
          const insertMPrice = new Promise(async (resolve) => {
            await mtrls.map(async (mtrl) => {
              const supplier = mtrl.supplier;
              const ref_no = mtrl.ref_no;
              // console.log('The supplier', supplier, 'The ref_no', ref_no); // Test Code
              const csr = comName + comSymbol + supplier + ref_no;
              const lowerCasecsr = csr.toLowerCase();
              const CSRIC = lowerCasecsr.replace(/[^\da-z]/gi, ''); // Only read from "0" to "9" & "a" to "z"
              console.log('The CSRIC', CSRIC); // Test Code
              await SRMtrl.findOne({ CSRIC: CSRIC }, { mPrices: 1 })
                .then((mPrices) => {
                  // console.log('the mPrices', mPrices); // Test Code
                  theResult.materialPrice.push(mPrices);
                  return theResult;
                })
                .then((theResult) => {
                  num = num + 1;
                  if (num === mtrls.length) {
                    console.log('Promise - insertMPrice - resolve()'); // Test Code
                    return resolve(theResult);
                  }
                })
                .catch((err) => {
                  console.log(err);
                  return 'The Srmtrl problem';
                });
            });
          });
          Promise.all([insertMPrice])
            .then((result) => {
              console.log('The Promise.all result - return the quotation');
              return res.json(result[0]);
            })
            .catch((err) => {
              console.log(err);
              return res.json({ error: err, quoForms: [] });
            });
        });
      } else {
        const err = 'Please create the mtrl for the case before quotation.';
        console.log(err);
        return res.json({ error: err, quoForms: [] });
      }
    })
    .catch((err) => {
      console.log("MongoDB or internet problem, can't find quoForm", err);
      return res.json({ error: err, quoForms: [] });
    });
});

// @route   PUT api/quogarment/quoform/cNo/updatequoForm
// @desc    Update or generate quoform
// @access  Private
// @result  return object contain the array "quoForms" and the object "versionNum" of QUO
router.put('/quoform/:cNo/updatequoForm', authUser, async (req, res) => {
  let user = await User.findById(req.user.id);
  if (!user.quo) {
    return res.status(400).json({ msg: 'Out of authority' });
  }

  const comId = req.user.company;
  const cNo = req.params.cNo;
  const Cases = await Case.findOne({ cNo: cNo, company: comId });
  if (Cases.mtrls.length > 0) {
    console.log(cNo);
    const { isNewQuoForm } = req.body;
    const Quo = await QUO.findOne(
      { cNo: cNo, company: comId },
      { quoForms: 1, versionNum: 1 }
    );

    if (Quo) {
      console.log('Quo', Quo); // Test Code
      const versionNum = Quo.versionNum + 1;
      if (Quo.quoForms.length < 99) {
        // console.log('The quoForm is less then 99'); // Test Code
        if (isNewQuoForm) {
          // console.log('Have isNewQuoForm from body'); // Test Code
          const createMQuos = new Promise((resolve) => {
            console.log('Promise createMQuos start');
            const mtrls = Cases.mtrls;
            let num = 0;
            let newMQuos = [];
            mtrls.map((mtrl) => {
              newMQuos.push({
                mtrlId: mtrl.id,
                mQuoAddvised: 0,
                materialFinalQuotation: 0,
              });
              num = num + 1;
              // console.log('1st promise num', num); // Test Code
              if (num === mtrls.length) {
                console.log('Promised createMQuos');
                return resolve(newMQuos);
              }
            });
          });
          const quoNo = cNo + '_QV' + versionNum;
          Promise.all([createMQuos]).then(async (result) => {
            // console.log('Promise all'); // Test Code
            await QUO.updateOne(
              { cNo: cNo, company: comId },
              {
                $set: {
                  versionNum: versionNum,
                },
                $push: {
                  quoForms: {
                    id: uuidv4() + myModule.generateId(),
                    quoNo: quoNo,
                    currency: '',
                    quoSizes: [],
                    quocWays: [],
                    cmpts: [],
                    mQuos: result[0],
                    otherExpenses: [],
                    fob: '',
                    date: new Date(),
                  },
                },
              }
            )
              .then(async () => {
                return await QUO.findOne(
                  { cNo: cNo, company: comId },
                  { _id: 0, quoForms: 1, versionNum: 1 }
                );
              })
              .then((result) => {
                // console.log('the result of generate new quoform', result); // Test Code
                return res.json(result);
              });
          });
        } else {
          const {
            id,
            currency,
            quoSizes,
            quocWays,
            cmpts,
            mQuos,
            otherExpenses,
            fob,
          } = req.body.form;
          await QUO.updateOne(
            { cNo: cNo, company: comId, 'quoForms.id': id },
            {
              $set: {
                'quoForms.$': {
                  currency: currency,
                  quoSizes: quoSizes,
                  quocWays: quocWays,
                  cmpts: cmpts,
                  mQuos: mQuos,
                  otherExpenses: otherExpenses,
                  fob: fob,
                },
              },
            }
          );
        }
      } else {
        console.log('Over the number of quotation version');
        return res
          .status(400)
          .json({ msg: 'Over the number of quotation version' });
      }
    } else {
      console.log('No such quotation data');
      return res.status(404).json({ msg: 'No such quotation data' });
    }
  } else {
    console.log("No such Case data, or the case don't have any mtrl yet ");
    return res.status(404).json({
      msg:
        "No such Case data, or case don't have any material. Please, create material for the case frist",
    });
  }
});

// @route   DELETE api/quogarment/delete/quoform/cNo/quoFormId
// @desc    Delete the quoForm in the quos
// @access  Private
router.delete(
  '/delete/quoform/:quoNo/:quoFormId',
  authUser,
  async (req, res) => {
    console.log('delete quoForm is called in backEnd');
    let user = await User.findById(req.user.id);
    if (!user.quo) {
      return res.status(400).json({ msg: 'Out of authority' });
    }
    const cNo = req.params.quoNo.slice(0, 14);
    console.log('This is the cNo', cNo);
    const quoFormId = req.params.quoFormId;
    const comId = req.user.company;
    await QUO.updateOne(
      { cNo: cNo, company: comId, 'quoForms.id': quoFormId },
      {
        $pull: {
          quoForms: { id: quoFormId },
        },
      }
    )
      .then(() => {
        console.log(`The quoForm ${req.params.quoNo} is deleted`);
        return res.json({ msg: 'Delete the quoForm' });
      })
      .catch((err) => {
        console.log(err);
        return res.json({ msg: 'Got problem to delete the quoForm' });
      });
  }
);

// @route   DELETE api/quogarment/delete/mquosbymtrl/cNo/mtrlId
// @desc    Delete the quoForm in the quos
// @access  Private
router.delete(
  '/delete/mquosbymtrl/:cNo/:mtrlId',
  authUser,
  async (req, res) => {
    console.log('The delete mQuo is triggered in backend');
    const comId = req.user.company;
    const cNo = req.params.cNo;
    const mtrlId = req.params.mtrlId;
    console.log('the comId in deletemquo backEnd', comId);
    console.log('the cNo in deletemquo backEnd', cNo);
    console.log('the mtrlId in deletemquo backEnd', mtrlId);

    const quo = await QUO.findOne({
      cNo: cNo,
      company: comId,
      'quoForms.mQuos.mtrlId': mtrlId,
    });
    if (quo) {
      const quoForms = quo.quoForms;
      const deleteQuo = new Promise((resolve) => {
        quoForms.map(async (quoForm) => {
          let num = 0;
          await QUO.updateOne(
            {
              cNo: cNo,
              company: comId,
              'quoForms.quoNo': quoForm.quoNo,
              'quoForms.mQuos.mtrlId': mtrlId,
            },
            { $pull: { 'quoForms.$.mQuos': { mtrlId: mtrlId } } }
          )
            .then((result) => {
              console.log('The mquo is deleted', result);
              num = num + 1;
              if (num === quoForms.length) {
                return resolve();
              }
            })
            .catch((err) => {
              console.log('The delete mQuo is failed,', err);
            });
        });
      });
      Promise.all([deleteQuo]).then(() => {
        console.log('The quos is deleted by mtrl');
        return res.json({ msg: 'the quos is deleted by mtrl' });
      });
    } else {
      console.log('No such quotation data');
      return res.status(404).json({ msg: 'No such quotation data' });
    }
  }
);

module.exports = router;
