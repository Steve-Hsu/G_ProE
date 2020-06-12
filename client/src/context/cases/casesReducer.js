import {
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
  CASE_TOGGLE_POPOVER,
  CURRENT_ADD,
  CURRENT_DELETE,
} from '../types';

export default (state, action) => {
  switch (action.type) {
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
    case CASE_TOGGLE_POPOVER:
      return {
        ...state,
        popover: action.payload,
      };
    case CURRENT_ADD:
      return {
        ...state,
        current: action.payload,
      };
    case CURRENT_DELETE:
      return {
        ...state,
        current: null,
      };
  }
};
