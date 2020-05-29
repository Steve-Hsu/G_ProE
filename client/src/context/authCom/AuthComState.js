import React, { useReducer } from 'react';
import AuthComContext from './authComContext';
import AuthComReducer from './authComReducer';
import {
  COM_REGISTER_SUCCESS,
  COM_REGISTER_FAIL,
  USER_LOADED,
  COM_AUTH_ERROR,
  COM_LOGIN_SUCCESS,
  COM_LOGIN_FAIL,
  COM_LOGOUT,
  CLEAR_ERRORS,
} from '../types';

const AuthComState = (props) => {
  //State -------------------------------------------
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    company: null,
    error: null,
  };

  const [state, dispatch] = useReducer(AuthComReducer, initialState);
  //Action -------
  // Load Company

  // Register Company

  // Login Company

  // Logout Company

  // Clear Error

  //Return -------
  return (
    <AuthComContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        company: state.company,
        error: state.error,
      }}
    >
      {props.children}
    </AuthComContext.Provider>
  );
};
export default AuthComState;
