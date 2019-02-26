import {
  GOT_QUESTION,
  QUESTION_FETCH_FAILED,
  GOT_ANSWER,
  ANSWER_FETCH_FAILED,
  IS_ANSWERED,
  WRITE_ANSWER,
  ANSWERING_FAILED,
  ANSWERED,
  REMOVE_ANSWERS,
  REMOVE_QUESTION
} from "./actionTypes";
import axios from "axios";
export function getQuestion(postId) {
  return dispatch => {
    const postUrl = "http://localhost:5000/api/question/" + postId;
    axios
      .get(postUrl)
      .then(res => {
        if (res.data.success) {
          return dispatch({
            type: GOT_QUESTION,
            payload: { question: res.data.question }
          });
        } else {
          return dispatch({
            type: QUESTION_FETCH_FAILED,
            payload: { question: {} }
          });
        }
      })
      .catch(err => {
        return dispatch({
          type: QUESTION_FETCH_FAILED,
          payload: { question: {} }
        });
      });
  };
}
// remove question
export function removeQuestion() {
  return dispatch => {
    dispatch({
      type: REMOVE_QUESTION,
      payload: { question: {}, answers: [] }
    });
  };
}

export function getAnswers(questionId) {
  return dispatch => {
    const answerUrl = "http://localhost:5000/api/answers/" + questionId;
    axios
      .get(answerUrl)
      .then(res => {
        if (res.data.success) {
          return dispatch({
            type: GOT_ANSWER,
            payload: { answers: res.data.answers }
          });
        } else {
          return dispatch({
            type: ANSWER_FETCH_FAILED,
            payload: { answers: [] }
          });
        }
      })
      .catch(err => {
        console.log(err);
        return dispatch({
          type: ANSWER_FETCH_FAILED,
          payload: { answers: [] }
        });
      });
  };
}

export function isAnswered(questionId, token) {
  return dispatch => {
    const answerUrl = "http://localhost:5000/api/isanswered/" + questionId;
    axios
      .get(answerUrl, {
        headers: {
          authorization: "bearer " + token
        }
      })
      .then(res => {
        if (res.data.success) {
          return dispatch({
            type: IS_ANSWERED,
            payload: { answered: res.data.answered }
          });
        }
      })
      .catch(err => {
        return dispatch({
          type: ANSWER_FETCH_FAILED,
          payload: { answered: false }
        });
      });
  };
}

export function writeAnswer(content) {
  return dispatch => {
    return dispatch({
      type: WRITE_ANSWER,
      payload: { writeAnswer: true, content }
    });
  };
}
// send answer
export function postAnswer(questionId, delta, token) {
  return dispatch => {
    const answerUrl = "http://localhost:5000/api/answer/" + questionId;
    axios
      .post(
        answerUrl,
        {
          answerContent: JSON.stringify(delta)
        },
        {
          headers: {
            authorization: "bearer " + token
          }
        }
      )
      .then(res => {
        if (res.data.success) {
          return dispatch({
            type: ANSWERED
          });
        } else {
          //will implement later
          return dispatch({
            type: ANSWERING_FAILED
          });
        }
      })
      .catch(err => {
        // will implement later
        return dispatch({
          type: ANSWERING_FAILED
        });
      });
  };
}
// delete answer
export function deleteAnswer(questionId, token) {
  return dispatch => {
    const answerUrl = "http://localhost:5000/api/answer/" + questionId;
    axios
      .delete(answerUrl, {
        headers: {
          authorization: "bearer " + token
        }
      })
      .then(res => {
        if (res.data.success) {
          return dispatch({
            type: ANSWERED,
            payload: {
              showNotification: true,
              modalMessage: res.data.message
            }
          });
        } else {
          //will implement later
          return dispatch({
            type: ANSWERING_FAILED,
            payload: {
              showNotification: true,
              modalMessage: res.data.message
            }
          });
        }
      })
      .catch(err => {
        // console.log(err);
      });
  };
}
