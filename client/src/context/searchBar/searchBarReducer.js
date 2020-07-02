import {
  SEARCHBAR_TOGGLE_QUERY,
  SEARCHBAR_CLEAR_LIST,
  SEARCHBAR_SEARCH_INDEX,
  SEARCHBAR_SEARCH_SRMTRL,
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
