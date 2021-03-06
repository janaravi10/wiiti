import React, { Component } from "react";
import { connect } from "react-redux";
import { authSessAction, getUserData } from "./actions/loginAction";
import { hideNotification } from "./actions/postAction";
import { withRouter } from "react-router-dom";
import Header from "./components/Header";
import Wiitis from "./components/Wiitis";
import Question from "./components/Question";
import "./App.css";
import { Route } from "react-router-dom";
import Login from "./components/Login";
import AskImage from "./components/AskImage";
class App extends Component {
  componentDidMount() {
    this.props.authUser();
    // getting the user data like email , token and storing in redux state
    this.props.getUserData();
  }

  hideModal = () => {
    // hiding the notification
    if (this.props.showNotification) {
      setTimeout(() => {
        this.props.hideNotification();
      }, 4000);
    }
  };
  alertModal = () => {
    if (this.props.showNotification) {
      return (
        <div className="error-modal">
          <p>{this.props.modalMessage}</p>
          <div className="close-error" onClick={this.props.hideNotification} />
        </div>
      );
    }
  };
  render() {
    return (
      <div className="App">
        <Header />
        <Route path="/ask-question" component={AskImage} />
        <Route exact path="/" component={Wiitis} />
        <Route path="/question/:id" component={Question} />
        <Route
          path="/login"
          render={props => <Login reason="LOGIN" {...props} />}
        />
        <Route
          path="/signup"
          render={props => <Login reason="SIGNUP" {...props} />}
        />
        {/* showing the alert box */}
        {this.alertModal()}
        {/* hiding the notification */}
        {this.hideModal()}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    loggedIn: state.user.loggedIn,
    modalMessage: state.post.modalMessage,
    showNotification: state.post.showNotification
  };
};
const mapDispatchToProps = {
  authUser: authSessAction,
  getUserData,
  hideNotification
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
