import { LOGGED_IN } from "../actions/actionTypes";
export default function(
  initialState = {
    user: {
      loggedIn: false
    }
  },
  action
) {
  switch (action.type) {
    case LOGGED_IN:
    console.log("helo");
      return Object.assign({}, initialState, action.payload);
    default:
      return initialState;
  }
}
