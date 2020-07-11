import {
  CASE_LIST_DOWNLOAD,
  QUOFORM_SWITCH,
  QUOFORM_DOWNLOAD,
  QUOPAGE_SWITCH,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case CASE_LIST_DOWNLOAD:
      return { ...state, caseList: action.payload };
    case QUOFORM_SWITCH:
      return { ...state, isQuotating: action.payload };
    case QUOFORM_DOWNLOAD:
      return { ...state, quoForm: action.payload };
    case QUOPAGE_SWITCH:
      return { ...state, quotateFor: action.payload };
    default:
  }
};
