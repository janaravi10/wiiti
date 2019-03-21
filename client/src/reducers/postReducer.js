import {
  GOT_QUESTION,
  QUESTION_FETCH_FAILED,
  GOT_ANSWER,
  ANSWER_FETCH_FAILED,
  IS_ANSWERED,
  WRITE_ANSWER,
  ANSWERED,
  REMOVE_ANSWERS,
  REMOVE_QUESTION,
  HIDE_NOTIFICATION,
  ADD_QUESTION
} from "../actions/actionTypes";
export function postReducer(
  initialState = {
    question: {},
    answers: [],
    answered: false,
    writeAnswer: false,
    content: { ops: [] },
    showNotification: false,
    modalMessage: "",
    needQuestionLoad: false
  },
  action
) {
  var answers, payload, answerIds;
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
    case REMOVE_ANSWERS: {
      // condition for removing the user answers  from answers
      answers = Object.assign([], initialState.answers);
      payload = Object.assign({}, action.payload);
      // removing the deleted answer
      answers = answers.filter(ans => ans.authorId !== payload.authorId);
      // deleting the user id from payload
      delete payload.authorId;
      return Object.assign({}, initialState, { answers }, payload);
    }
    case ANSWERED: {
      answers = Object.assign([], initialState.answers);
      payload = Object.assign({}, action.payload);
      // ids
      answerIds = answers.map(ans => ans.id);
      if (answerIds.indexOf(payload.answer.id) !== -1) {
        answers = answers.map(ans => {
          if (payload.answer.id === ans.id) {
            return payload.answer;
          } else {
            return ans;
          }
        });
        // getting the answer first in the list temporarily in the front end
        answers.unshift(
          ...answers.splice(answerIds.indexOf(payload.answer.id))
        );
      } else {
        answers.unshift(payload.answer);
      }

      payload = Object.assign({}, action.payload);
      return Object.assign({}, initialState, { answers }, payload);
    }
    case HIDE_NOTIFICATION:
      return Object.assign({}, initialState, action.payload);
    case ADD_QUESTION:
      return Object.assign({}, initialState, action.payload);
    default:
      return initialState;
  }
}
