import React, { Component } from "react";
import "../css/answer.css";
import logo from "../img/wiiti-image.jpg";
import AnswerEditor from "./AnswerEditor";
import { connect } from "react-redux";
import { getAnswers, isAnswered, deleteAnswer} from "../actions/postAction";
import "quill/dist/quill.snow.css";
class Answer extends Component {
  state = {
    showModal: false
  };
  componentDidMount = () => {
    this.props.getAnswers(this.props.questionId);
    this.props.isAnswered(this.props.questionId, this.props.token);
  };
  handleAnswerDelete = () => {
    this.props.deleteAnswer(this.props.questionId, this.props.token);
  };
  parseQuill = delta => {
    let quillDelta = delta.ops,
      htmlString = [],
      nxtElem,
      nxtAttr,
      currentAttr = "";
    quillDelta.forEach((el, index, arr) => {
      nxtElem = arr[index + 1];
      nxtAttr = nxtElem ? nxtElem.attributes : undefined;
      currentAttr = Object.keys(el.attributes || {});
      if (typeof el.insert === "string") {
        if (!el.insert.match(/^\n/g) && el.insert.length !== 1) {
          if (nxtAttr) {
            if (nxtAttr.blockquote) {
              htmlString.push(
                <p className={"blockquote block" + currentAttr}>{el.insert}</p>
              );
            } else if (nxtAttr.ordered) {
              htmlString.push(
                <p className={"ordered block" + currentAttr}> {el.insert} </p>
              );
            } else if (nxtAttr.list) {
              htmlString.push(
                <p className={"list block" + currentAttr}>{el.insert} </p>
              );
            } else if (nxtAttr["code-block"]) {
              htmlString.push(
                <p className={"code-block block" + currentAttr}>{el.insert}</p>
              );
            } else {
              htmlString.push(<p className={currentAttr}> {el.insert} </p>);
            }
          } else {
            htmlString.push(<p className={currentAttr}> {el.insert} </p>);
          }
        } else if (el.insert.length > 1) {
          htmlString.push(<p className={currentAttr}> {el.insert} </p>);
        } else if (nxtAttr) {
          htmlString.push(<br />);
        }
      } else if (typeof el.insert === "object") {
        htmlString.push(<img src={el.insert.image} />);
      }
    });
    return htmlString;
  };
  renderAnswers = () => {
    let answers = this.props.answers;
    if (answers.length) {
      return answers.map(answer => {
        return (
          <div className="answer">
            {this.state.showModal && (
              <div className="alert-delete">
                <div className="delete-wrapper">
                  <p>Do you really want to delete this answer?</p>
                  <button onClick={this.handleAnswerDelete}>yes</button>
                  <button onClick={() => {
                    this.setState({ showModal: false });
                  }}>cancel</button>
                </div>
              </div>
            )}

            <div className="profile">
              <div className="logo-wrapper">
                <img src={logo} alt="" className="user-logo" />
              </div>
              <div>
                <div>
                  <span className="profile-status">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Veniam, iure.
                  </span>
                  <div>
                    <span className="answer-on">
                      Anwered on{" "}
                      {new Date(Number(answer.answeredOn)).toDateString()}
                    </span>
                  </div>
                </div>
              </div>
              {this.props.userId === answer.authorId ? (
                <span
                  className="delete-answer"
                  onClick={() => {
                    this.setState({ showModal: true });
                  }}
                >
                  &times;
                </span>
              ) : (
                ""
              )}
            </div>
            <div className="answer-body" id={"editor" + answer.id}>
              {this.parseQuill(JSON.parse(answer.content))}
            </div>
            <div className="answer-footer">
              <span className="hits">1k hits</span>
            </div>
          </div>
        );
      });
    } else {
      return (
        <div className="no-answer">
          <h2>No answer available</h2>
        </div>
      );
    }
  };
  render() {
    return (
      <React.Fragment>
        {this.renderAnswers()}
        {this.props.writeAnswer && <AnswerEditor />}
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => {
  return {
    answered: state.post.answered,
    answers: state.post.answers,
    questionId: state.post.question.id,
    userId: state.user.userId,
    writeAnswer: state.post.writeAnswer,
    token: state.user.token
  };
};
const mapDispatchToProps = {
  getAnswers,
  isAnswered, deleteAnswer
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Answer);
