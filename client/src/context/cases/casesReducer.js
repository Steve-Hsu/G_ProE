import {
  CASETYPE_UPDATE,
  STYLE_UPDATE,
  CLIENT_UPDATE,
  SIZE_ADD,
  SIZE_UPDATE,
  SIZE_DELETE,
  CLR_WAY_ADD,
  CLR_WAY_UPDATE,
  CLR_WAY_DELETE,
  CSPT_ADD,
  CSPT_UPDATE,
  MTRL_ADD,
  MTRL_UPDATE,
  MTRL_DELETE,
  CASE_DOWNLOAD,
  CASE_QTY_UPDATE,
  CASE_USER_NOT_AUTHORIZED,
  TOGGLE_ISUPDATE,
  CASE_CLEAR,
  CASENO_CLEAR,
  TOGGLE_CASE,
  TOGGLE_DISPALYTITALES,
  INPUTTAG_FILE_NAME,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case CASE_DOWNLOAD:
      return {
        ...state,
        error: null,
        ...action.payload, // update all the state if the name of that is match what in payload.
      };
    case CASETYPE_UPDATE:
      return {
        ...state,
        caseType: action.payload,
      };
    case STYLE_UPDATE:
      return {
        ...state,
        style: action.payload,
      };
    case CLIENT_UPDATE:
      return {
        ...state,
        client: action.payload,
      };
    case SIZE_ADD:
      return {
        ...state,
        sizes: [...state.sizes, action.payload],
      };
    case SIZE_UPDATE:
      return {
        ...state,
        sizes: action.payload,
      };
    case SIZE_DELETE:
      return {
        ...state,
        sizes: state.sizes.filter((size) => size.id !== action.payload),
      };
    case CLR_WAY_ADD:
      return {
        ...state,
        cWays: [...state.cWays, action.payload],
      };
    case CLR_WAY_UPDATE:
      return {
        ...state,
        cWays: action.payload,
      };
    case CLR_WAY_DELETE:
      return {
        ...state,
        cWays: state.cWays.filter((cWay) => cWay.id !== action.payload),
      };
    case CASE_QTY_UPDATE:
      return {
        ...state,
        gQtys: action.payload,
      };
    case CSPT_ADD:
      return {
        ...state,
        cspts: [...state.cspts, action.payload],
      };
    case CSPT_UPDATE:
      return {
        ...state,
        cspts: action.payload,
      };
    case MTRL_ADD:
      return {
        ...state,
        mtrls: [...state.mtrls, action.payload],
      };
    case MTRL_UPDATE:
      return {
        ...state,
        mtrls: action.payload,
      };
    case MTRL_DELETE:
      return {
        ...state,
        mtrls: state.mtrls.filter((mtrl) => mtrl.id !== action.payload),
      };
    case CASE_CLEAR:
      return {
        _id: null,
        user: null,
        company: null,
        cNo: null,
        caseType: null,
        style: null,
        client: null,
        cWays: [],
        sizes: [],
        gQtys: [],
        mtrls: [],
        displayTitles: [
          {
            supplier: true,
          },
          {
            ref_no: true,
          },
          {
            position: true,
          },
          {
            descriptions: true,
          },
        ],
        formIsHalfFilledOut: true,
        error: null,
        isUpdated: null,
        isBoardMode: false,
        inputFileName: 'Select a File...',
      };
    case CASENO_CLEAR:
      return {
        ...state,
        mtrls: action.payload,
        cNo: null,
      };
    case CASE_USER_NOT_AUTHORIZED:
      return {
        _id: null,
        user: null,
        company: null,
        cNo: null,
        caseType: null,
        style: null,
        client: null,
        cWays: [],
        sizes: [],
        gQtys: [],
        mtrls: [],
        displayTitles: [
          {
            supplier: true,
          },
          {
            ref_no: true,
          },
          {
            position: true,
          },
          {
            descriptions: true,
          },
        ],
        formIsHalfFilledOut: true,
        error: action.payload,
        isUpdated: null,
        isBoardMode: false,
        inputFileName: 'Select a File...',
      };
    case TOGGLE_ISUPDATE:
      return {
        ...state,
        isUpdated: action.payload,
      };
    case TOGGLE_CASE:
      return {
        ...state,
        [action.payload]: !state[action.payload],
      };
    case TOGGLE_DISPALYTITALES:
      return {
        ...state,
        displayTitles: state.displayTitles.map((title) => {
          if (Object.keys(title)[0] == action.payload) {
            console.log(title);
            title[action.payload] = !title[action.payload];
          }
          return title;
        }),
      };
    case INPUTTAG_FILE_NAME:
      return {
        ...state,
        inputFileName: action.payload,
      };
    default:
  }
};
