import React, { Component } from "react";
import "../css/post.css";
import logo from "../img/wiiti-image.jpg";
import { Link } from "react-router-dom";
import Answer from "../components/Answer";
import Comment from "../components/Comment";
class Post extends Component {
  render() {
    return (
      <div className="post">
        <div className="main-layout">
          <div className="question-head">
            <div className="post-image">
              <img src={logo} alt="" />
            </div>
            <div className="info">
              <h3 className="title-question">
                Lorem ipsum dolor sit amet, consectetur adipisici
              </h3>
              <span className="response">10 response</span>
            </div>
          </div>
          <Answer />
          <Comment />
        </div>
        <div className="side-layout">
          <h3>Related questions</h3>
          <hr />
        </div>
      </div>
    );
  }
}

export default Post;
