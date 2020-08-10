import React, { useReducer } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import PurContext from './purContext';
import PurReducer from './purReducer';

import {
  CASE_LIST_DOWNLOAD,
  SELECTEDCASES_UPDATE,
  DEFAULT,
  PURPAGE_SWITCH,
  OS_LIST_DOWNLOAD,
  OS_CURRENT,
} from '../types';

const PurState = (props) => {
  const initialState = {
    osList: [],
    caseList: [],
    selectedCases: [],
    openPage: null,
    currentOrderSummary: null,
  };
  const [state, dispatch] = useReducer(PurReducer, initialState);
  const { caseList, openPage, currentOrderSummary } = state;
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

  const switchPage = (value) => {
    if (value) {
      if (value === 'osSelector') {
        dispatch({ type: PURPAGE_SWITCH, payload: value });
        dispatch({ type: OS_CURRENT, payload: null });
      } else {
        dispatch({ type: PURPAGE_SWITCH, payload: value });
      }
    } else {
      dispatch({ type: PURPAGE_SWITCH, payload: null });
    }
  };

  const getOsList = async () => {
    const res = await axios.get('/api/purchase/ordersummary');
    console.log('download succeed!');
    dispatch({ type: OS_LIST_DOWNLOAD, payload: res.data });
  };

  const switchOsCurrent = (osItem) => {
    if (currentOrderSummary === null) {
      dispatch({ type: OS_CURRENT, payload: osItem });
    } else {
      dispatch({ type: OS_CURRENT, payload: null });
    }
  };

  return (
    <PurContext.Provider
      value={{
        osList: state.osList,
        caseList: state.caseList,
        selectedCases: state.selectedCases,
        openPage: state.openPage,
        currentOrderSummary: state.currentOrderSummary,
        getCaseList,
        searchCaseList,
        selectCase,
        createOrderSummary,
        defaultPurState,
        switchPage,
        getOsList,
        switchOsCurrent,
      }}
    >
      {props.children}
    </PurContext.Provider>
  );
};

export default PurState;
