import React, { useReducer } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import UserContext from './userContext';
import userReducer from './userReducer';
import {
  ADD_USER,
  DELETE_USER,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_USER,
  FILTER_USER,
  CLEAR_FILTER_USER,
  USER_ERROR,
  GET_USERS,
  CLEAR_USER_FORM,
  CLEAR_USERS_STATE,
} from '../types';

const UserState = (props) => {
  const initialState = {
    users: null,
    current: null,
    filtered: null,
    error: null,
  };

  const [state, dispatch] = useReducer(userReducer, initialState);
  // Get User
  const getUsers = async () => {
    try {
      const res = await axios.get('/api/users');
      dispatch({ type: GET_USERS, payload: res.data });
    } catch (err) {
      dispatch({
        type: USER_ERROR,
        payload: err.response.msg,
      });
    }
  };
  // Add User
  const addUser = async (user) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.post('/api/users', user, config);
      dispatch({ type: ADD_USER, payload: res.data });
    } catch (err) {
      dispatch({
        type: USER_ERROR,
        // payload: err.response.msg,
        payload: 'add user err',
      });
    }
  };

  //Delete USER
  const deleteUser = (id) => {
    dispatch({ type: DELETE_USER, payload: id });
  };

  //Clear Users in UserState
  //When the company logout, we need clear the state in the client end for security
  const clearUsers = () => {
    dispatch({ type: CLEAR_USERS_STATE });
  };

  //Set Current USER
  const setCurrent = (user) => {
    dispatch({ type: SET_CURRENT, payload: user });
  };

  //Clear Current USER
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  //Update USER
  const updateUser = (user) => {
    dispatch({ type: UPDATE_USER, payload: user });
  };

  //Filter USER
  const filterUser = (text) => {
    dispatch({ type: FILTER_USER, payload: text });
  };

  //Clear Filter
  const clearFilterUser = () => {
    dispatch({ type: CLEAR_FILTER_USER });
  };

  return (
    <UserContext.Provider
      value={{
        users: state.users,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        addUser,
        deleteUser,
        setCurrent,
        clearCurrent,
        updateUser,
        filterUser,
        clearFilterUser,
        getUsers,
        clearUsers,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
