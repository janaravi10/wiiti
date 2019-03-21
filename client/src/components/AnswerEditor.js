import React, { Component } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { connect } from "react-redux";
import { postAnswer } from "../actions/postAction";
class AnswerEditor extends Component {
  state = {
    delta: { ops: [] }
  };
  componentDidMount = () => {
    // set the content for edit form
    this.setState({ delta: this.props.content });
    // creating a quill form
    let toolbarOptions = [
        ["bold"],
        ["blockquote", "code-block"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link", "image"],
        [{ indent: "-1" }, { indent: "+1" }],
        ["clean"]
      ],
      quill = new Quill("#editor", {
        theme: "snow",
        modules: {
          toolbar: toolbarOptions
        }
      });
    quill.setContents(this.props.content, "api");

    quill.on("text-change", () => {
      this.setState({ delta: quill.getContents() });
    });
  };

  handleAnswerSubmit = () => {
    let delta = this.state.delta;
    if (delta.ops.length) {
      this.props.postAnswer(this.props.questionId, delta, this.props.token);
    }
  };
  render() {
    return (
      <React.Fragment>
        <div>
          <div id="editor" />
          <button onClick={this.handleAnswerSubmit} className="btn-blue-white">
            submit
          </button>
        </div>
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => {
  return {
    questionId: state.post.question.id,
    token: state.user.token,
    content: state.post.content
  };
};
const mapDispatchToProps = {
  postAnswer
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnswerEditor);
