import React, { useReducer, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import PopoverContext from './popoverContext';
import popoverReducer from './popoverReducer';
import {
  TOGGLE_POPOVER,
  CURRENT_ADD,
  CURRENT_DELETE,
  TOGGLE_LOADING,
  ADD_DOUBLECHECK_VALUE,
} from '../types';
import CasesContext from '../../context/cases/casesContext';
import QuoContext from '../../context/quo/quoContext';
import PurContext from '../../context/pur/purContext';

const PopoverState = (props) => {
  //State -------
  const initialState = {
    current: null,
    popover: false,
    isLoading: false,
    doubleCheck: null,
  };
  const [state, dispatch] = useReducer(popoverReducer, initialState);
  const casesContext = useContext(CasesContext);
  const quoContext = useContext(QuoContext);
  const purContext = useContext(PurContext);
  const { _id, cNo, cWays, sizes, mtrls } = casesContext;
  const { quotation } = quoContext;
  const { osList } = purContext;

  //Action -------

  const togglePopover = (e) => {
    const newPopover = !state.popover;
    dispatch({ type: TOGGLE_POPOVER, payload: newPopover });
    if (newPopover) {
      e.preventDefault();
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
        case 'case':
          subject = { caseId: _id, cNo: cNo };
          break;
        case 'quoForm':
          subject = quotation.quoForms.find(({ _id }) => _id === targetId);
          break;
        case 'deleteOs':
          subject = osList.find(({ _id }) => _id === targetId);
          break;
        default:
          subject = { key: 'no target id' };
      }
      subject.target = e.target.name;

      dispatch({ type: CURRENT_ADD, payload: subject });
    } else {
      // Here use preventDefault(), the broswer recommand to use e.persist();
      e.persist();
      dispatch({ type: CURRENT_DELETE });
    }
  };

  const defaultPopover = () => {
    dispatch({ type: CURRENT_DELETE });
  };

  const toggleLoading = () => {
    dispatch({ type: TOGGLE_LOADING });
  };

  const addDoubleCheckValue = (e) => {
    dispatch({ type: ADD_DOUBLECHECK_VALUE, payload: e.target.value });
  };

  return (
    <PopoverContext.Provider
      value={{
        current: state.current,
        popover: state.popover,
        isLoading: state.isLoading,
        doubleCheck: state.doubleCheck,
        togglePopover,
        defaultPopover,
        toggleLoading,
        addDoubleCheckValue,
      }}
    >
      {props.children}
    </PopoverContext.Provider>
  );
};

export default PopoverState;
