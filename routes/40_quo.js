const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const authUser = require('../middleware/authUser');
// Not set up yet, for check the value entered by user at the some specific column
const { check, validationResult } = require('express-validator');

const User = require('../models/10_User');
const Case = require('../models/20_Case');
const SRMtrl = require('../models/30_srMtrl');
const QUO = require('../models/40_Quotation');

// @route   GET api/quo
// @desc    Read the compnay's srMtrl from database
// @access  Private
router.get('/', authUser, async (req, res) => {
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

// get(`/api/quo/quoForm/${isQuotating}`);
// @route   GET api/quo/quoform/cNo
// @desc    Read the compnay's srMtrl from database
// @access  Private
router.get('/quoform/:cNo', authUser, async (req, res) => {
  const comId = req.user.company;
  const cNo = req.params.cNo;
  const quoForm = await QUO.findOne({ cNo: cNo, company: comId })
    .then((result) => {
      if (!result) {
        const newQuoForm = new QUO({
          company: comId,
          cNo: cNo,
          currency: '',
          cmpts: [],
          mtrlQuos: [],
          otherExpense: [],
          fob: 0,
        });
        newQuoForm.save();
        return newQuoForm;
      } else {
        return result;
      }
    })
    .catch((err) => {
      console.log("MongoDB or internet problem, can't find quoForm", err);
    });

  const caseInfo = await Case.findOne(
    {
      cNo: cNo,
      company: comId,
    },
    { cNo: 1, caseType: 1, style: 1, client: 1, mtrls: 1 }
  ).catch((err) => {
    console.log("MongoDB or internet problem, can't find caseInfo", err);
  });

  Promise.all([quoForm, caseInfo])
    .then(() => {
      let finalForm = {};
      if (quoForm.cNo === caseInfo.cNo) {
        finalForm = {
          company: quoForm.company,
          cNo: quoForm.cNo,
          client: caseInfo.client,
          style: caseInfo.style,
          caseType: caseInfo.caseType,
          currency: quoForm.currency,
          cmpts: quoForm.cmpts,
          mtrlQuos: quoForm.MtrlQuos,
          otherExpense: quoForm.otherExpense,
          fob: quoForm.fob,
          mtrls: caseInfo.mtrls,
        };
        // mtrls array, only for showing to the user, not need to be part of quoForm in Database.
      }
      return finalForm;
    })
    .then((result) => {
      console.log(`this is final quoForm ${result.cNo} is sent out`);
      return res.json(result);
    })
    .catch((err) => {
      console.log('Insert caseInfo to quoForm problem', err);
    });
});

module.exports = router;
