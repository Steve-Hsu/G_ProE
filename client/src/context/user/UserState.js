import React, { useReducer } from 'react';
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
} from '../types';

const UserState = (props) => {
  const initialState = {
    users: [
      {
        id: 1,
        name: 'Soluna',
        email: 'steve@soluna.com',
      },
      {
        id: 2,
        name: 'Infinity',
        email: 'steve@infinity.com',
      },
    ],
    current: null,
    filtered: null,
  };

  const [state, dispatch] = useReducer(userReducer, initialState);

  // Add USER
  const addUser = (user) => {
    user.id = uuidv4();
    dispatch({ type: ADD_USER, payload: user });
  };

  //Delete USER
  const deleteUser = (id) => {
    dispatch({ type: DELETE_USER, payload: id });
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
        addUser,
        deleteUser,
        setCurrent,
        clearCurrent,
        updateUser,
        filterUser,
        clearFilterUser,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
