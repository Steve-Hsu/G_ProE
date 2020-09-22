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
  PO_CURRENT,
  PO_CURRENT_MTRLPRICE,
  OS_DELETE,
  UPDATE_SUPPLIERS,
  UPDATE_CASEMTRL,
} from '../types';

const PurState = (props) => {
  const initialState = {
    osList: [],
    selectedCases: [],
    openPage: null,
    currentOrderSummary: null,
    currentPo: null,
    currentPoPriceList: [],
  };
  const [state, dispatch] = useReducer(PurReducer, initialState);
  const { caseList, openPage, currentOrderSummary } = state;
  //@ Id for prevent uuid duplicated
  const generateId = () => {
    return (
      //generate 22 digits string with number or character.
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  };

  //@_action

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
    console.log('createOrderSummary is triggered'); // test Code
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      // const res = await axios.post('/api/purchase', selectedCases, config);
      await axios.post('/api/purchase', selectedCases, config).then(() => {
        switchPage('osSelector');
      });
      console.log('Upload Order Summary');
      // dispatch({ type: CASE_LIST_DOWNLOAD, payload: res.data });
    } catch (err) {
      console.log(err, 'Order Summary failed');
    }
  };

  const defaultPurState = () => {
    dispatch({ type: DEFAULT });
  };

  const switchPage = (value, value2 = null) => {
    switch (value) {
      case 'caseSelector':
        dispatch({ type: PURPAGE_SWITCH, payload: value });
        break;
      case 'osSelector':
        console.log('osSelector in state is triggered');
        dispatch({ type: PURPAGE_SWITCH, payload: value });
        dispatch({ type: OS_CURRENT, payload: null });
        break;
      case 'orderSummary':
        // const subject = value2
        dispatch({ type: PURPAGE_SWITCH, payload: value });
        dispatch({ type: PO_CURRENT, payload: null });
        dispatch({ type: PO_CURRENT_MTRLPRICE, payload: [] });
        break;
      case 'purchaseOrder':
        const subject = value2;
        dispatch({ type: PURPAGE_SWITCH, payload: value });
        dispatch({ type: PO_CURRENT, payload: subject });
        break;
      // case null:
      // case '':
      //   dispatch({ type: PURPAGE_SWITCH, payload: null });
      //   break;
      default:
        console.log('no value is triggered ');
      // dispatch({ type: PURPAGE_SWITCH, payload: value });
      // dispatch({ type: PO_CURRENT, payload: id });
      // break;
    }

    // if (value) {
    //   if (value === 'osSelector') {
    //     dispatch({ type: PURPAGE_SWITCH, payload: value });
    //     dispatch({ type: OS_CURRENT, payload: null });
    //   } else {
    //     dispatch({ type: PURPAGE_SWITCH, payload: value });
    //   }
    // } else {
    //   dispatch({ type: PURPAGE_SWITCH, payload: null });
    // }
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

  const getMaterialPrice = async (currentPo, caseMtrls) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = {
      currentPo: currentPo,
      caseMtrls: caseMtrls,
    };
    try {
      const res = await axios.post('/api/purchase/materialprice', body, config);
      console.log('Get the material prices');
      dispatch({ type: PO_CURRENT_MTRLPRICE, payload: res.data });
    } catch (err) {
      console.log(err.msg, 'Get the material prices');
    }
  };

  const deleteOs = async (osId) => {
    try {
      await axios.delete(`/api/purchase/deleteos/${osId}`);
      dispatch({ type: OS_DELETE, payload: osId });
    } catch (err) {
      console.log(err);
    }
  };

  const updatePOInform = (e) => {
    const nameOfTarget = e.target.name;
    const idOfTarget = e.target.id;
    const value = e.target.value;
    const idOfItem = String(e.target.id).slice(
      nameOfTarget.length,
      idOfTarget.length
    );

    let subject = state.currentPo;
    switch (nameOfTarget) {
      case 'addCondition':
        subject.conditions.push({
          id: uuidv4() + generateId(),
          condition: null,
          conditionDescription: null,
        });
        break;
      case 'condition':
      case 'conditionDescription':
        subject.conditions.map((c) => {
          if (c.id === idOfItem) {
            c[nameOfTarget] = value;
          }
        });
        break;
      case 'deleteCondition':
        subject.conditions = subject.conditions.filter((c) => c.id != value);
        break;
      case 'address':
      case 'attn':
      case 'email':
      case 'tel':
        subject[nameOfTarget] = value;
        break;
      default:
    }

    dispatch({ type: PO_CURRENT, payload: subject });
  };

  const uploadPO = async (osId, currentPo, priceList = null) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const checkConfirmDate = currentPo.poConfirmDate;
    const currentPoId = currentPo._id;
    console.log('the currentPo id', currentPoId);
    if (checkConfirmDate) {
      priceList = state.currentPoPriceList;
    }

    const body = { supplier: currentPo, priceList: priceList };
    try {
      const res = await axios.post(
        `/api/purchase/purchaseorder/${osId}`,
        body,
        config
      );
      console.log('Upload condition succeed');

      const theSuppliers = res.data.updatedSuppliers;
      // console.log(theSuppliers);
      const subject = theSuppliers.find(({ _id }) => _id === currentPoId);
      // console.log('The subject', subject);
      dispatch({ type: UPDATE_SUPPLIERS, payload: theSuppliers });
      dispatch({ type: PO_CURRENT, payload: subject });
      const updateCaseMtrl = res.data.updateCaseMtrl;
      console.log('The updateCaseMtrl', updateCaseMtrl);
      if (updateCaseMtrl) {
        dispatch({
          type: UPDATE_CASEMTRL,
          payload: updateCaseMtrl,
        });
      }
    } catch (err) {
      console.log(err.msg, 'Upload conditions failed');
    }
  };

  const toggleConfirmDate = () => {
    let subject = state.currentPo;
    const checkConfirmDate = subject.poConfirmDate;
    if (checkConfirmDate) {
      subject.poConfirmDate = null;
    } else {
      var date = Date.now();
      subject.poConfirmDate = date;
    }

    dispatch({ type: PO_CURRENT, payload: subject });
  };

  return (
    <PurContext.Provider
      value={{
        osList: state.osList,
        caseList: state.caseList,
        selectedCases: state.selectedCases,
        openPage: state.openPage,
        currentOrderSummary: state.currentOrderSummary,
        currentPo: state.currentPo,
        currentPoPriceList: state.currentPoPriceList,
        searchCaseList,
        selectCase,
        createOrderSummary,
        defaultPurState,
        switchPage,
        getOsList,
        switchOsCurrent,
        getMaterialPrice,
        deleteOs,
        updatePOInform,
        uploadPO,
        toggleConfirmDate,
      }}
    >
      {props.children}
    </PurContext.Provider>
  );
};

export default PurState;
