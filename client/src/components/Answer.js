import React, { Component } from "react";
import "../css/answer.css";
import logo from "../img/wiiti-image.jpg";
class Answer extends Component {
  render() {
    return (
      <div className="answer">
        <div className="profile">
          <div className="logo-wrapper">
            <img src={logo} alt="" className="user-logo" />
          </div>
          <div>
            <div>
              <span className="profile-status">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam,
                iure.
              </span>
              <div>
                <span className="answer-on">Anwered on september</span>
              </div>
            </div>
          </div>
        </div>
        <div className="answer-body">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae
            natus esse facere sit vitae consequuntur alias possimus, veniam odit
            excepturi animi laborum? Eaque, optio perferendis nemo quo
            doloremque eveniet corporis.
          </p>
        </div>
        <div className="answer-footer">
          <span className="hits">1k hits</span>
        </div>
      </div>
    );
  }
}
export default Answer;
