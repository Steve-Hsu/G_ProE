import {
  SEARCHBAR_SEARCH_INDEX,
  SEARCHBAR_TOGGLE_QUERY,
  SEARCHBAR_CLEAR_LIST,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case SEARCHBAR_SEARCH_INDEX:
      return {
        ...state,
        isQuery: true,
        searchCaseNameList: action.payload,
      };
    case SEARCHBAR_TOGGLE_QUERY:
      return {
        ...state,
        isQuery: false,
      };
    case SEARCHBAR_CLEAR_LIST:
      return {
        ...state,
        searchCaseNameList: [],
      };
    default:
  }
};
