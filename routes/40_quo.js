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
      console.log('caseList is sent out');
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
  let user = await User.findById(req.user.id);
  if (!user.quo) {
    return res.status(400).json({ msg: 'Out of authority' });
  }

  const comId = req.user.company;
  const cNo = req.params.cNo;
  await QUO.findOne({ cNo: cNo, company: comId })
    .then((result) => {
      if (!result) {
        const newQuoForm = new QUO({
          company: comId,
          cNo: cNo,
          quoForms: [],
        });
        newQuoForm.save();
        return res.json(newQuoForm);
      } else {
        return res.json(result);
      }
    })
    .catch((err) => {
      console.log("MongoDB or internet problem, can't find quoForm", err);
    });
});

// @route   PUT api/quogarment/quoform/cNo/updatequoForm
// @desc    Update or generate quos
// @access  Private
router.put('/quoform/:cNo/updatequoForm', authUser, async (req, res) => {
  let user = await User.findById(req.user.id);
  if (!user.quo) {
    return res.status(400).json({ msg: 'Out of authority' });
  }

  const comId = req.user.company;
  const cNo = req.params.cNo;
  const Cases = await Case.findOne({ cNo: cNo, company: comId });
  if (Cases) {
    console.log(cNo);
    const { isNewQuoForm } = req.body;
    const Quo = await QUO.findOne(
      { cNo: cNo, company: comId },
      { quoForms: 1, versionNum: 1 }
    );

    if (Quo) {
      console.log('Quo', Quo);
      const versionNum = Quo.versionNum;
      if (Quo.quoForms.length < 99) {
        if (isNewQuoForm) {
          const createMQuos = new Promise((resolve) => {
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
              if (num === mtrls.length) {
                return resolve(newMQuos);
              }
            });
          });
          const quoNo = cNo + '_Q' + versionNum;
          Promise.all([createMQuos]).then(async (result) => {
            await QUO.updateOne(
              { cNo: cNo, company: comId },
              {
                $set: {
                  versionNum: versionNum + 1,
                },
                $push: {
                  quoForms: {
                    id: uuidv4() + myModule.generateId(),
                    quoNo: quoNo,
                    currency: '',
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
                return await QUO.findOne({ cNo: cNo, company: comId });
              })
              .then((result) => {
                return res.json(result);
              });
          });
        } else {
          const {
            id,
            currency,
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
        return res
          .status(400)
          .json({ msg: 'Over the number of quotation version' });
      }
    } else {
      return res.status(404).json({ msg: 'No such quotation data' });
    }
  } else {
    return res.status(404).json({ msg: 'No such Case data' });
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
//   const caseInfo = await Case.findOne(
//     {
//       cNo: cNo,
//       company: comId,
//     },
//     { cNo: 1, caseType: 1, style: 1, client: 1, mtrls: 1 }
//   ).catch((err) => {
//     console.log("MongoDB or internet problem, can't find caseInfo", err);
//   });
//   // Get the information from two forms, the quoForm and caseInfo to make a form sent back to client.
//   Promise.all([quoForm, caseInfo])
//     .then(() => {
//       let finalForm = {};
//       if (quoForm.cNo === caseInfo.cNo) {
//         finalForm = {
//           company: quoForm.company,
//           cNo: quoForm.cNo,
//           client: caseInfo.client,
//           style: caseInfo.style,
//           caseType: caseInfo.caseType,
//           currency: quoForm.currency,
//           cmpts: quoForm.cmpts,
//           mtrlQuos: quoForm.MtrlQuos,
//           otherExpense: quoForm.otherExpense,
//           fob: quoForm.fob,
//           mtrls: caseInfo.mtrls,
//         };
//         // mtrls array, only for showing to the user, not need to be part of quoForm in Database.
//       }
//       return finalForm;
//     })
//     .then((result) => {
//       console.log(`this is final quoForm ${result.cNo} is sent out`);
//       return res.json(result);
//     })
//     .catch((err) => {
//       console.log('Insert caseInfo to quoForm problem', err);
//     });
// });
