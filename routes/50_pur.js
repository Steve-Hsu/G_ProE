const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const authUser = require('../middleware/authUser');
// Not set up yet, for check the value entered by user at the some specific column
// const { check, validationResult } = require('express-validator');
const { v4: uuidv4 } = require('uuid');
const myModule = require('../myModule/myModule');

const User = require('../models/10_User');
const Case = require('../models/20_Case');
const SRMtrl = require('../models/30_srMtrl');
const OS = require('../models/50_OS');

// @route   GET api/purchase
// @desc    Read the compnay's case with cNo, style, client,
// @access  Private

// @route   GET api/purchase/ordersummary
// @desc    Read the compnay's all of order Summary from database
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
  console.log('Generate Order Summary by cases selected');
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
  const insertCaseMtrls = new Promise(async (resolve, reject) => {
    console.log('Start the promise, inserCaseMtrls');
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
      const gQtys = theCase.gQtys;

      if (mtrls.length === 0 || !mtrls || gQtys.length === 0 || !gQtys) {
        //If the case don't have mtrls or gQtys, which means no cspt can be calculated, then it will skip the case
        caseNum = caseNum + 1;
        if (caseNum === caseIds.length) {
          return resolve();
        }
      } else {
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

            const existCaseMtrl = caseMtrls.filter((i) => {
              for (var key in currentCsptMtrl) {
                if (i[key] === undefined || i[key] != currentCsptMtrl[key]) {
                  return false;
                }
              }
              return true;
            });

            // console.log('The existingCaseMtrl', existCaseMtrl); // Test Code

            if (existCaseMtrl.length === 0) {
              const checkSupplier = supplierList.filter(
                (s) => s.supplier === supplier
              ).length;
              if (!checkSupplier) {
                supplierList.push({
                  supplier: supplier,
                  conditions: [],
                  poConfirmDate: null,
                });
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

            console.log('csptNum', csptNum, 'csptLength', cspts.length);
            console.log('mtrlNum', mtrlNum, 'mtrlsLength', mtrls.length);
            console.log('caseNum', caseNum, 'caseLength', caseIds.length);
          });
        });
      }
    });
  }).catch((err) => {
    return reject(err);
  });

  //@ Create an Order Summary to OS collection -------------------------------------------------
  Promise.all([insertCaseMtrls])
    .then(() => {
      console.log('The promise all start');
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
          { $currentDate: { poDate: Date }, $set: { osNo: newOsNO } }
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

// @route   GET api/purchase/materialprice
// @desc    Read the compnay's srMtrl from database
// @access  Private
// Result   Return an array named "materialPriceList"
router.post('/materialprice', authUser, async (req, res) => {
  console.log('Start getting material Price'); // Test Code
  let user = await User.findById(req.user.id);
  if (!user.po) {
    return res.status(400).json({ msg: 'Out of authority' });
  }
  const comId = req.user.company;
  const { currentPo, caseMtrls } = req.body;
  // the currentPo is the name of the supplier
  const checkConfirmed = currentPo.poConfirmDate;
  if (!checkConfirmed) {
    // console.log('the currentPo', currentPo); // Test Code

    //This is the result will be returned to client
    const materialPriceList = [];

    const filteredCaseMtrls = caseMtrls.filter((mtrl) => {
      return mtrl.supplier === currentPo.supplier;
    });

    // console.log('The caseMtrls passed in', caseMtrls);

    // console.log('filterdCaseMtrls in getting price', filteredCaseMtrls); // Test Code

    let caseMtrlsCount = 0;
    const insertSrPrice = new Promise(async (resolve, reject) => {
      filteredCaseMtrls.map(async (mtrl) => {
        const { id, supplier, ref_no, mColor, mSizeSPEC } = mtrl;

        const srMtrl = await SRMtrl.findOne({
          company: comId,
          supplier: currentPo.supplier,
          ref_no: ref_no,
        });
        if (!srMtrl || srMtrl.mPrices.length === 0) {
          console.log(
            "No such material or the material dosen't have any price built in the srMtrl database"
          );
          materialPriceList.push({
            osMtrlId: id,
            poUnit: 'no srMtrl',
            currency: 0,
            mPrice: 0,
            moq: 0,
            moqPrice: 0,
          });
        } else {
          // extract the mPrice that match to the current material with name of supplier, ref_no, mColor and mSizeSPEC
          const { mPrices } = srMtrl;
          const mainPrice = srMtrl.mainPrice;
          const currentSrMtrlPrice = mPrices.filter((i, idx) => {
            if (i.mColor === mColor && i.sizeSPEC === mSizeSPEC) {
              return i;
            } else if (mainPrice) {
              return i.id === mainPrice;
            } else {
              return i.id === mPrices[0].id;
            }
          });
          // console.log('the mPrice selected', currentSrMtrlPrice); // Test code

          const itemNames = ['unit', 'currency', 'mPrice', 'moq', 'moqPrice'];
          const theValues = itemNames.map((i, idx) => {
            if (!currentSrMtrlPrice[0][i]) {
              return { [i]: 'undefined' };
            } else {
              return { [i]: currentSrMtrlPrice[0][i] };
            }
          });

          // console.log(theValues); // Test code

          materialPriceList.push({
            osMtrlId: id,
            poUnit: theValues[0].unit,
            currency: theValues[1].currency,
            mPrice: theValues[2].mPrice,
            moq: theValues[3].moq,
            moqPrice: theValues[4].moqPrice,
          });
        }
        caseMtrlsCount = caseMtrlsCount + 1;
        if (caseMtrlsCount === filteredCaseMtrls.length) {
          resolve();
        }
      });
    }).catch((err) => {
      console.log(err);
    });

    Promise.all([insertSrPrice])
      .then(() => {
        // console.log('the mtaterialPriceList', materialPriceList); // Test Code
        console.log('the material Price is returned!');
        return res.json(materialPriceList);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    console.log('Nothing update, since the po is confirmed');
    return res.json([]);
  }
});

// @route   GET api/purchase/materialprice
// @desc    Read the compnay's srMtrl from database
// @access  Private
// Result   Return an array named "materialPriceList"
router.delete('/deleteos/:osId', authUser, async (req, res) => {
  let user = await User.findById(req.user.id);
  if (!user.po) {
    return res.status(400).json({ msg: 'Out of authority' });
  }

  const comId = req.user.company;
  const osId = req.params.osId;
  const theOS = await OS.findOne({ company: comId, _id: osId }, { cNos: 1 });
  console.log(osId); // Test Code
  //@ Turn the poDate of cases back to "null"
  // Don't need return any of this result immediately, so don't make any promise here.
  const caseList = theOS.cNos;
  caseList.map(async (c) => {
    await Case.updateOne({ cNo: c }, { poDate: null, osNo: null });
  });

  await OS.findOneAndDelete({ company: comId, _id: osId }).then(() => {
    console.log(`The order summary ${osId} is deleted.`);
    return res.json({
      msg: `The order summary ${osId} is deleted.`,
    });
  });
});

// @route   POST api/purchase/updatecondition/:osId/:supplierId
// @desc    Update the conditions in the suppliers of OS and return the suppliers
// @access  Private
router.post('/purchaseorder/:osId', authUser, async (req, res) => {
  console.log('Start upload Po'); // Test Code
  let user = await User.findById(req.user.id);
  if (!user.po) {
    return res.status(400).json({ msg: 'Out of authority' });
  }
  const comId = req.user.company;
  const osId = req.params.osId;
  const { supplier, priceList } = req.body;
  // console.log('the body', req.body); // test Code
  // the currentPo is the name of the supplier
  const checkIfConfirmed = supplier.poConfirmDate;
  // console.log('the id of the supplier', supplier._id); // test Code
  // console.log('The conditions of the supplier', supplier.conditions); // Test Code

  try {
    if (checkIfConfirmed) {
      const updatedSuppliers = await OS.findOneAndUpdate(
        { company: comId, _id: osId, 'suppliers._id': supplier._id },
        {
          $set: { 'suppliers.$.conditions': supplier.conditions },
          $currentDate: { 'suppliers.$.poConfirmDate': Date },
        },
        { new: true }
        // { projection: { _id: 0, suppliers: 1 } }
      );
      if (priceList) {
        const orderSummary = await OS.findOne(
          {
            company: comId,
            _id: osId,
          },
          { caseMtrls: 1 }
        );
        const caseMtrls = orderSummary.caseMtrls;
        // console.log('the caseMtrls', caseMtrls); // Test code
        // console.log('The priceList', priceList); // test code
        const insertPrice = new Promise(async (resolve) => {
          let newCaseMtrl = [];
          await caseMtrls.map(async (mtrl, idx) => {
            const thePrice = await priceList.filter(
              (p) => p.osMtrlId === mtrl.id
            );
            if (thePrice.length > 0) {
              // console.log('the Price is found', thePrice); // test code
              mtrl.price = thePrice[0];
              // console.log('the mtrl should have price', mtrl); // test Code
              newCaseMtrl.push(mtrl);
            } else {
              newCaseMtrl.push(mtrl);
            }
            if (idx + 1 === caseMtrls.length) {
              return resolve(newCaseMtrl);
            }
          });
        });

        Promise.all([insertPrice]).then(async (result) => {
          const newCaseMtrl = result[0];
          console.log('the newCaseMtrl', newCaseMtrl);
          await OS.findOneAndUpdate(
            {
              company: comId,
              _id: osId,
            },
            {
              $set: {
                caseMtrls: newCaseMtrl,
              },
            },
            { new: true }
          ).then((result) => {
            const results = {
              updatedSuppliers: updatedSuppliers.suppliers,
              updateCaseMtrl: result.caseMtrls,
            };
            console.log('The result with suppliers and caseMtrl is returned');
            // console.log('the result', results);
            return res.json(results);
          });
        });
      } else {
        console.log('The priceList is empty, return the suppliers only');
        const result = {
          updatedSuppliers: updatedSuppliers.suppliers,
          updateCaseMtrl: null,
        };
        return res.json(result);
      }
    } else {
      const updatedSuppliers = await OS.findOneAndUpdate(
        { company: comId, _id: osId, 'suppliers._id': supplier._id },
        {
          $set: {
            'suppliers.$.conditions': supplier.conditions,
            'suppliers.$.poConfirmDate': null,
          },
        },
        { new: true }
        // { projection: { _id: 0, suppliers: 1 } }
      );

      const caseMtrls = updatedSuppliers.caseMtrls;
      console.log('the caseMTrls', caseMtrls);

      const deletePrice = new Promise(async (resolve) => {
        let newCaseMtrl = [];
        await caseMtrls.map(async (mtrl, idx) => {
          if (mtrl.supplier === supplier.supplier) {
            delete mtrl.price;
            newCaseMtrl.push(mtrl);
            console.log('The mtrl is delete price', mtrl);
          } else {
            newCaseMtrl.push(mtrl);
          }
          if (idx + 1 === caseMtrls.length) {
            return resolve(newCaseMtrl);
          }
        });
      });

      Promise.all([deletePrice]).then(async (result) => {
        const newCaseMtrl = result[0];
        await OS.findOneAndUpdate(
          {
            company: comId,
            _id: osId,
          },
          {
            $set: {
              caseMtrls: newCaseMtrl,
            },
          },
          { new: true }
          // { projection: { caseMtrls: 1 } }
        ).then((result) => {
          const results = {
            updatedSuppliers: updatedSuppliers.suppliers,
            updateCaseMtrl: result.caseMtrls,
          };
          console.log('The result with suppliers is returned');
          // console.log('The result', results);
          return res.json(results);
        });
      });
    }
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;
