import {
  COM_REGISTER_SUCCESS,
  COM_REGISTER_FAIL,
  COM_LOADED,
  COM_AUTH_ERROR,
  COM_LOGIN_SUCCESS,
  COM_LOGIN_FAIL,
  COM_LOGOUT,
  COM_CLEAR_ERRORS,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case COM_REGISTER_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case COM_REGISTER_FAIL:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        company: null,
        error: action.payload,
      };
    case COM_CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
