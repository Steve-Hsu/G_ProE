import {
  SRMTRL_DOWNLOAD,
  TOGGLE_ISUPDATE,
  SRMTRL_UPDATE,
  SRMTRL_UPLOAD,
  SRMTRL_CLEAR,
  UPDATE_EDITING_LIST,
} from '../types';

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
    case SRMTRL_UPLOAD:
      return {
        ...state,
        srMtrls: action.payload,
        isUpdated: true,
      };
    case SRMTRL_CLEAR:
      return {
        srMtrls: [],
        isUpdated: false,
      };
    case UPDATE_EDITING_LIST:
      return {
        ...state,
        editingList: action.payload,
      };
    default:
  }
};
