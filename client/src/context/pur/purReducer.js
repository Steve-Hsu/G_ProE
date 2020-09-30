import {
  // CASE_LIST_DOWNLOAD,
  SELECTEDCASES_UPDATE,
  DEFAULT,
  PURPAGE_SWITCH,
  OS_LIST_DOWNLOAD,
  OS_CURRENT,
  PO_CURRENT,
  PO_CURRENT_MTRLPRICE,
  OS_DELETE,
  UPDATE_SUPPLIERS,
  UPDATE_MOQPOQTY,
  // UPDATE_CASEMTRL,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    // case CASE_LIST_DOWNLOAD:
    //   return {
    //     ...state,
    //     caseList: action.payload,
    //   };
    case SELECTEDCASES_UPDATE:
      return {
        ...state,
        selectedCases: action.payload,
      };
    case DEFAULT:
      return {
        osList: [],
        caseList: [],
        selectedCases: [],
        openPage: null,
        currentOrderSummary: null,
        currentPo: null,
        currentPoPriceList: [],
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
    case PO_CURRENT:
      return {
        ...state,
        currentPo: action.payload,
      };
    case PO_CURRENT_MTRLPRICE:
      return {
        ...state,
        currentPoPriceList: action.payload,
      };
    case OS_DELETE:
      return {
        ...state,
        osList: state.osList.filter((os) => {
          return os._id !== action.payload;
        }),
      };
    case UPDATE_SUPPLIERS:
      return {
        ...state,
        currentOrderSummary: {
          ...state.currentOrderSummary,
          suppliers: action.payload,
        },
        // currentPo: action.payload.find(
        //   ({ _id }) => _id === state.currentPo._id
        // ),
      };
    case UPDATE_MOQPOQTY:
      return {
        ...state,
        currentOrderSummary: {
          ...state.currentOrderSummary,
          caseMtrls: state.currentOrderSummary.caseMtrls.map((i) => {
            if (i.id === action.payload.id) {
              i.purchaseMoqQty = action.payload.newPurchasedMoqQty;
            }
            return i;
          }),
        },
      };
    // case UPDATE_CASEMTRL:
    //   return {
    //     ...state,
    //     currentOrderSummary: {
    //       ...state.currentOrderSummary,
    //       caseMtrls: action.payload,
    //     },
    //   };
    default:
  }
};
