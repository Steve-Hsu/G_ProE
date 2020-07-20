const express = require('express');
const router = express.Router();
const authUser = require('../middleware/authUser');
const { check, validationResult } = require('express-validator');

const User = require('../models/10_User');
const Case = require('../models/20_Case');

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
    console.log('The upload newcase is called in backend'); // Test Code

    const { caseType, style, client, cWays, sizes, gQtys, mtrls } = req.body;
    //@ Delete the white space from strings of array items in the body, the cWays, sizes, and mtrls
    let trimedStyle = '';
    let trimedClient = '';
    if (style !== null || style !== '') {
      trimedStyle = style.toLowerCase().trim();
    }
    if (client !== null || client !== '') {
      trimedClient = client.toLowerCase().trim();
    }
    const trimedcWays = new Promise((resolve) => {
      console.log('Promise start- trimedcWays'); // Test Code
      if (cWays.length > 0) {
        let num = 0;
        cWays.map((cWay) => {
          const trimTheCWay = new Promise((resolve) => {
            //Trim the gClr
            if (cWay.gClr === '' || cWay.gClr === null) {
              cWay.gClr = 'empty colorway';
              resolve();
            } else {
              cWay.gClr = cWay.gClr.toLowerCase().trim();
              resolve();
            }
          });

          // Prevent duplicated empty colorWay
          const preventDuplicatedCWay = new Promise((resolve) => {
            Promise.all([trimTheCWay]).then(() => {
              const currentcWay = cWay.gClr;
              const numOfThecWay = cWays.filter((el) => el.gClr === currentcWay)
                .length;
              if (numOfThecWay > 1) {
                let count = 0;
                let num = 0;
                cWays.map((cWay) => {
                  num++;
                  if (cWay.gClr === currentcWay) {
                    count++;
                    cWay.gClr =
                      currentcWay + ' - duplicated_colorway_' + String(count);
                  }

                  if (num === cWays.length) {
                    resolve();
                  }
                });
              } else {
                resolve();
              }
            });
          });

          Promise.all([preventDuplicatedCWay]).then(() => {
            num = num + 1;
            if (num === cWays.length) {
              console.log('Promise trimedcWays');
              return resolve();
            }
          });
        });
      } else {
        return resolve();
      }
    });

    const trimedSizes = new Promise((resolve) => {
      console.log('Promise start- trimedSizes'); // Test Code
      if (sizes.length > 0) {
        let sizeCounter = 0;
        sizes.map((size) => {
          size.gSize = size.gSize.toUpperCase().trim();
          sizeCounter = sizeCounter + 1;
          if (sizeCounter === sizes.length) {
            console.log('Promise resolve- trimedSizes'); // Test Code
            return resolve();
          }
        });
      } else {
        console.log('Promise resolve- not built sizes yet - trimedSizes'); // Test Code
        return resolve();
      }
    });

    //@Steve:  I can set schema to prevent this sring or number problem, however it is a hole for how still code form frontEnd
    const numberThegQty = new Promise((resolve) => {
      if (gQtys.length > 0) {
        let num = 0;
        gQtys.map((gQty) => {
          gQty.gQty = Number(gQty.gQty);
          num = num + 1;
          if (num === gQtys.length) {
            console.log('Promise resolve- numberThegQty'); // Test Code
            return resolve();
          }
        });
      } else {
        console.log('Promise resolve- not built gQty yet - numberThegQty'); // Test Code
        return resolve();
      }
    });

    const trimedMtrls = new Promise((resolve, reject) => {
      console.log('Promise start- trimedMtrls'); // Test Code
      if (mtrls.length > 0) {
        let trimCounter = 0;
        mtrls.map((mtrl) => {
          const mtrlList = [
            'item',
            'spec',
            'supplier',
            'ref_no',
            'position',
            'description',
          ];
          mtrlList.map((x) => {
            if (mtrl[x] !== '' || mtrl[x] !== null)
              mtrl[x] = mtrl[x].toLowerCase().trim();
          });

          const mtrlColorPromise = new Promise((resolve) => {
            console.log('Promise start- mtrlColorPromise'); // Test Code
            let num = 0;
            mtrl.mtrlColors.map((mtrlColor) => {
              mtrlColor.mColor = mtrlColor.mColor.toLowerCase().trim();
              num = num + 1;
              if (num === mtrl.mtrlColors.length) {
                console.log('Promise resolve- mtrlColorPromise'); // Test Code
                return resolve();
              }
            });
          });

          const mtrlSPECPromise = new Promise((resolve) => {
            console.log('Promise start- mtrlSPECPromise'); // Test Code
            let num = 0;
            mtrl.sizeSPECs.map((sizeSPEC) => {
              sizeSPEC.mSizeSPEC = sizeSPEC.mSizeSPEC.toLowerCase().trim();
              num = num + 1;
              if (num === mtrl.sizeSPECs.length) {
                console.log('Promise resolve- mtrlSPECPromise'); // Test Code
                return resolve();
              }
            });
          });

          const mtrlCsptPromise = new Promise((resolve) => {
            console.log('Promise start- mtrlCsptPromise'); // Test Code
            let num = 0;
            mtrl.cspts.map((cspt) => {
              cspt.mColor = cspt.mColor.toLowerCase().trim();
              cspt.mSizeSPEC = cspt.mSizeSPEC.toLowerCase().trim();
              cspt.unit = cspt.unit.toLowerCase().trim();
              cspt.cspt = Number(cspt.cspt);
              num = num + 1;
              if (num === mtrl.cspts.length) {
                console.log('Promise resolve- mtrlCsptPromise'); // Test Code
                return resolve();
              }
            });
          });

          Promise.all([
            mtrlColorPromise,
            mtrlSPECPromise,
            mtrlCsptPromise,
          ]).then(() => {
            console.log('1st Promise all start- '); // Test Code
            trimCounter = trimCounter + 1;
            if (trimCounter === mtrls.length) {
              console.log('1st Promise All resolve'); // Test Code
              return resolve();
            }
          });
        });
      } else {
        console.log('Promise trimedMtrls resolve - no mtrls '); // Test Code
        return resolve();
      }
    });

    const comSymbol = user.comSymbol;

    //Generator newCaseNumber

    //Get last 2 digits of year
    let strDate = new Date(); // By default Date empty constructor give you Date.now
    let shortYear = strDate.getFullYear();
    let twoDigitYear = shortYear.toString().substr(-2); // Add this line

    const cases = await Case.find({
      $and: [
        { company: req.user.company },
        { cNo: { $regex: comSymbol + twoDigitYear + 'C', $options: 'i' } }, // Query the same cases in same year by cNo, It promises return cases of same company in same year
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

    //Define caseType
    let caseTypeSymbol = '';
    switch (caseType) {
      case 'Bulk':
        caseTypeSymbol = 'B';
        break;
      case 'Salesman Sample':
        caseTypeSymbol = 'S';
        break;
      case 'Test Sample':
        caseTypeSymbol = 'T';
        break;
      default:
    }

    let newCaseNumber = caseNumber.toString().split(',').join('');
    let newCNO =
      comSymbol +
      twoDigitYear +
      'C' +
      '_' +
      newCaseNumber +
      '_' +
      caseTypeSymbol;

    Promise.all([trimedcWays, numberThegQty, trimedSizes, trimedMtrls])
      .then(async () => {
        const newCase = new Case({
          user: req.user.id,
          company: req.user.company,
          cNo: newCNO,
          caseType,
          style: trimedStyle,
          client: trimedClient,
          cWays,
          sizes,
          gQtys,
          mtrls,
        });
        // name variable "case" will cause problem, so here name it "nCase"
        const nCase = await newCase.save();

        res.json(nCase);
      })
      .catch((err) => {
        console.error(err.message);
        res.status(500).send('Server Errors');
      });
  }
);

// @route   PUT api/case/:_id
// @desc    Update case
// @Steve   Don't allow to change the cNo. Prevent messing up the jobs of user.
// @access  Private
router.put('/:id', authUser, async (req, res) => {
  // Check if the user has authority to update case ---------------------------
  const caseId = req.params.id;
  console.log('update case caseId', caseId);
  console.log('update case is triggered in backend');
  let user = await User.findById(req.user.id);
  if (!user.cases) {
    return res.status(400).json({
      msg: 'Out of authority',
    });
  }

  // Check if the user have the authority to update the case -------------------
  let cases = await Case.findById(caseId);
  // If the user is case creator, pass !
  if (cases.user.toString() === req.user.id) {
    // if the user's id is added to authorizedUser of this case, pass !
  } else if (cases.authorizedUser.includes(req.user.id)) {
  } else {
    return res.status(400).json({ msg: 'Not an authorized user.' });
  }

  if (cases) {
    // Update case ---------------------------------------------------------------
    const caseFields = req.body;
    const { cWays, gQtys, mtrls } = caseFields;
    //@ Delete the white space from strings of array items in the body, the cWays, and mtrls
    if (caseFields.style !== '' || caseFields.style !== null) {
      caseFields.style = caseFields.style.toLowerCase().trim();
    }

    if (caseFields.client !== '' || caseFields.client !== null) {
      caseFields.client = caseFields.client.toLowerCase().trim();
    }

    const trimedcWays = new Promise((resolve) => {
      if (cWays.length > 0) {
        let num = 0;
        cWays.map((cWay) => {
          const trimTheCWay = new Promise((resolve) => {
            //Trim the gClr
            if (cWay.gClr === '' || cWay.gClr === null) {
              cWay.gClr = 'empty colorway';
              resolve();
            } else {
              cWay.gClr = cWay.gClr.toLowerCase().trim();
              resolve();
            }
          });

          // Prevent duplicated empty colorWay
          const preventDuplicatedCWay = new Promise((resolve) => {
            Promise.all([trimTheCWay]).then(() => {
              const currentcWay = cWay.gClr;
              const numOfThecWay = cWays.filter((el) => el.gClr === currentcWay)
                .length;
              if (numOfThecWay > 1) {
                let count = 0;
                let num = 0;
                cWays.map((cWay) => {
                  num++;
                  if (cWay.gClr === currentcWay) {
                    count++;
                    cWay.gClr =
                      currentcWay + ' - duplicated_colorway_' + String(count);
                  }

                  if (num === cWays.length) {
                    resolve();
                  }
                });
              } else {
                resolve();
              }
            });
          });

          Promise.all([preventDuplicatedCWay]).then(() => {
            num = num + 1;
            if (num === cWays.length) {
              console.log('Promise trimedcWays');
              return resolve();
            }
          });
        });
      } else {
        return resolve();
      }
    });

    //@Steve:  I can set schema to prevent this sring or number problem, however it is a hole for how still code form frontEnd
    const numberThegQty = new Promise((resolve) => {
      if (gQtys.length > 0) {
        let num = 0;
        gQtys.map((gQty) => {
          gQty.gQty = Number(gQty.gQty);
          num = num + 1;
          if (num === gQtys.length) {
            console.log('Promise resolve- numberThegQty'); // Test Code
            return resolve();
          }
        });
      } else {
        console.log('Promise resolve- not built gQty yet - numberThegQty'); // Test Code
        return resolve();
      }
    });

    const trimedMtrls = new Promise((resolve, reject) => {
      if (mtrls.length > 0) {
        let trimCounter = 0;
        mtrls.map((mtrl) => {
          const mtrlList = [
            'item',
            'spec',
            'supplier',
            'ref_no',
            'position',
            'description',
          ];
          mtrlList.map((x) => {
            if (mtrl[x] !== '' || mtrl[x] !== null)
              mtrl[x] = mtrl[x].toLowerCase().trim();
          });

          const mtrlColorPromise = new Promise((resolve) => {
            if (mtrl.mtrlColors.length > 0) {
              let num = 0;
              mtrl.mtrlColors.map((mtrlColor) => {
                if (mtrl.mColor !== '' || mtrl.mColor !== null) {
                  mtrlColor.mColor = mtrlColor.mColor.toLowerCase().trim();
                }

                num = num + 1;
                if (num === mtrl.mtrlColors.length) {
                  console.log('Promise mtrlColorPromise');
                  return resolve();
                }
              });
            } else {
              return resolve();
            }
          });

          const mtrlSPECPromise = new Promise((resolve) => {
            if (mtrl.sizeSPECs.length > 0) {
              let num = 0;
              mtrl.sizeSPECs.map((sizeSPEC) => {
                if (sizeSPEC.mSizeSPEC !== '' || sizeSPEC.mSizeSPEC !== null) {
                  sizeSPEC.mSizeSPEC = sizeSPEC.mSizeSPEC.toLowerCase().trim();
                }

                num = num + 1;
                if (num === mtrl.sizeSPECs.length) {
                  console.log('Promise mtrlSPECPromise');
                  return resolve();
                }
              });
            } else {
              return resolve();
            }
          });

          const mtrlCsptPromise = new Promise((resolve) => {
            console.log('Promise start- mtrlCsptPromise'); // Test Code
            let num = 0;
            mtrl.cspts.map((cspt) => {
              cspt.mColor = cspt.mColor.toLowerCase().trim();
              cspt.mSizeSPEC = cspt.mSizeSPEC.toLowerCase().trim();
              cspt.unit = cspt.unit.toLowerCase().trim();
              cspt.cspt = Number(cspt.cspt);
              num = num + 1;
              if (num === mtrl.cspts.length) {
                console.log('Promise resolve- mtrlCsptPromise'); // Test Code
                return resolve();
              }
            });
          });

          Promise.all([
            mtrlColorPromise,
            mtrlSPECPromise,
            mtrlCsptPromise,
          ]).then(() => {
            trimCounter = trimCounter + 1;
            if (trimCounter === mtrls.length) {
              console.log('Promise mtrlPromiseAll');
              return resolve();
            }
          });
        });
      } else {
        return resolve();
      }
    });

    // Get the id of case from URL by params
    Promise.all([trimedcWays, numberThegQty, trimedMtrls])
      .then(async () => {
        console.log('The Finall PromiseAll');
        // if (!cases){}
        //   return res.status(404).json({
        //     msg: 'Case not found',
        //   });

        const updatedCase = await Case.findOneAndUpdate(
          { _id: caseId },
          {
            $set: caseFields,
          },
          { new: true }
        );
        return updatedCase;
        // method .updateOne() will not return the case it self, so here make a one, named "updateCases" and return to the fronend client.
      })
      .then((result) => {
        console.log('The case is updated');
        return res.json(result);
      })
      .catch((err) => {
        console.error(err.message);
        res.status(500).send('Server Error');
      });
  } else {
    return console.log(
      "No such case, therefore can't update the case, may be caseId got problem"
    );
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
    // await CaseMtrl.deleteMany({ caseId: req.params.id });

    res.json({
      msg: 'Case removed',
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
