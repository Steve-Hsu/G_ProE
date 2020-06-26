import React, { useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import SrMtrlContext from './srMtrlContext';
import SrMtrlReducer from './srMtrlReducer';
import { LIST_MTRL } from '../types';

const SrMtrlState = (props) => {
  // @States------------------------------------------------------
  const initialState = {
    srMtrls: [],
  };

  const [state, dispatch] = useReducer(SrMtrlReducer, initialState);

  // const NewMtrlList = {
  //   id: uuidv4(),
  //   supplier: null,
  //   ref_no: null,
  //   MIC: null,
  //   mColors: [],
  //   mSPECs: [],
  //   currency: null,
  //   mPrices: [],
  //   appliedCase: {
  //     caseId: null,
  //     caseNo: null,
  //   },
  // };

  // @Actions------------------------------------------------------
  // Add srMtrls by uploading of cases
  const generateMtrlLists = async (cases, comName, comSymbol) => {
    let mLists = [];
    let mtrls = cases.mtrls;
    mtrls.map((mtrl) => {
      let csr = '';
      let newCSRIC = '';
      let existingMtrlObj = {};
      let mtrlObj = {};
      csr = comName + comSymbol + mtrl.supplier + mtrl.ref_no;
      csr = csr.toLowerCase();
      newCSRIC = csr.replace(/[^\da-z]/gi, ''); // Only read from "0" to "9" & "a" to "z"

      existingMtrlObj = mLists.find(({ CSRIC }) => CSRIC === newCSRIC);

      if (!existingMtrlObj) {
        mtrlObj = {
          supplier: mtrl.supplier,
          ref_no: mtrl.ref_no,
          CSRIC: newCSRIC,
          mtrlColors: [],
          sizeSPECs: [],
          currency: '',
          mPrices: '',
          company: cases.company,
        };
      } else {
        mtrlObj = existingMtrlObj;
      }

      mtrl.mtrlColors.map((mtrlColor) => {
        let existingColor = mtrlObj.mtrlColors.find(
          ({ mColor }) => mColor === mtrlColor.mColor
        );
        if (!existingColor) {
          mtrlObj.mtrlColors.push({
            id: uuidv4(),
            mColor: mtrlColor.mColor,
            refs: [
              {
                id: uuidv4(),
                caseId: cases._id,
                mtrlId: mtrl.id,
              },
            ],
          });
        } else {
          existingColor.refs.push({
            id: uuidv4(),
            caseId: cases._id,
            mtrlId: mtrl.id,
          });
        }
      });
      mtrl.sizeSPECs.map((sizeSPEC) => {
        let existingsSPEC = mtrlObj.sizeSPECs.find(
          ({ mSizeSPEC }) => mSizeSPEC === sizeSPEC.mSizeSPEC
        );
        if (!existingsSPEC) {
          mtrlObj.sizeSPECs.push({
            id: uuidv4(),
            mSizeSPEC: sizeSPEC.mSizeSPEC,
            refs: [
              {
                id: uuidv4(),
                caseId: cases._id,
                mtrlId: mtrl.id,
              },
            ],
          });
        } else {
          existingsSPEC.refs.push({
            id: uuidv4(),
            caseId: cases._id,
            mtrlId: mtrl.id,
          });
        }
      });
      if (!existingMtrlObj) {
        return mLists.push(mtrlObj);
      } else {
        return mLists;
      }
    });
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      await axios.put(`/api/purchase/${cases._id}`, mLists, config);
      dispatch({ type: LIST_MTRL, payload: mLists });
    } catch (err) {
      console.log('Upload mPrice faild, server problems');
    }
  };

  //@ Delete Mtrl
  const deleteSRMtrlByMtrl = async (comName, comSymbol, mtrl, casesId) => {
    const csr = comName + comSymbol + mtrl.supplier + mtrl.ref_no;
    const lowerCasecsr = csr.toLowerCase();
    const csric = lowerCasecsr.replace(/[^\da-z]/gi, '');
    //Make a fake body for backend
    const body = { CSRIC: csric }; // Only read from "0" to "9" & "a" to "z"}

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    await axios.put(`/api/purchase/${casesId}/${mtrl.id}`, body, config);
  };

  // @Returns------------------------------------------------------

  return (
    <SrMtrlContext.Provider
      value={{
        mtrlLists: state.mtrlLists,
        generateMtrlLists,
        deleteSRMtrlByMtrl,
      }}
    >
      {props.children}
    </SrMtrlContext.Provider>
  );
};

export default SrMtrlState;
