import {
  GOT_QUESTION,
  QUESTION_FETCH_FAILED,
  GOT_ANSWER,
  ANSWER_FETCH_FAILED,
  IS_ANSWERED,
  WRITE_ANSWER,
  ANSWERED,
  REMOVE_ANSWERS,
  REMOVE_QUESTION
} from "../actions/actionTypes";
export function postReducer(
  initialState = {
    question: {},
    answers: [],
    answered: false,
    writeAnswer: false,
    content: { ops: [] },
    showNotification: false,
    modalMessage: ""
  },
  action
) {
  switch (action.type) {
    case GOT_QUESTION:
      return Object.assign({}, initialState, action.payload);
    case QUESTION_FETCH_FAILED:
      return Object.assign({}, initialState, action.payload);
    case REMOVE_QUESTION:
      return Object.assign({}, action.payload);
    case GOT_ANSWER:
      return Object.assign({}, initialState, action.payload);
    case IS_ANSWERED:
      return Object.assign({}, initialState, action.payload);
    case WRITE_ANSWER:
      return Object.assign({}, initialState, action.payload);
    case ANSWER_FETCH_FAILED:
      return Object.assign({}, initialState, action.payload);
    case REMOVE_ANSWERS:
      return Object.assign({}, initialState, action.payload);
    case ANSWERED:
      return Object.assign(
        {},
        initialState,
        action.payload
      );
    default:
      return initialState;
  }
}
