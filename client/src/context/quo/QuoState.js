import React, { useReducer } from 'react';
import axios from 'axios';
import QuoContext from './quoContext';
import QuoReducer from './quoReducer';

import {
  CASE_LIST_DOWNLOAD,
  QUOFORM_SWITCH,
  QUOFORM_DOWNLOAD,
  QUOPAGE_SWITCH,
  QUOFORM_DELETE,
} from '../types';

const QuoState = (props) => {
  const initialState = {
    caseList: [],
    quotateFor: null,
    isQuotating: null,
    quotateVersion: null,
    quotation: { quoForms: [] },
    popover: false,
    current: null,
  };
  const [state, dispatch] = useReducer(QuoReducer, initialState);
  const { quotateFor, isQuotating } = state;
  //@_action
  const getCaseList = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const res = await axios.get('/api/quogarment', config);
    console.log('Upload succeed!');
    dispatch({ type: CASE_LIST_DOWNLOAD, payload: res.data });
  };

  const switchPage = (value) => {
    if (quotateFor === null) {
      dispatch({ type: QUOPAGE_SWITCH, payload: value });
    } else {
      dispatch({ type: QUOPAGE_SWITCH, payload: null });
    }
  };

  const switchQuoFormSelector = (cNo) => {
    if (isQuotating === null) {
      dispatch({ type: QUOFORM_SWITCH, payload: cNo });
      return cNo;
    } else {
      dispatch({ type: QUOFORM_SWITCH, payload: null });
      return null;
    }
  };

  const switchQuoForm = (cNo) => {
    if (isQuotating === null) {
      dispatch({ type: QUOFORM_SWITCH, payload: cNo });
      return cNo;
    } else {
      dispatch({ type: QUOFORM_SWITCH, payload: null });
      return null;
    }
  };

  const uploadQuoForm = async (check, input, form) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    let body = { isNewQuoForm: true };
    if (input === false) {
      body = {
        isNewQuoForm: false,
        form: form,
      };
    }

    const res = await axios.put(
      `/api/quogarment/quoform/${check}/updatequoForm`,
      body,
      config
    );
    dispatch({ type: QUOFORM_DOWNLOAD, payload: res.data });
  };

  const downLoadQuoForm = async (check) => {
    if (check !== null) {
      // const config = {
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      // };
      const res = await axios.get(`/api/quogarment/quoform/${check}`);
      dispatch({ type: QUOFORM_DOWNLOAD, payload: res.data });
    } else {
      dispatch({ type: QUOFORM_DOWNLOAD, payload: { quoForms: [] } });
    }
  };

  const deleteQuoForm = async (body) => {
    const quoNo = body.quoNo;
    const quoFormId = body.quoFormId;

    try {
      //This could be a severe problem
      //Here the path seem a little strange, I still can't figure it out, only can use the path now to temparalily solve the problem
      await axios.delete(`quogarment/delete/quoform/${quoNo}/${quoFormId}`);
      dispatch({ type: QUOFORM_DELETE, payload: quoFormId });
    } catch (err) {
      console.log('Delete quoForm have problem', err);
    }
  };

  return (
    <QuoContext.Provider
      value={{
        caseList: state.caseList,
        quotateFor: state.quotateFor,
        isQuotating: state.isQuotating,
        quotation: state.quotation,
        popover: state.popover,
        current: state.current,
        getCaseList,
        switchPage,
        switchQuoFormSelector,
        switchQuoForm,
        uploadQuoForm,
        downLoadQuoForm,
        deleteQuoForm,
      }}
    >
      {props.children}
    </QuoContext.Provider>
  );
};

export default QuoState;
