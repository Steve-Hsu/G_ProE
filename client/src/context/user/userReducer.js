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
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false,
      };
    case ADD_USER:
      return {
        ...state,
        // ...State.users are users existing alread, the action.payload is the new USER just set
        users: [...state.users, action.payload],
        loading: false,
      };
    case UPDATE_USER:
      return {
        ...state,
        users: state.users.map((USER) =>
          //If the id of the USER passed in match to any id in the ComState.users, then set the values of this USER passed in to the id matched USER in ComState.users
          USER.id === action.payload.id ? action.payload : USER
        ),
      };
    case DELETE_USER:
      return {
        ...state,
        // Set ComState.users equals to USER that with different Id in payload
        users: state.users.filter((USER) => USER.id !== action.payload),
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      };
    case FILTER_USER:
      return {
        ...state,
        filtered: state.users.filter((USER) => {
          const regex = new RegExp(`${action.payload}`, 'gi');
          return USER.name.match(regex) || USER.email.match(regex);
        }),
      };
    case CLEAR_FILTER_USER:
      return {
        ...state,
        filtered: null,
      };
    case USER_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
