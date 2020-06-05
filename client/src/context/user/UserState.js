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
  COM_GET_USERS,
  CLEAR_USERS_STATE,
  CONFIRM_DELETE_USER,
  CLEAR_CONFIRM_DELETE,
} from '../types';

const UserState = (props) => {
  const initialState = {
    users: null,
    current: null,
    filtered: null,
    error: null,
    confirmDelete: null,
  };

  const [state, dispatch] = useReducer(userReducer, initialState);
  // Get User
  const getUsers = async () => {
    try {
      const res = await axios.get('/api/users');
      dispatch({ type: COM_GET_USERS, payload: res.data });
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

  // Confirm Delete User
  // Before delete User check again with the name of the user
  const confirmDeleteUser = (name) => {
    dispatch({
      type: CONFIRM_DELETE_USER,
      payload: name,
    });
  };

  const clearConfirmDelete = () => {
    dispatch({
      type: CLEAR_CONFIRM_DELETE,
    });
  };

  //Delete USER
  const deleteUser = async (id) => {
    try {
      await axios.delete(`/api/users/${id}`);
      dispatch({
        type: DELETE_USER,
        payload: id,
      });
    } catch (err) {
      dispatch({
        type: USER_ERROR,
        payload: 'Delete User error',
      });
    }
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
  const updateUser = async (user) => {
    console.log('right before put', user);
    const config = {
      header: {
        'Content-Type:': 'application/json',
      },
    };
    try {
      const res = await axios.put(`/api/users/${user._id}`, user, config);
      console.log('right before dispatch', user);
      dispatch({
        type: UPDATE_USER,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: USER_ERROR,
        payload: 'Update user Error',
      });
    }
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
        confirmDelete: state.confirmDelete,
        addUser,
        deleteUser,
        setCurrent,
        clearCurrent,
        updateUser,
        filterUser,
        clearFilterUser,
        getUsers,
        clearUsers,
        confirmDeleteUser,
        clearConfirmDelete,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
