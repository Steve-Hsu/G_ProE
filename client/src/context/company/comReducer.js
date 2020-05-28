import { ADD_COMPANY } from '../types';

export default (state, action) => {
  switch (action.type) {
    case ADD_COMPANY:
      return {
        ...state,
        companies: [...state.companies, action.payload],
      };
    default:
      return state;
  }
};
