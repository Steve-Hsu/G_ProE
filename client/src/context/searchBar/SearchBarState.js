import React, { useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import SearchBarContext from './searchBarContext';
import SearchBarReducer from './searchBarReducer';
import { SEARCHBAR_SEARCH_INDEX, SEARCHBAR_TOGGLE_QUERY } from '../types';

const SearchBarState = (props) => {
  //@ State
  const initialState = {
    isQuery: false,
    searchCaseNameList: [],
  };

  const [state, dispatch] = useReducer(SearchBarReducer, initialState);

  //@ Action
  const searchCaseName = async (e) => {
    e.preventDefault();
    // Without body-parser, Here make a fake body object manually
    const body = {
      query: e.target.query.value,
    };
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
  return (
    <SearchBarContext.Provider
      value={{
        isQuery: state.isQuery,
        searchCaseNameList: state.searchCaseNameList,
        searchCaseName,
        toggleQueryList,
      }}
    >
      {props.children}{' '}
    </SearchBarContext.Provider>
  );
};

export default SearchBarState;
