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
  CLEAR_USERS_STATE,
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
        users: [action.payload, ...state.users],
        loading: false,
      };
    case UPDATE_USER:
      return {
        ...state,
        users: state.users.map((user) =>
          //If the id of the USER passed in match to any id in the UserState.users, then set the values of this USER passed in to the id matched USER in ComState.users
          user._id === action.payload ? action.payload : user
        ),
        loading: false,
      };
    case DELETE_USER:
      return {
        ...state,
        // Set ComState.users equals to USER that with different Id in payload
        users: state.users.filter((user) => user._id !== action.payload),
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      };
    case CLEAR_USERS_STATE:
      return {
        ...state,
        users: null,
        filtered: null,
        error: null,
        current: null,
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
