import React, { useReducer } from 'react';
import axios from 'axios';
import SearchBarContext from './searchBarContext';
import SearchBarReducer from './searchBarReducer';
import {
  SEARCHBAR_SEARCH_INDEX,
  SEARCHBAR_TOGGLE_QUERY,
  SEARCHBAR_CLEAR_LIST,
} from '../types';

const SearchBarState = (props) => {
  //@ State
  const initialState = {
    isQuery: false,
    searchCaseNameList: [],
  };

  const [state, dispatch] = useReducer(SearchBarReducer, initialState);

  //@ Action
  const searchCaseName = async (body) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.post('/api/case/query', body, config);
      console.log('Search result returned!');
      dispatch({ type: SEARCHBAR_SEARCH_INDEX, payload: res.data });
    } catch (err) {
      console.log(err.msg, 'Query failed');
    }
  };

  const toggleQueryList = () => {
    dispatch({ type: SEARCHBAR_TOGGLE_QUERY });
  };

  const clearSearchList = () => {
    dispatch({ type: SEARCHBAR_CLEAR_LIST });
  };

  return (
    <SearchBarContext.Provider
      value={{
        isQuery: state.isQuery,
        searchCaseNameList: state.searchCaseNameList,
        searchCaseName,
        toggleQueryList,
        clearSearchList,
      }}
    >
      {props.children}{' '}
    </SearchBarContext.Provider>
  );
};

export default SearchBarState;