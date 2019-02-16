import {
  LOGGED_IN,
  LOG_IN_FAILED,
  SIGN_UP_FAILED,
  SIGN_UP,
  LOG_OUT,
  GET_EMAIL_FROM_STORAGE,
  LOGGED_OUT
} from "./actionTypes";
import axios from "axios";
export function loginActionCreator(email, password, history) {
  return dispatch => {
    const loginUrl = "http://localhost:5000/api/login";
    axios
      .post(loginUrl, { email, password }, { withCredentials: true })
      .then(res => {
        if (res.data.success) {
          history.push("/");
          // setlocalstore
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("userEmail", email);
          console.log(res.data.token);
          return dispatch({
            type: LOGGED_IN,
            payload: { loggedIn: true, email, token: res.data.token }
          });
        } else {
          return dispatch({
            type: LOG_IN_FAILED,
            payload: { loggedIn: false }
          });
        }
      })
      .catch(err => {
        return dispatch({
          type: LOG_IN_FAILED,
          payload: { loggedIn: false, error: err.response.data.error }
        });
      });
  };
}

/*
 * logout session action
 */
export function logoutAction(history) {
  return dispatch => {
    const logoutUrl = "http://localhost:5000/api/logout";
    const bearer = localStorage.getItem("token");
    axios
      .get(logoutUrl, {
        headers: {
          authorization: "bearer " + bearer
        }
      })
      .then(res => {
        if (res.data.success) {
          history.push("/");
          // remove email address from local storage
          localStorage.removeItem("userEmail");
          // remove token from localstorage
          localStorage.removeItem("token");
          //dispatch the event handler
          return dispatch({
            type: LOG_OUT,
            payload: { loggedIn: false }
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
}

export function signUpAction(email, password, history) {
  return dispatch => {
    const loginUrl = "http://localhost:5000/api/signup";
    axios
      .post(loginUrl, { email, password }, { withCredentials: true })
      .then(res => {
        if (res.data.success) {
          history.push("/");
          localStorage.setItem("token", res.data.token);
          // setlocalstore
          localStorage.setItem("userEmail", email);
          return dispatch({
            type: SIGN_UP,
            payload: { loggedIn: true, email, token: res.data.token }
          });
        } else {
          return dispatch({
            type: SIGN_UP_FAILED,
            payload: { loggedIn: false }
          });
        }
      })
      .catch(err => {
        return dispatch({
          type: SIGN_UP_FAILED,
          payload: { loggedIn: false }
        });
      });
  };
}

export function authSessAction() {
  return dispatch => {
    // authenticating the user session
    const authUrl = "http://localhost:5000/api/authed";
    const bearer = localStorage.getItem("token");
    axios
      .get(authUrl, {
        withCredentials: true,
        headers: {
          authorization: "bearer " + bearer
        }
      })
      .then(res => {
        if (res.data.success) {
          return dispatch({
            type: LOGGED_IN,
            payload: { loggedIn: true }
          });
        } else {
          return dispatch({
            type: LOGGED_IN,
            payload: { loggedIn: false }
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
}

export function getEmail() {
  return dispatch => {
    // getting the email address from localstorage
    const email = localStorage.getItem("userEmail");
    return dispatch({
      type: GET_EMAIL_FROM_STORAGE,
      payload: { email }
    });
  };
}
