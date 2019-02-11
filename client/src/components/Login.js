import React, { Component } from "react";
import "./../css/login.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import { loginActionCreator } from "../actions/loginAction";
class Login extends Component {
  /*
   * using the same component for sign up and login form
   * by just changing the value of form inputs and names
   */
  constructor(props) {
    super(props);
    this.state = {
      whatItis: this.props.reason == "LOGIN" ? "LOGIN" : "SIGNUP",
      LOGIN: { submitBtn: "Login" },
      SIGNUP: { submitBtn: "Sign up" },
      email: "",
      password: ""
    };
  }
  // handling the input changes and updating the state;
  handleChange = e => {
    let elem = e.target;
    this.setState({ [elem.name]: elem.value });
  };

  // handle form submit;
  handleFormSubmit = e => {
    e.preventDefault();
    let { email, password } = this.state;
    if (email && password && password.length >= 8) {
      if (e.target.name === "LOGIN") {
        console.log("coomming ing")
        this.props.logInUser(email, password);
      } else if (e.target.name === "SIGNUP") {
        axios
          .post("http://localhost:5000/api/signup", {
            email: this.state.email,
            password: this.state.password
          })
          .then(res => {
            console.log(res);
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  };

  render() {
    const { whatItis } = this.state;
    let locationTo = "";
    if (whatItis === "LOGIN") {
      locationTo = "signup";
    } else {
      locationTo = "login";
    }
    return (
      <div className="login-modal">
        <form
          action=""
          className="login-form"
          onSubmit={this.handleFormSubmit}
          name={this.state.whatItis}
        >
          <input
            type="text"
            name="email"
            className="input-text"
            placeholder="email or username"
            onChange={this.handleChange}
            value={this.state.email}
          />
          <input
            type="password"
            name="password"
            className="input-text"
            placeholder="password"
            onChange={this.handleChange}
            value={this.state.password}
          />
          <input
            type="submit"
            name={whatItis}
            value={this.state[whatItis].submitBtn}
            className="login-btn"
          />
          <div className="alternate">
            <span className="questioner">
              {whatItis === "LOGIN"
                ? " Not registered? "
                : " Already have an account "}
            </span>
            <Link to={"/" + locationTo}>
              {whatItis === "LOGIN" ? "Create an account" : "Login now"}
            </Link>
          </div>
        </form>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    loggedIn: state.user.loggedIn
  };
};
const mapDispatchToProps = {
    logInUser: loginActionCreator
  };
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
