import {
  CASE_LIST_DOWNLOAD,
  SELECTEDCASES_UPDATE,
  DEFAULT,
  PURPAGE_SWITCH,
  OS_LIST_DOWNLOAD,
  OS_CURRENT,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case CASE_LIST_DOWNLOAD:
      return {
        ...state,
        caseList: action.payload,
      };
    case SELECTEDCASES_UPDATE:
      return {
        ...state,
        selectedCases: action.payload,
      };
    case DEFAULT:
      return {
        poList: [],
        caseList: [],
        selectedCases: [],
        openPage: null,
        currentOrderSummary: null,
      };
    case PURPAGE_SWITCH:
      return {
        ...state,
        openPage: action.payload,
      };
    case OS_LIST_DOWNLOAD:
      return {
        ...state,
        osList: action.payload,
      };
    case OS_CURRENT:
      return {
        ...state,
        currentOrderSummary: action.payload,
      };
    default:
  }
};
