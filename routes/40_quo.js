const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const authUser = require('../middleware/authUser');
// Not set up yet, for check the value entered by user at the some specific column
const { check, validationResult, Result } = require('express-validator');
const { v4: uuidv4 } = require('uuid');
const myModule = require('../myModule/myModule');

const User = require('../models/10_User');
const Case = require('../models/20_Case');
const SRMtrl = require('../models/30_srMtrl');
const QuoHead = require('../models/40_QuoHead');
const QuoForm = require('../models/41_QuoForm');
const { find } = require('../models/40_QuoHead');

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

// @route   GET api/quogarment/quohead/cNo
// @desc    Read the compnay's srMtrl from database, and if the quo not existing, create a new one
// @access  Private
router.get('/quohead/:cNo', authUser, async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user.quo) {
    return res.status(400).json({ msg: 'Out of authority' });
  }

  const comId = req.user.company;
  const cNo = req.params.cNo;
  await QuoHead.findOne({ cNo: cNo, company: comId })
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
              // quoForms: result.quoForms,
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
                const newQuo = new QuoHead({
                  company: comId,
                  cNo: cNo,
                  // quoForms: [],
                  gTQty: totalGarmentQty,
                });
                newQuo.save();
                return newQuo;
              })
              .then((newQuo) => {
                theResult = {
                  quoForms: [], // For client state to hold the datas from collection QuoForm
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

          /////////////////////////////
          //@ Part_3 insert quoForm
          Promise.all([insertMPrice])
            .then(async (result) => {
              const quoHead = result[0];
              const quoHeadId = quoHead._id;

              const quoForms = await QuoForm.find({
                company: comId,
                quoHead: quoHeadId,
              });

              if (quoForms) {
                quoHead.quoForms = quoForms;
              }
              return quoHead;
            })
            .then((result) => {
              console.log('The Promise.all result - return the quotation');
              return res.json(result);
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
    const { isNewQuoForm } = req.body; // isNewQuoForm is a boolean
    const quoHead = await QuoHead.findOne(
      { cNo: cNo, company: comId },
      { quoForms: 1, versionNum: 1 }
    );

    if (quoHead) {
      console.log('Quo', quoHead); // Test Code
      const versionNum = quoHead.versionNum + 1;
      const quoHeadId = quoHead._id;
      const quoForms = await QuoForm.find({
        company: comId,
        quoHead: quoHeadId,
      });
      if (quoForms.length < 99) {
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
            await QuoHead.updateOne(
              { cNo: cNo, company: comId },
              {
                $set: {
                  versionNum: versionNum,
                },
                // $push: {
                //   quoForms: {
                //     id: uuidv4() + myModule.generateId(),
                //     quoNo: quoNo,
                //     currency: '',
                //     quoSizes: [],
                //     quocWays: [],
                //     cmpts: [],
                //     mQuos: result[0],
                //     otherExpenses: [],
                //     fob: '',
                //     date: new Date(),
                //   },
                // },
              }
            );

            await QuoForm.create({
              company: comId,
              quoHead: quoHeadId,
              quoNo: quoNo,
              currency: '',
              quoSizes: [],
              quocWays: [],
              cmpts: [],
              mQuos: result[0],
              otherExpenses: [],
              fob: '',
              date: new Date(),
            })
              .then(async () => {
                const quoHead = await QuoHead.findOne(
                  { cNo: cNo, company: comId },
                  { _id: 0, versionNum: 1 }
                );
                let result = {
                  versionNum: quoHead.versionNum,
                  quoForms: [],
                };
                console.log('The result of the quoHead', result); // Test Code
                return result;
              })
              .then(async (result) => {
                const quoForms = await QuoForm.find({
                  company: comId,
                  quoHead: quoHeadId,
                });
                result.quoForms = quoForms;
                console.log('The result of insert QuoForms', result); // Test Code
                return result;
              })
              .then((result) => {
                console.log('the result of generate new quoform', result); // Test Code
                return res.json(result);
              });
          });
        } else {
          const {
            _id,
            currency,
            quoSizes,
            quocWays,
            cmpts,
            mQuos,
            otherExpenses,
            fob,
          } = req.body.form;
          await QuoForm.updateOne(
            { company: comId, _id: _id },
            {
              $set: {
                currency: currency,
                quoSizes: quoSizes,
                quocWays: quocWays,
                cmpts: cmpts,
                mQuos: mQuos,
                otherExpenses: otherExpenses,
                fob: fob,
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

// @route   GET api/quogarment/quotateadvise
// @desc    Get the mtrl quotation from srMtrl
// @access  Private
// @result  return an updated quoForms : Array object
router.put('/quotateadvise', authUser, async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user.quo) {
    return res.status(400).json({ msg: 'Out of authority' });
  }

  const comId = req.user.company;
  const comName = user.comName;
  const comSymbol = user.comSymbol;
  const { quoNo, quoFormId, quoSizes, quocWays } = req.body;
  // console.log(quoNo); // Test Code
  // console.log(quoFormId); // Test Code

  const quoForm = await QuoForm.findOne({
    company: comId,
    quoNo: quoNo,
    _id: quoFormId,
  });

  // console.log(quo); // Test Code
  if (!quoForm) {
    console.log('No such quoForm ');
    return res.status(404).json({
      msg: 'No such quoForm',
    });
  }

  const quoHeadId = quoForm.quoHead;

  const quoHead = await QuoHead.findOne({ _id: quoHeadId });
  if (!quoHead) {
    console.log('No such quoHead ');
    return res.status(404).json({
      msg: 'No such quoHead',
    });
  }

  const cNo = quoHead.cNo;

  // console.log('the cNo from quoForm', cNo); // Test Code
  // console.log('The mQuos from quoForm', quo.quoForms[0]); // Test Code

  const mQuos = quoForm.mQuos;
  if (mQuos.length === 0 || !mQuos) {
    console.log('No such mQuos, build mQuos first ');
    return res.status(404).json({
      msg: 'No such mQuos, build mQuos first',
    });
  }

  const cases = await Case.findOne({ cNo: cNo, company: comId });
  if (!cases) {
    console.log('No such Case ');
    return res.status(404).json({
      msg: 'No such Case',
    });
  }
  const gQtys = cases.gQtys;
  if (gQtys.length === 0 || !gQtys) {
    console.log("The case don't have garment Quantity");
    return res.status(404).json({
      msg: "The case don't have garment Quantity",
    });
  }

  const totalgQty = gQtys.reduce((result, currentItem) => {
    result += currentItem.gQty;
    return result;
  }, 0);

  const sizes = cases.sizes;
  if (sizes.length === 0 || !sizes) {
    console.log("The case don't have garment sizes");
    return res.status(404).json({
      msg: "The case don't have garment sizes",
    });
  }

  const cWays = cases.cWays;
  if (cWays.length === 0 || !cWays) {
    console.log("The case don't have garment color way");
    return res.status(404).json({
      msg: "The case don't have garment color way",
    });
  }

  const mtrls = cases.mtrls;
  if (mtrls.length === 0 || !mtrls) {
    console.log("The case don't have material");
    return res.status(404).json({
      msg: "The case don't have material",
    });
  }

  const insertmtrlQuotation = new Promise(async (resolve, reject) => {
    await QuoForm.updateOne(
      { _id: quoFormId },
      { quoSizes: quoSizes, quocWays: quocWays }
    );
    mQuos.map((mQuo) => {
      let num = 0;
      const mtrlId = mQuo.mtrlId;
      const mtrl = mtrls.find(({ id }) => id === mtrlId);
      if (!mtrl) {
        console.log('The mQuo have the material that not exist in the case');
        return reject('The mQuo have the material that not exist in the case');
      }
      const supplier = mtrl.supplier;
      const ref_no = mtrl.ref_no;
      const CSRIC = (comName + comSymbol + supplier + ref_no)
        .toLowerCase()
        .replace(/[^\da-z]/gi, '');

      const getWeightedAVGPrice = new Promise(async (resolve, reject) => {
        quoSizes.reduce(async (sizeAndColorWeightedPrice, quoSize) => {
          let num = 0;
          const garmentSize = sizes.find(({ gSize }) => gSize === quoSize);
          if (!garmentSize) {
            console.log(
              'The mQuo have the garment size that not exist in the case'
            );
            return reject(
              'The mQuo have the garment size that not exist in the case'
            );
          }
          const gSizeId = garmentSize.id;
          const sizeSPEC = mtrl.sizeSPECs.find(({ size }) => size === gSizeId);
          if (!sizeSPEC) {
            console.log(
              "The material don't have this size SPEC for this garment size"
            );

            return reject(
              "The material don't have this size SPEC for this garment size"
            );
          }
          const materialSPEC = sizeSPEC.mSizeSPEC;

          const gQtyOfTheSize = gQtys.filter((i) => {
            return i.size === gSizeId;
          });
          // console.log('475 gQtyOfTheSize', gQtyOfTheSize); // Test Code

          const totalQtyOfTheSize = gQtyOfTheSize.reduce(
            (result, currentItem) => {
              result += currentItem.gQty;
              return result;
            },
            0
          );
          // console.log('484 totalQtyOfTheSize', totalQtyOfTheSize); // Test Code

          if (totalQtyOfTheSize === 0) {
            console.log("The Size Don't have any quantity");
            return reject("The Size Don't have any quantity");
          }

          console.log('totalQtyOfTheSize', totalQtyOfTheSize);
          console.log('totalgQty', totalgQty);

          const weightOftheSize = totalQtyOfTheSize / totalgQty;

          const getColorWeightedPrice = new Promise((resolve, reject) => {
            let num = 0;
            quocWays.reduce(async (colorWeightedPrice, gColor) => {
              //@_colorWay Id
              const garmentcWay = cWays.find(({ gClr }) => gClr === gColor);
              // console.log('496, the garmentcWay ', garmentcWay); // Test Code
              // console.log('497, the gColor', gColor); // Test Code
              if (!garmentcWay) {
                console.log(
                  'The mQuo have the garment color way that not exist in the case'
                );
                return reject(
                  'The mQuo have the garment color way that not exist in the case'
                );
              }
              const cWayId = garmentcWay.id;

              //@_mtrlColor
              const mtrlColor = mtrl.mtrlColors.find(
                ({ cWay }) => cWay === cWayId
              );
              if (!mtrlColor) {
                console.log("The material don't have this color way");
                return reject("The material don't have this color way");
              }

              //@_srMtrl mtrl quotation
              const materialColor = mtrlColor.mColor;
              const srMtrl = await SRMtrl.findOne(
                {
                  CSRIC: CSRIC,
                  mPrices: {
                    $elemMatch: {
                      mColor: materialColor,
                      sizeSPEC: materialSPEC,
                    },
                  },
                },
                { 'mPrices.$': 1 }
              );
              if (!srMtrl) {
                console.log("The material doesn't have Price yet");
                return reject("The material doesn't have Price yet");
              }
              // console.log('531, the srMtrl ', srMtrl); // Test Code
              const mPrice = srMtrl.mPrices[0];

              // console.log('531, the mPrice ', mPrice); // Test Code
              // console.log('531, the CSRIC ', CSRIC); // Test Code

              const materialQuotation = mPrice.quotation;
              // console.log('542, the gQtyOfTheSize', gQtyOfTheSize); // Test Code
              // console.log('543, The cWayId', cWayId); // Test Code
              const gQty = gQtyOfTheSize.find(({ cWay }) => cWay === cWayId);
              // console.log('546, the gQty', gQty); // Test Code
              const qtyOfTheSizeAndcWay = gQty.gQty;
              const weightOfThecWay = qtyOfTheSizeAndcWay / totalQtyOfTheSize;
              colorWeightedPrice =
                colorWeightedPrice + materialQuotation * weightOfThecWay;
              num = num + 1;
              if (num === quocWays.length) {
                resolve(colorWeightedPrice);
              }

              // .then((result) => {
              //   if (!result) {
              //     console.log("The material don't have srMtrl");
              //     return reject("The material don't have srMtrl");
              //   }
              //   return result;
              // })
              // .then((result) => {
              //   console.log('539, the result ', result);
              //   const materialQuotation = result.quotation;
              //   const gQty = gQtyOfTheSize.find(({ cWay }) => {
              //     cWay = cWayId;
              //   });
              //   const qtyOfTheSizeAndcWay = gQty.gQty;
              //   const weightOfThecWay =
              //     qtyOfTheSizeAndcWay / totalQtyOfTheSize;
              //   colorWeightedPrice =
              //     colorWeightedPrice + materialQuotation * weightOfThecWay;
              //   return colorWeightedPrice;
              // })
              // .then((colorWeightedPrice) => {
              //   num = num + 1;
              //   if (num === quocWays.length) {
              //     resolve(colorWeightedPrice);
              //   }
              // });
            }, 0);
          });

          Promise.all([getColorWeightedPrice])
            .then((result) => {
              const colorWeightedPrice = result[0];
              console.log('The Promise all_1 ', colorWeightedPrice); // Test Code
              sizeAndColorWeightedPrice =
                sizeAndColorWeightedPrice +
                colorWeightedPrice * weightOftheSize;
              console.log('The Promise all_1 weightOftheSize', weightOftheSize); // Test Code
              console.log(
                'The Promise all_1 sizeAndColorWdightedPrice',
                sizeAndColorWeightedPrice
              ); // Test Code
              return sizeAndColorWeightedPrice;
            })
            .then((sizeAndColorWeightedPrice) => {
              num = num + 1;
              if (num === quoSizes.length) {
                return resolve(sizeAndColorWeightedPrice);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }, 0);
      });

      // Connect to mongoDB updload the AVGPRICE
      Promise.all([getWeightedAVGPrice])
        .then(async (result) => {
          const AVGPrice = result[0];
          console.log('The Promise all_2 result ', result); // Test Code
          console.log('The Promise all_2 AVGPrice ', AVGPrice); // Test Code
          const updatedQuoForms = await QuoForm.findOneAndUpdate(
            {
              company: comId,
              quoNo: quoNo,
              _id: quoFormId,
              'mQuos.mtrlId': mtrlId,
            },
            // { $set: { 'quoForms.$.mQuos.mQuoAddvised': AVGPrice } }
            {
              $set: {
                'mQuos.$.mQuoAddvised': AVGPrice,
              },
            }
          );
        })
        .then(async (updatedQuoForms) => {
          num = num + 1;
          if (num === mQuos.length) {
            const quoForms = await QuoForm.find({
              company: comId,
              quoHead: quoHeadId,
            });
            console.log('The Promise all_2 resolove ', updatedQuoForms); // Test Code
            return resolve(quoForms);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    });
  });

  Promise.all([insertmtrlQuotation])
    .then((result) => {
      const resQuoForms = result[0];
      console.log('The material quotation is finished ', resQuoForms); // Test Code
      return res.json(resQuoForms);
    })
    .catch((err) => {
      console.log("MongoDB or internet problem, can't find quoForm", err);
      return res.json({ error: err, quoForms: [] });
    });
});

// @route   DELETE api/quogarment/delete/quoform/cNo/quoFormId
// @desc    Delete the quoForm
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
    // const cNo = req.params.quoNo.slice(0, 14);
    // console.log('This is the cNo', cNo);
    const quoNo = req.params.quoNo;
    const quoFormId = req.params.quoFormId;
    const comId = req.user.company;
    await QuoForm.deleteOne({ quoNo: quoNo, company: comId, _id: quoFormId })
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
// @desc    Delete the mQuos in the quoForms
// @access  Private
// router.delete(
//   '/delete/mquosbymtrl/:cNo/:mtrlId',
//   authUser,
//   async (req, res) => {
//     console.log('The delete mQuo is triggered in backend');
//     const comId = req.user.company;
//     const cNo = req.params.cNo;
//     const mtrlId = req.params.mtrlId;
//     console.log('the comId in deletemquo backEnd', comId);
//     console.log('the cNo in deletemquo backEnd', cNo);
//     console.log('the mtrlId in deletemquo backEnd', mtrlId);

//     const quo = await QUO.findOne({
//       cNo: cNo,
//       company: comId,
//       'quoForms.mQuos.mtrlId': mtrlId,
//     });
//     if (quo) {
//       const quoForms = quo.quoForms;
//       const deleteQuo = new Promise((resolve) => {
//         quoForms.map(async (quoForm) => {
//           let num = 0;
//           await QuoHead.updateOne(
//             {
//               cNo: cNo,
//               company: comId,
//               'quoForms.quoNo': quoForm.quoNo,
//               'quoForms.mQuos.mtrlId': mtrlId,
//             },
//             { $pull: { 'quoForms.$.mQuos': { mtrlId: mtrlId } } }
//           )
//             .then((result) => {
//               console.log('The mquo is deleted', result);
//               num = num + 1;
//               if (num === quoForms.length) {
//                 return resolve();
//               }
//             })
//             .catch((err) => {
//               console.log('The delete mQuo is failed,', err);
//             });
//         });
//       });
//       Promise.all([deleteQuo]).then(() => {
//         console.log('The quos is deleted by mtrl');
//         return res.json({ msg: 'the quos is deleted by mtrl' });
//       });
//     } else {
//       console.log('No such quotation data');
//       return res.status(404).json({ msg: 'No such quotation data' });
//     }
//   }
// );

module.exports = router;
