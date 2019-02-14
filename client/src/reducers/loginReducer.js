import {
  LOGGED_IN,
  AUTH_SESSION,
  LOG_IN_FAILED,
  SIGN_UP,
  GET_EMAIL_FROM_STORAGE,
  LOG_OUT,
  LOGGED_OUT
} from "../actions/actionTypes";
export function logIn(initialState = { loggedIn: false }, action) {
  switch (action.type) {
    case LOGGED_IN:
      return Object.assign({}, initialState, action.payload);
    case AUTH_SESSION:
      return Object.assign({}, initialState, action.payload);
    case LOG_IN_FAILED:
      return Object.assign({}, initialState, action.payload);
    case SIGN_UP:
      return Object.assign({}, initialState, action.payload);
    case GET_EMAIL_FROM_STORAGE:
      return Object.assign({}, initialState, action.payload);
    case LOG_OUT:
      return Object.assign({}, initialState, action.payload);
    case LOGGED_OUT:
      return Object.assign({}, initialState, action.payload);
    default:
      return initialState;
  }
}
