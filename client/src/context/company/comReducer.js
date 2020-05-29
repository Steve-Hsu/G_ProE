import { ADD_COMPANY, DELETE_COMPANY } from '../types';

export default (state, action) => {
  switch (action.type) {
    case ADD_COMPANY:
      return {
        ...state,
        // ...State.companies are companies existing alread, the action.payload is the new company just set
        companies: [...state.companies, action.payload],
      };
    case DELETE_COMPANY:
      return {
        ...state,
        // Set ComState.companies equals to company that with different Id in payload
        companies: state.companies.filter(
          (company) => company.id !== action.payload
        ),
      };
    default:
      return state;
  }
};
