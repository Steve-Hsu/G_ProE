import { CASE_LIST_DOWNLOAD, SELECTEDCASES_UPDATE, DEFAULT } from '../types';

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
      };
    default:
  }
};
