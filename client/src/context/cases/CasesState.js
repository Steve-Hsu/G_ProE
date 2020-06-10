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
} from '../types';

const CasesState = (props) => {
  // object Model
  // For setting state more convenient
  const newCWay = {
    id: uuidv4(),
    gClr: null,
  };
  const newSize = {
    id: uuidv4(),
    value: null,
  };
  const newMtrl = {
    id: uuidv4(),
    item: null,
    spec: null,
    supplier: null,
    ref_no: null,
    position: null,
    description: null,
    unit: null,
    mtrlColors: [],
    expandColor: false,
  };
  // State
  const initialStete = {
    style: null,
    client: null,
    cWays: [],
    sizes: [],
    mtrls: [],
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
        mColor: null,
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

  // Export using functions --------------
  const addSize = (e) => {
    // e.preventDefault : the e here is the app itself. Prevent it set back to default value
    e.preventDefault();
    if (sizes.length < 15) {
      dispatch({ type: SIZE_ADD, payload: newCWay });
    }
  };

  const deleteSize = (e) => {
    e.preventDefault();
    dispatch({ type: SIZE_DELETE, payload: e.target.value });
  };

  const addcWay = (e) => {
    e.preventDefault();
    const cWayId = uuidv4();
    if (cWays.length < 20) {
      // Add the new color way to each material
      updateMtrlColor(cWayId);
      dispatch({ type: CLR_WAY_ADD, payload: { id: cWayId, gClr: '' } });
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

  const addMtrl = (e) => {
    e.preventDefault();
    //Update the mtrlColors to the new mtrl, before adding it to mtrls
    cWays.map((cWay) => {
      newMtrl.mtrlColors.push({
        id: uuidv4(),
        mtrl: newMtrl.id,
        cWay: cWay.id,
        mColor: null,
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

  return (
    <CasesContext.Provider
      value={{
        style: state.style,
        client: state.client,
        cWays: state.cWays,
        sizes: state.sizes,
        mtrls: state.mtrls,
        addSize,
        deleteSize,
        addcWay,
        updatecWay,
        deletecWay,
        addMtrl,
        deleteMtrl,
        expandMtrlColor,
      }}
    >
      {props.children}
    </CasesContext.Provider>
  );
};

export default CasesState;
