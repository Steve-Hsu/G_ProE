import React, { useReducer } from 'react';
import axios from 'axios';
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
  COM_CLEAR_ERRORS,
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
  const laodCom = () => console.log('loader company');

  // Register Company
  const registerCom = async (formData) => {
    // Use axios sent out a POST, must use "config" warpping the headers
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.post('/registercom', formData, config);
      dispatch({
        type: COM_REGISTER_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: COM_REGISTER_FAIL,
        payload: err.response.data.msg,
      });
      console.log('you fucked up');
    }
  };

  // Login Company

  // Logout Company

  // Clear Error
  const clearErrors = () => dispatch({ type: COM_CLEAR_ERRORS });

  //Return -------
  return (
    <AuthComContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        company: state.company,
        error: state.error,
        laodCom,
        registerCom,
        clearErrors,
      }}
    >
      {props.children}
    </AuthComContext.Provider>
  );
};
export default AuthComState;
