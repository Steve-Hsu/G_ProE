import React, { useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ComContext from './comContext';
import comReducer from './comReducer';
import { ADD_COMPANY } from '../types';

const ComState = (props) => {
  const initialState = {
    companies: [
      {
        id: 1,
        comName: 'Soluna',
        email: 'steve@soluna.com',
        password: 'soluna123',
        userNumLimit: 5,
        userNum: 0,
        type: 'paid',
      },
      {
        id: 2,
        comName: 'Infinity',
        email: 'steve@infinity.com',
        password: 'infinity123',
        userNumLimit: 5,
        userNum: 1,
        type: 'unpaid',
      },
    ],
  };

  const [state, dispatch] = useReducer(comReducer, initialState);

  // Add company
  const addCompany = (company) => {
    company.id = uuidv4();
    dispatch({ type: ADD_COMPANY, payload: company });
  };

  return (
    <ComContext.Provider
      value={{
        companies: state.companies,
        addCompany,
      }}
    >
      {props.children}
    </ComContext.Provider>
  );
};

export default ComState;
