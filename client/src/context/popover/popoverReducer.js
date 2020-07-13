import { TOGGLE_POPOVER, CURRENT_ADD, CURRENT_DELETE } from '../types';

export default (state, action) => {
  switch (action.type) {
    case TOGGLE_POPOVER:
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
    default:
  }
};
