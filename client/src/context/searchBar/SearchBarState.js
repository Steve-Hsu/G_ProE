import React, { useReducer } from 'react';
import axios from 'axios';
import SearchBarContext from './searchBarContext';
import SearchBarReducer from './searchBarReducer';
import {
  SEARCHBAR_TOGGLE_QUERY,
  SEARCHBAR_CLEAR_LIST,
  SEARCHBAR_SEARCH_INDEX,
  SEARCHBAR_SEARCH_SRMTRL,
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

  const searchSrMtrl = async (body) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.post('/api/mprice/query', body, config);
      console.log('Seach result returned');
      dispatch({ type: SEARCHBAR_SEARCH_SRMTRL, payload: res.data });
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
        searchSrMtrl,
        toggleQueryList,
        clearSearchList,
      }}
    >
      {props.children}{' '}
    </SearchBarContext.Provider>
  );
};

export default SearchBarState;
