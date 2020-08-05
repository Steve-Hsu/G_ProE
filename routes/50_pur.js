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
const OS = require('../models/50_OS');

// @route   GET api/purchase
// @desc    Read the compnay's srMtrl from database
// @access  Private
router.get('/', authUser, async (req, res) => {
  let user = await User.findById(req.user.id);
  if (!user.po) {
    return res.status(400).json({ msg: 'Out of authority' });
  }
  let caseList = await Case.aggregate([
    {
      $match: {
        company: mongoose.Types.ObjectId(req.user.company),
        poDate: null,
      },
    },
    {
      $project: {
        user: 1,
        cNo: 1,
        style: 1,
        client: 1,
        merchandiser: '',
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

// @route   GET api/purchase/ordersummary
// @desc    Read the compnay's srMtrl from database
// @access  Private
router.get('/ordersummary', authUser, async (req, res) => {
  let user = await User.findById(req.user.id);
  if (!user.po) {
    return res.status(400).json({ msg: 'Out of authority' });
  }
  const comId = req.user.company;
  let osList = await OS.find({ company: comId }, { company: 0 });
  if (osList.length === 0) {
    return res.status(400).json({ msg: 'No order summary found' });
  } else {
    return res.json(osList);
  }
});

// @route   post api/purchase
// @desc    generate order summary by the list of case's Id, then generate purchases orders seperated by suppliers.
// @access  Private
router.post('/', authUser, async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user.po) {
    return res.status(400).json({ msg: 'Out of authority' });
  }
  const comId = req.user.company;
  const caseIds = req.body;
  const comSymbol = user.comSymbol;

  // @ Create OS number -------------------------------------------------

  //Get last 2 digits of year
  const strDate = new Date(); // By default Date empty constructor give you Date.now
  let shortYear = strDate.getFullYear();
  let twoDigitYear = shortYear.toString().substr(-2); // Add this line

  // Get the number of os
  let osQty = 1;
  const oss = await OS.find({
    $and: [
      { company: comId },
      { osNo: { $regex: comSymbol + twoDigitYear + 'POS', $options: 'i' } }, // Query the same cases in same year by cNo, It promises return cases of same company in same year
    ],
  }).sort({
    date: -1,
  });

  if (oss.length < 1) {
  } else {
    osQty = Number(osQty + oss.length);
  }

  const digits = 5 - osQty.toString().length;

  const osNumber = [];
  for (let i = 1; i <= digits; i++) {
    osNumber.push('0');
  }

  osNumber.push(osQty);

  // Create new Os number
  let newOsNumber = osNumber.toString().split(',').join('');
  const newOsNO = comSymbol + twoDigitYear + 'POS' + '_' + newOsNumber;

  //@ Define the elements for OS -------------------------------------------------
  let cNoList = [];
  let clientList = [];
  let supplierList = [];
  let caseMtrls = [];

  // @ create object for caseMtrls -------------------------------------------------
  // Loop through cases
  const insertCaseMtrls = new Promise(async (resolve) => {
    let caseNum = 0;
    caseIds.map(async (item) => {
      let mtrlNum = 0;
      const caseId = item;
      const theCase = await Case.findOne({
        _id: caseId,
        company: comId,
        poDate: null,
      });
      if (!theCase) {
        console.log(
          "One of case dosen't exist or has being purchased by other order summary"
        );
        return res.status(404).json({
          msg:
            "One of case dosen't exist or has being purchased by other order summary",
        });
      }

      const mtrls = theCase.mtrls;
      if (mtrls.length === 0 || !mtrls) {
        console.log("The case dosen't have mtrls");
        return res.status(404).json({
          msg: "The case dosen't have mtrls",
        });
      }

      cNoList.push(theCase.cNo);
      clientList.push(theCase.clients);
      mtrls.map((mtrl) => {
        let csptNum = 0;
        const mtrlId = mtrl.id;
        const cspts = mtrl.cspts;
        const supplier = mtrl.supplier;
        const ref_no = mtrl.ref_no;
        // console.log('mtrl start ', caseId, mtrlId); // Test Code
        cspts.map((cspt) => {
          //Check the Existing caseMtrls object
          //The condition
          // console.log('cspt start ', caseId, mtrlId, cspt.id); // Test Code
          const currentCsptMtrl = {
            supplier: supplier,
            ref_no: ref_no,
            mColor: cspt.mColor,
            mSizeSPEC: cspt.mSizeSPEC,
          };

          existCaseMtrl = caseMtrls.filter((i) => {
            for (var key in currentCsptMtrl) {
              if (i[key] === undefined || i[key] != currentCsptMtrl[key]) {
                return false;
              }
            }
            return true;
          });

          // console.log('The existingCaseMtrl', existCaseMtrl); // Test Code

          if (existCaseMtrl.length === 0) {
            if (!supplierList.includes(supplier)) {
              supplierList.push(supplier);
            }

            caseMtrls.push({
              id: uuidv4() + myModule.generateId(),
              cases: [theCase.cNo],
              supplier: supplier,
              ref_no: ref_no,
              mColor: cspt.mColor,
              mSizeSPEC: cspt.mSizeSPEC,
              purchaseQtySumUp: cspt.requiredMQty,
            });
          } else {
            // existCaseMtrl.purchaseQtySumUp += cspt.requiredMQty;
            const currentCaseMtrlId = existCaseMtrl[0].id;
            caseMtrls.map((caseMtrl) => {
              if (caseMtrl.id === currentCaseMtrlId) {
                if (!caseMtrl.cases.includes(theCase.cNo)) {
                  caseMtrl.cases.push(theCase.cNo);
                }
                caseMtrl.purchaseQtySumUp += cspt.requiredMQty;
              }
            });
          }

          csptNum = csptNum + 1;
          if (csptNum === cspts.length) {
            mtrlNum = mtrlNum + 1;
          }

          if (mtrlNum === mtrls.length) {
            caseNum = caseNum + 1;
          }

          if (caseNum === caseIds.length) {
            return resolve();
          }
        });
      });
    });
  });

  //@ Create an Order Summary to OS collection -------------------------------------------------
  Promise.all([insertCaseMtrls])
    .then(() => {
      const orderSummary = new OS({
        company: comId,
        osNo: newOsNO,
        caseIds: caseIds,
        cNos: cNoList,
        clients: clientList,
        suppliers: supplierList,
        caseMtrls: caseMtrls,
      });

      orderSummary.save();
      console.log('The order summary is generated');
    })
    .then(async () => {
      caseIds.map(async (caseId) => {
        await Case.updateOne(
          { company: comId, _id: caseId },
          { $currentDate: { poDate: Date } }
        );
      });
    })
    .then(async () => {
      const result = await OS.findOne(
        { company: comId, osNo: newOsNO },
        { company: 0 }
      );
      return res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });

  //@ Loop through the cases and lock up all these cases, preventing merchandisor updating anything.
  //The price refs to srMtrl, and since other case, which not be put into order summary may still use same srMtrl, so we can't and no necessary to lock up the srMtrl.
});

module.exports = router;
