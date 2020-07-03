import React, { useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import SrMtrlContext from './srMtrlContext';
import SrMtrlReducer from './srMtrlReducer';
import { SRMTRL_DOWNLOAD, TOGGLE_ISUPDATE, SRMTRL_UPDATE } from '../types';

const SrMtrlState = (props) => {
  //@ States------------------------------------------------------
  const initialState = {
    srMtrls: [],
    isUpdated: false,
  };

  const [state, dispatch] = useReducer(SrMtrlReducer, initialState);
  const { srMtrls } = state;
  //@ Id for prevent uuid duplicated
  const generateId = () => {
    return (
      //generate 22 digits string with number or character.
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  };

  //@ new Items
  const newMPrice = {
    id: uuidv4() + generateId(),
    mColor: '',
    sizeSPEC: '',
    unit: '',
    currency: '',
    mPrice: '',
    moq: '',
    moqPrice: '',
  };

  //@ Actions------------------------------------------------------

  //@1 Get srMtrl
  const getSrMtrls = async () => {
    const srMtrls = await axios.get('/api/srmtrl');
    // Now matter what you return in the router, the axios will return a object in format that have head and data, you need to put foo.data to the payload, or you will get exatra datas like head.
    dispatch({ type: SRMTRL_DOWNLOAD, payload: srMtrls.data });
  };

  //@1 Add srMtrls by uploading of cases
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
      //If the srMtrl is not existing in the mLists then generete a new one
      if (!existingMtrlObj) {
        mtrlObj = {
          supplier: mtrl.supplier,
          ref_no: mtrl.ref_no,
          CSRIC: newCSRIC,
          mtrlColors: [],
          sizeSPECs: [],
          mPrices: [],
          company: cases.company,
          expandPrice: false,
        };
      } else {
        mtrlObj = existingMtrlObj;
      }

      mtrl.mtrlColors.map((mtrlColor) => {
        let existingColor = mtrlObj.mtrlColors.find(
          ({ mColor }) => mColor === mtrlColor.mColor
        );
        if (!existingColor) {
          //If not such mtrlColor, then create a new one
          mtrlObj.mtrlColors.push({
            id: uuidv4() + generateId(),
            mColor: mtrlColor.mColor,
            refs: [
              {
                caseId: cases._id,
                mtrlId: mtrl.id,
              },
            ],
          });
        } else {
          let sameMtrlInSameColor = existingColor.refs.find(
            ({ caseId, mtrlId }) => caseId === cases._id && mtrlId === mtrl.id
          );
          if (sameMtrlInSameColor) {
            // same mtrl if in same mColor then don't need to generate a new refs. Just need a set mtrlId and caseId in thie mColor
          } else {
            existingColor.refs.push({
              caseId: cases._id,
              mtrlId: mtrl.id,
            });
          }
        }
      });
      mtrl.sizeSPECs.map((sizeSPEC) => {
        let existingsSPEC = mtrlObj.sizeSPECs.find(
          ({ mSizeSPEC }) => mSizeSPEC === sizeSPEC.mSizeSPEC
        );
        if (!existingsSPEC) {
          //IF no such sizeSPEC then create a new one
          mtrlObj.sizeSPECs.push({
            id: uuidv4() + generateId(),
            mSizeSPEC: sizeSPEC.mSizeSPEC,
            refs: [
              {
                caseId: cases._id,
                mtrlId: mtrl.id,
              },
            ],
          });
        } else {
          let sameSizeSPECInSameSPEC = existingsSPEC.refs.find(
            ({ caseId, mtrlId }) => caseId === cases._id && mtrlId === mtrl.id
          );
          if (sameSizeSPECInSameSPEC) {
            // same mSizeSPEC if in same sizeSPEC then don't need to generate a new refs.
          } else {
            existingsSPEC.refs.push({
              caseId: cases._id,
              mtrlId: mtrl.id,
            });
          }
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
      await axios.put(`/api/srmtrl/${cases._id}`, mLists, config);
      dispatch({ type: TOGGLE_ISUPDATE, payload: true });
    } catch (err) {
      console.log('Upload srMtrl faild, server problems');
    }
  };

  //@1 Delete refs in srMtrl by delete Mtrl
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
    await axios.put(`/api/srmtrl/${casesId}/${mtrl.id}`, body, config);
  };

  //@1 turn isUpdated false
  const turnSrMtrlIsUpdatedFalse = () => {
    dispatch({ type: TOGGLE_ISUPDATE, payload: false });
  };

  //@1 add new mPrice
  const addMPrice = (srMtrlId) => {
    let srMaterials = srMtrls;
    let srMaterial = srMaterials.find(({ _id }) => _id === srMtrlId);
    srMaterial.mPrices.push(newMPrice);
    dispatch({ type: SRMTRL_UPDATE, payload: srMaterials });
  };

  //@1 Delete srMtrl
  const deleteSrMtrlPrice = (e) => {
    const srMtrlId = e.target.value;
    const mPriceId = e.target.name;
    let srMaterials = srMtrls;
    srMaterials.map((srMtrl) => {
      return (srMtrl.mPrices = srMtrl.mPrices.filter(
        (mPrice) => mPrice.id !== mPriceId
      ));
    });

    dispatch({ type: SRMTRL_UPDATE, payload: srMaterials });
  };

  //@1 Add Value to mPrice
  const addSrMtrlValue = (e, srMtrlId, mPriceList) => {
    // For label tag need to target the Id, so here we save the id in the e.target.name
    const mPriceId = e.target.name;
    let srMaterials = srMtrls;
    let srMaterial = srMaterials.find(({ _id }) => _id === srMtrlId);

    mPriceList.map((m) => {
      let matchPatter = `${m}${mPriceId}`;
      if (e.target.id === matchPatter) {
        srMaterial.mPrices.map((mPrice) => {
          if (mPrice.id === mPriceId) {
            mPrice[m] = e.target.value;
          }
        });
      }
    });
    dispatch({ type: SRMTRL_UPDATE, payload: srMaterials });
  };
  //@ Returns------------------------------------------------------

  return (
    <SrMtrlContext.Provider
      value={{
        srMtrls: state.srMtrls,
        isUpdated: state.isUpdated,
        getSrMtrls,
        generateMtrlLists,
        deleteSRMtrlByMtrl,
        turnSrMtrlIsUpdatedFalse,
        addMPrice,
        deleteSrMtrlPrice,
        addSrMtrlValue,
      }}
    >
      {props.children}
    </SrMtrlContext.Provider>
  );
};

export default SrMtrlState;
