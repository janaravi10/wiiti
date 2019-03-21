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
  REMOVE_QUESTION,
  HIDE_NOTIFICATION,
  ADD_QUESTION
} from "./actionTypes";
import axios from "axios";
export function addQuestion(token, formData) {
  return dispatch => {
    // sending the form data to the server;
    axios({
      url: "http://localhost:5000/api/new-question",
      method: "POST",
      data: formData,
      headers: {
        authorization: token,
        Accept: "application/json",
        "Content-Type": "multipart/form-data"
      }
    }).then(res => {
      if (res.data.success) {
        dispatch({
          type: ADD_QUESTION,
          payload: {
            needQuestionLoad: true,
            addedQuestionId: res.data.questionId
          }
        });
      } else {
        dispatch({
          type: ADD_QUESTION,
          payload: {
            showNotification: true,
            modalMessage: res.data.message
          }
        });
      }
    });
  };
}
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
// Hide notification
export function hideNotification() {
  return dispatch => {
    return dispatch({
      type: HIDE_NOTIFICATION,
      payload: {
        showNotification: false,
        modalMessage: ""
      }
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
            type: ANSWERED,
            payload: {
              showNotification: true,
              modalMessage: res.data.message,
              answer: res.data.answer,
              answered: true,
              writeAnswer: false
            }
          });
        } else {
          //will implement later
          return dispatch({
            type: ANSWERING_FAILED,
            showNotification: true,
            modalMessage: res.data.message
          });
        }
      })
      .catch(err => {});
  };
}
// delete answer
export function deleteAnswer(questionId, token, userId) {
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
            type: REMOVE_ANSWERS,
            payload: {
              authorId: userId,
              showNotification: true,
              modalMessage: res.data.message,
              answered: false,
              writeAnswer: false
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
