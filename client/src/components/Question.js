import React, { Component } from "react";
import "../css/post.css";
import logo from "../img/wiiti-image.jpg";
import Answer from "./Answer";
import Comment from "./Comment";
import { connect } from "react-redux";
import {
  getQuestion,
  writeAnswer,
  removeQuestion
} from "../actions/postAction";
class Question extends Component {
  componentDidMount = () => {
    this.props.getQuestion(this.props.match.params.id);
  };
  componentWillUnmount = () => {
    this.props.removeQuestion();
  };
  // function handler for handling edit answer function
  editAnswer = () => {
    let { answers, userId } = this.props;
    answers.forEach(ans => {
      if (ans.authorId === userId) {
        this.props.writeAnswer(JSON.parse(ans.content), userId);
      } else {
        console.log("nod");
      }
    });
  };
  renderQuestion = () => {
    const { question } = this.props;
    if (Object.keys(question).length !== 0) {
      return (
        <div className="question-head">
          <div className="post-image">
            <img
              src={JSON.parse(question.imgUrls)[0]}
              alt="Image with doubt!"
            />
          </div>
          <div className="info">
            <h3 className="title-question">{question.questionTitle}</h3>
          </div>
          <div>
            {this.props.answered && (
              <button
                className="btn-blue-white"
                onClick={this.editAnswer}
                id="editAnswer"
              >
                Edit answer
              </button>
            )}
            {this.props.answered || (
              <button
                className="btn-blue-white"
                onClick={() => {
                  this.props.writeAnswer({ ops: [] }, undefined);
                }}
              >
                answer
              </button>
            )}
          </div>
          <Answer />
          <Comment />
        </div>
      );
    } else {
      return (
        <div className="question-notfount">
          <h2>Your question is not fount</h2>
        </div>
      );
    }
  };
  render() {
    return (
      <div className="post">
        <div className="main-layout">{this.renderQuestion()}</div>
        <div className="side-layout">
          <h3>Related questions</h3>
          <hr />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    question: state.post.question,
    answered: state.post.answered,
    answers: state.post.answers,
    userId: state.user.userId
  };
};
const mapDispatchToProps = {
  getQuestion,
  removeQuestion,
  writeAnswer
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Question);
