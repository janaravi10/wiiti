import React, { Component } from "react";
import logo from "../img/wiiti-image.jpg";
import "../css/comment.css";
class Comment extends Component {
  render() {
    return (
      <div className="comment-wrapper">
        <div className="comment-form">
          <div className="logo-wrapper">
            <img src={logo} alt="" className="user-logo" />
          </div>
          <form action="" className="form-comment">
            <input
              type="text"
              placeholder="Add a comment"
              className="comment-input"
            />
            <button className="comment-btn">Comment</button>
          </form>
        </div>
        <div className="comments">
          <div className="ind-comment">
            <div className="commenter-img">
              <img src={logo} alt="" />
            </div>
            <div className="comment-content">Lorem ipsum dolor sit amet.</div>
          </div>
        </div>
      </div>
    );
  }
}
export default Comment;
