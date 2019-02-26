import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk";
import { logIn } from "./reducers/loginReducer";
import { postReducer } from "./reducers/postReducer";
const rootReducer = combineReducers({
  user: logIn,
  post: postReducer
});
const store = createStore(
  rootReducer,
  {},
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
export default store;
