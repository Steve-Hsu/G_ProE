import {
  SIZE_ADD,
  SIZE_UPDATE,
  SIZE_DELETE,
  CLR_WAY_ADD,
  CLR_WAY_UPDATE,
  CLR_WAY_DELETE,
  MTRL_ADD,
  MTRL_UPDATE,
  MTRL_DELETE,
} from '../types';

export default (state, action) => {
  switch (action.type) {
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
    case MTRL_ADD:
      return {
        ...state,
        mtrls: [...mtrls, action.payload],
      };
    case MTRL_UPDATE:
      return {
        ...state,
        mtrls: action.payload,
      };
    case MTRL_DELETE:
      return {
        ...state,
        mtrls: mtrls.filter((mtrl) => mtrl.id !== action.payload),
      };
  }
};
