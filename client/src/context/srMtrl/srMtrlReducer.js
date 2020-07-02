import { SRMTRL_DOWNLOAD, TOGGLE_ISUPDATE, SRMTRL_UPDATE } from '../types';

export default (state, action) => {
  switch (action.type) {
    case SRMTRL_DOWNLOAD:
      return {
        ...state,
        srMtrls: action.payload,
      };
    case TOGGLE_ISUPDATE:
      return {
        ...state,
        isUpdated: action.payload,
      };
    case SRMTRL_UPDATE:
      return {
        ...state,
        srMtrls: action.payload,
      };
    default:
  }
};
