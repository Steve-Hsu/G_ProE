import {
  // CASE_LIST_DOWNLOAD,
  QUOFORM_SWITCH,
  QUOFORM_SELECTOR_SWITCH,
  QUOFORM_DOWNLOAD,
  QUOTATION_DOWNLOAD,
  QUOPAGE_SWITCH,
  QUOFORM_DELETE,
  QUOFORM_UPDATE,
  CURRETQUOFORM_UPDATE,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    // case CASE_LIST_DOWNLOAD:
    //   return { ...state, caseList: action.payload };
    case QUOFORM_SELECTOR_SWITCH:
      return { ...state, isQuotating: action.payload };
    case QUOFORM_SWITCH:
      return {
        ...state,
        openQuoForm: action.payload,
        currentQuoForm: state.quotation.quoForms.find(({ _id }) => {
          return _id === action.payload;
        }),
      };
    case QUOFORM_DOWNLOAD:
      return {
        ...state,
        quotation: {
          ...state.quotation,
          versionNum: action.payload.versionNum,
          quoForms: action.payload.quoForms,
        },
      };
    case QUOTATION_DOWNLOAD:
      return { ...state, quotation: action.payload };
    case QUOPAGE_SWITCH:
      return { ...state, quotateFor: action.payload };
    case QUOFORM_DELETE:
      return {
        ...state,
        quotation: {
          ...state.quotation,
          quoForms: state.quotation.quoForms.filter((quoForm) => {
            return quoForm._id !== action.payload;
          }),
        },
      };
    case QUOFORM_UPDATE:
      return {
        ...state,
        quotation: {
          ...state.quotation,
          quoForms: action.payload,
        },
      };
    case CURRETQUOFORM_UPDATE:
      return {
        ...state,
        currentQuoForm: action.payload,
      };
    default:
  }
};
