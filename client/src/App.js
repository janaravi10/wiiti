import React, { Component } from "react";
import { connect } from "react-redux";
import { authSessAction } from "./actions/loginAction";
import { withRouter } from "react-router-dom";
import Header from "./components/Header";
import Wiitis from "./components/Wiitis";
import Post from "./components/Post";
import "./App.css";
import { Route } from "react-router-dom";
import Login from "./components/Login";
import AskImage from "./components/AskImage";
class App extends Component {
  componentDidMount() {
    this.props.authUser();
    console.log(this.props.loggedIn);
  }
  render() {
    return (
      <div className="App">
        <Header />
        <Route path="/ask-question" component={AskImage}/>
        <Route exact path="/" component={Wiitis} />
        <Route path="/post/:id" component={Post} />
        <Route
          path="/login"
          render={props => <Login reason="LOGIN" {...props} />}
        />
        <Route
          path="/signup"
          render={props => <Login reason="SIGNUP" {...props} />}
        />
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
  authUser: authSessAction
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
