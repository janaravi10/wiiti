import React, { Component } from "react";
import "./../css/login.css";
import { Link } from "react-router-dom";
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
      SIGNUP: { submitBtn: "Sign up" }
    };
  }

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
        <form action="" className="login-form">
          <input
            type="text"
            name="username"
            className="input-text"
            placeholder="email or username"
          />
          <input
            type="password"
            name="password"
            className="input-text"
            placeholder="password"
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

export default Login;
