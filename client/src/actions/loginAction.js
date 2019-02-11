import { LOGGED_IN, LOG_IN_FAILED } from "./actionTypes";
import axios from "axios";
export function loginActionCreator(email, password) {
  return dispatch => {
    const loginUrl = "http://localhost:5000/api/login";
    axios
      .post(loginUrl, { email, password }, { withCredentials: true })
      .then(res => {
        if (res.data.success) {

          return dispatch({
            type: LOGGED_IN,
            payload: { loggedIn: true, email }
          });
        } else {
          console.log("not fetching");
        }
      })
      .catch(err => {
        return dispatch({
          type: LOG_IN_FAILED,
          payload: { loggedIn: false, error: err }
        });
      });
  };
}
