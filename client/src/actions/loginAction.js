import {
  LOGGED_IN,
  LOG_IN_FAILED,
  SIGN_UP_FAILED,
  SIGN_UP,
  LOG_OUT,
  GET_EMAIL_FROM_STORAGE,
  USER_DATA,
  GET_TOKEN
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
          localStorage.setItem(
            "userData",
            JSON.stringify({
              email,
              token: res.data.token,
              userId: res.data.userId
            })
          );
          return dispatch({
            type: LOGGED_IN,
            payload: {
              loggedIn: true,
              email,
              token: res.data.token,
              userId: res.data.userId
            }
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
          localStorage.removeItem("userData");
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
          localStorage.setItem(
            "userData",
            JSON.stringify({
              email,
              token: res.data.token,
              userId: res.data.userId
            })
          );
          return dispatch({
            type: SIGN_UP,
            payload: {
              loggedIn: true,
              email,
              token: res.data.token,
              userId: res.data.userId
            }
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
    const data = localStorage.getItem("token")
      ? JSON.parse(localStorage.getItem("userData"))
      : null;
    let bearer;
    if (data) {
      bearer = data.token;
    } else {
      return dispatch({
        type: LOGGED_IN,
        payload: { loggedIn: false }
      });
    }
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
            payload: { loggedIn: true, userId: res.data.userId }
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

export function getUserData() {
  return dispatch => {
    const data = JSON.parse(localStorage.getItem("userData"));
    if (data) {
      return dispatch({ type: USER_DATA, payload: data });
    }
  };
}
