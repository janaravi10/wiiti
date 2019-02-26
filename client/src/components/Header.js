import React, { Component } from "react";
import { connect } from "react-redux";
import "../css/header.css";
import brandLogo from "../img/logoBlue.png";
import profileLogo from "../img/profileLogo.png";
import { Link } from "react-router-dom";
import {  logoutAction } from "../actions/loginAction";
import { createBrowserHistory } from "history";

class Header extends Component {
  logout = () => {
    const history = createBrowserHistory();
    this.props.logoutUser(history);
  };
  render() {
    return (
      <header>
        <div className="brand-container">
          <Link to="/">
            <img className="brand-logo" src={brandLogo} alt="Brand logo" />
          </Link>
        </div>
        <div className="aside-header">
          <div className="post-question">
            <Link className="ask-question btn-blue-white" to="/ask-question">
              {" "}
              Ask about image
            </Link>
          </div>
          <div className="header-profile">
            {this.props.loggedIn ? (
              <img src={profileLogo} className="profile-logo" alt="" />
            ) : (
              <Link to="/login" className="loginBtn">
                Login
              </Link>
            )}
            {this.props.loggedIn ? (
              <React.Fragment>
              <div className="notch"></div>
              <div className="overlay-background"></div>
              <ul className="dropdown-user">
                <li>{this.props.email}</li>
                <li>
                  <span className="logout" onClick={this.logout}>
                    Logout
                  </span>
                </li>
              </ul>
              </React.Fragment>
            ) : (
              ""
            )}
          </div>
        </div>
      </header>
    );
  }
}
const mapStateToProps = state => {
  return {
    loggedIn: state.user.loggedIn,
    email: state.user.email
  };
};
const mapDispatchToProps = {
  logoutUser: logoutAction
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
