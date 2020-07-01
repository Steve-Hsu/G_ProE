import { SRMTRL_DOWNLOAD, TOGGLE_ISUPDATE } from '../types';

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
    default:
  }
};
