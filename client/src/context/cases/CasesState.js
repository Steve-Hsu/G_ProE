import React, { useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import CasesContext from './casesContext';
import CasesReducer from './casesReducer';

//Global Header for token
import setAuthToken from '../../utils/setAuthToken';

import {
  SIZE_ADD,
  SIZE_UPDATE,
  SIZE_DELETE,
  CLR_WAY_ADD,
  CLR_WAY_UPDATE,
  CLR_WAY_DELETE,
  MTRL_ADD,
  MTRL_UPDATE,
  MTRL_DELETE,
  CASE_TOGGLE_POPOVER,
  CURRENT_ADD,
  CURRENT_DELETE,
} from '../types';
import casesContext from './casesContext';

const CasesState = (props) => {
  // object Model
  // For setting state more convenient
  const newCWay = {
    id: uuidv4(),
    gClr: '',
  };
  const newSize = {
    id: uuidv4(),
    gSize: '',
  };

  // According to React : default input should not be an 'null'
  const newMtrl = {
    id: uuidv4(),
    item: '',
    spec: '',
    supplier: '',
    ref_no: '',
    position: '',
    description: '',
    unit: '',
    mtrlColors: [],
    sizeSPECs: [],
    expandColor: false,
    expandSizeSPEC: false,
    expandCspt: false,
  };
  // State
  const initialStete = {
    style: null,
    client: null,
    cWays: [],
    sizes: [],
    mtrls: [],
    popover: false,
    current: null,
  };

  const [state, dispatch] = useReducer(CasesReducer, initialStete);
  const { sizes, cWays, mtrls } = state;

  // Actions --------------------------------------------------------
  // Only applying in this scope for other functions ----------
  const updateMtrlColor = (cWayId) => {
    let materials = mtrls;
    materials.map((mtrl) => {
      mtrl.mtrlColors.push({
        id: uuidv4(),
        mtrl: mtrl.id,
        cWay: cWayId,
        mColor: '',
      });
    });
    dispatch({ type: MTRL_UPDATE, payload: materials });
  };

  const deleteMtrlColor = (cWayId) => {
    let materials = mtrls;
    materials.map((mtrl) => {
      mtrl.mtrlColors = mtrl.mtrlColors.filter(
        (mtrlColor) => mtrlColor.cWay !== cWayId
      );
    });
    dispatch({ type: MTRL_UPDATE, payload: materials });
  };

  const updateMtrlSizeSPEC = (sizeId) => {
    let materials = mtrls;
    materials.map((mtrl) => {
      mtrl.sizeSPECs.push({
        id: uuidv4(),
        mtrl: mtrl.id,
        size: sizeId,
        mSizeSPEC: '',
      });
    });
    dispatch({ type: MTRL_UPDATE, payload: materials });
  };

  const deleteMtrlSizeSPEC = (sizeId) => {
    let materials = mtrls;
    materials.map((mtrl) => {
      mtrl.sizeSPECs = mtrl.sizeSPECs.filter(
        (mtrlSPEC) => mtrlSPEC.size !== sizeId
      );
    });
    dispatch({ type: MTRL_UPDATE, payload: materials });
  };

  // Export using functions --------------
  const addcWay = (e) => {
    e.preventDefault();
    if (cWays.length < 20) {
      // Add the new color way to each material
      updateMtrlColor(newCWay.id);
      dispatch({ type: CLR_WAY_ADD, payload: newCWay });
    }
  };

  const updatecWay = (e) => {
    e.preventDefault();
    const targetID = e.target.id;
    // Prevent the computer confused two cWays so the variable named "colorWay"
    const colorWays = cWays;
    //Toggle the value
    colorWays.find(({ id }) => id === targetID).gClr = e.target.value;
    dispatch({ type: CLR_WAY_UPDATE, payload: colorWays });
  };

  const deletecWay = (e) => {
    e.preventDefault();
    const cWayId = e.target.value;
    //Delete the cWay in eatch mtrl
    deleteMtrlColor(cWayId);
    dispatch({ type: CLR_WAY_DELETE, payload: cWayId });
  };

  const addSize = (e) => {
    // e.preventDefault : the e here is the app itself. Prevent it set back to default value
    e.preventDefault();
    // Add the new Size to each material
    updateMtrlSizeSPEC(newSize.id);
    if (sizes.length < 15) {
      dispatch({ type: SIZE_ADD, payload: newSize });
    }
  };

  const updateSize = (e) => {
    e.preventDefault();
    const targetID = e.target.id;
    // Prevent the computer confused two cWays so the variable named "colorWay"
    const gSizes = sizes;
    //Toggle the value
    gSizes.find(({ id }) => id === targetID).gSize = e.target.value;
    dispatch({ type: SIZE_UPDATE, payload: gSizes });
  };

  const deleteSize = (e) => {
    console.log('This is e', e.target);
    e.preventDefault();
    const sizeId = e.target.value;
    //Delete the size SPEC in eatch mtrl
    deleteMtrlSizeSPEC(sizeId);
    dispatch({ type: SIZE_DELETE, payload: sizeId });
  };

  const addMtrl = (e) => {
    e.preventDefault();
    //Update the mtrlColors to the new mtrl, before adding it to mtrls
    cWays.map((cWay) => {
      newMtrl.mtrlColors.push({
        id: uuidv4(),
        mtrl: newMtrl.id,
        cWay: cWay.id,
        mColor: '',
      });
    });

    sizes.map((size) => {
      newMtrl.sizeSPECs.push({
        id: uuidv4(),
        mtrl: newMtrl.id,
        size: size.id,
        mSizeSPEC: '',
      });
    });

    if (mtrls.length < 500) {
      dispatch({ type: MTRL_ADD, payload: newMtrl });
    }
  };

  const deleteMtrl = (e) => {
    const id = e.target.value;
    e.preventDefault();
    dispatch({ type: MTRL_DELETE, payload: id });
  };

  const expandMtrlColor = (e) => {
    e.preventDefault();
    //The id is set in the value of the btn when which is created. so here we fetch id by e.target.value.
    const mtrlId = e.target.value;
    const materials = mtrls;
    materials.find(({ id }) => id === mtrlId).expandColor = !materials.find(
      ({ id }) => id === mtrlId
    ).expandColor;

    dispatch({ type: MTRL_UPDATE, payload: materials });
  };

  const expandSizeSPEC = (e) => {
    e.preventDefault();
    //The id is set in the value of the btn when which is created. so here we fetch id by e.target.value.
    const mtrlId = e.target.value;
    const materials = mtrls;
    materials.find(({ id }) => id === mtrlId).expandSizeSPEC = !materials.find(
      ({ id }) => id === mtrlId
    ).expandSizeSPEC;

    dispatch({ type: MTRL_UPDATE, payload: materials });
  };

  // This code works too, but seems foo much useless looping.
  // const addValueMtrlColor = (e) => {
  //   e.preventDefault();
  //   const targetId = e.target.id;
  //   const materials = mtrls;

  //   materials.map((mtrl) => {
  //     mtrl.mtrlColors.map((mtrlColor) => {
  //       if (mtrlColor.id === targetId) {
  //         mtrlColor.mColor = e.target.value;
  //       }
  //     });
  //   });

  const addValueMtrlColor = (e) => {
    e.preventDefault();
    const mtrlId = e.target.name;
    const targetId = e.target.id;
    //??? This code works, however I still don't know why the sup variable will affect parent variable here.
    let materials = mtrls;
    let material = materials.find(({ id }) => id === mtrlId);
    material.mtrlColors.find(({ id }) => id === targetId).mColor =
      e.target.value;

    dispatch({ type: MTRL_UPDATE, payload: materials });
  };

  const addValueMtrlSizeSPEC = (e) => {
    e.preventDefault();
    const mtrlId = e.target.name;
    const targetId = e.target.id;
    //??? This code works, however I still don't know why the sup variable will affect parent variable here.
    let materials = mtrls;
    let material = materials.find(({ id }) => id === mtrlId);
    material.sizeSPECs.find(({ id }) => id === targetId).mSizeSPEC =
      e.target.value;

    dispatch({ type: MTRL_UPDATE, payload: materials });
  };

  const togglePopover = (e) => {
    e.preventDefault();
    //The id is set in the value of the btn when which is created. so here we fetch id by e.target.value.

    const newPopover = !state.popover;
    dispatch({ type: CASE_TOGGLE_POPOVER, payload: newPopover });
    if (newPopover) {
      const targetId = e.target.value;
      let subject = {};
      switch (e.target.name) {
        case 'cWay':
          subject = cWays.find(({ id }) => id === targetId);
          break;
        case 'size':
          subject = sizes.find(({ id }) => id === targetId);
          break;
        case 'mtrl':
          subject = mtrls.find(({ id }) => id === targetId);
          break;
        default:
          subject = { key: 'no target id' };
      }

      dispatch({ type: CURRENT_ADD, payload: subject });
    } else {
      dispatch({ type: CURRENT_DELETE });
    }
  };

  return (
    <CasesContext.Provider
      value={{
        style: state.style,
        client: state.client,
        cWays: state.cWays,
        sizes: state.sizes,
        mtrls: state.mtrls,
        popover: state.popover,
        current: state.current,
        addcWay,
        updatecWay,
        deletecWay,
        addSize,
        updateSize,
        deleteSize,
        addMtrl,
        deleteMtrl,
        expandMtrlColor,
        expandSizeSPEC,
        addValueMtrlColor,
        addValueMtrlSizeSPEC,
        togglePopover,
      }}
    >
      {props.children}
    </CasesContext.Provider>
  );
};

export default CasesState;
