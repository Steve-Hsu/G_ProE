import React, { useReducer } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import PurContext from './purContext';
import PurReducer from './purReducer';

import { CASE_LIST_DOWNLOAD, SELECTEDCASES_UPDATE, DEFAULT } from '../types';

const PurState = (props) => {
  const initialState = {
    poList: [],
    caseList: [],
    selectedCases: [],
  };
  const [state, dispatch] = useReducer(PurReducer, initialState);
  const { poList, caseList } = state;
  //@_action
  const getCaseList = async () => {
    const res = await axios.get('/api/purchase');
    console.log('download succeed!');
    dispatch({ type: CASE_LIST_DOWNLOAD, payload: res.data });
  };

  //@ Use searchbar to find the cases
  const searchCaseList = async (body) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.post('/api/purchase/query', body, config);
      console.log('Seach result returned');
      dispatch({ type: CASE_LIST_DOWNLOAD, payload: res.data });
    } catch (err) {
      console.log(err.msg, 'Query failed');
    }
  };

  const selectCase = (caseId, selectAll = false) => {
    if (selectAll) {
      if (state.selectedCases.length === caseList.length) {
        state.selectedCases = [];
      } else {
        state.selectedCases = [];
        caseList.map((i) => {
          state.selectedCases.push(i._id);
        });
      }
    } else {
      const haveSeletedTheCase = state.selectedCases.includes(caseId);
      if (haveSeletedTheCase) {
        state.selectedCases.splice(state.selectedCases.indexOf(caseId), 1);
      } else {
        state.selectedCases.push(caseId);
      }
    }
    dispatch({ type: SELECTEDCASES_UPDATE, payload: state.selectedCases });
  };

  const createOrderSummary = async (selectedCases) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.post('/api/purchase', selectedCases, config);
      console.log('Upload Order Summary');
      // dispatch({ type: CASE_LIST_DOWNLOAD, payload: res.data });
    } catch (err) {
      console.log(err.msg, 'Order Summary failed');
    }
  };

  const defaultPurState = () => {
    dispatch({ type: DEFAULT });
  };

  return (
    <PurContext.Provider
      value={{
        poList: state.poList,
        caseList: state.caseList,
        selectedCases: state.selectedCases,
        getCaseList,
        searchCaseList,
        selectCase,
        createOrderSummary,
        defaultPurState,
      }}
    >
      {props.children}
    </PurContext.Provider>
  );
};

export default PurState;
