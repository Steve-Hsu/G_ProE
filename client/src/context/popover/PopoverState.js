import React, { useReducer, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import PopoverContext from './popoverContext';
import popoverReducer from './popoverReducer';
import { TOGGLE_POPOVER, CURRENT_ADD, CURRENT_DELETE } from '../types';
import CasesContext from '../../context/cases/casesContext';

const PopoverState = (props) => {
  //State -------
  const initialState = {
    current: null,
    popover: false,
  };
  const [state, dispatch] = useReducer(popoverReducer, initialState);
  const casesContext = useContext(CasesContext);
  const { cWays, sizes, mtrls } = casesContext;

  //Action -------

  const togglePopover = (e) => {
    e.preventDefault();
    //The id is set in the value of the btn when which is created. so here we fetch id by e.target.value.

    const newPopover = !state.popover;
    dispatch({ type: TOGGLE_POPOVER, payload: newPopover });
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
    <PopoverContext.Provider
      value={{
        current: state.current,
        popover: state.popover,
        togglePopover,
      }}
    >
      {props.children}
    </PopoverContext.Provider>
  );
};

export default PopoverState;
