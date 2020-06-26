import { SRMTRL_DOWNLOAD } from '../types';

export default (state, action) => {
  switch (action.type) {
    case SRMTRL_DOWNLOAD:
      return {
        ...state,
        srMtrls: action.payload,
      };
    default:
  }
};
