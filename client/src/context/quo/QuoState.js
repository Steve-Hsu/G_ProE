import React, { useReducer } from 'react';
import axios from 'axios';
import quoContext from './quoContext';
import quoReducer from './quoReducer';

import { TEST_TYPE } from '../types';

const quoState = (props) => {
  const initialState = {
    casesList: [],
    isQuotating: false,
    quoForm: null,
  };

  const [state, dispatch] = useReducer(quoReducer, initialState);
  const { casesList } = state;

  //@_action
  const getCaseList = () => {};
  const action = () => {
    dispatch({ type: TEST_TYPE, payload: 'What ever' });
  };

  return (
    <quoContext.Provider
      value={{
        casesList: state.casesList,
        isQuotating: state.isQuotating,
        quoForm: state.quoForm,
        action,
      }}
    >
      {props.children}
    </quoContext.Provider>
  );
};

export default quoState;
