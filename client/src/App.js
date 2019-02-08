import React, { Component } from "react";
import Header from "./components/Header";
import Wiitis from "./components/Wiitis";
import Post from "./components/Post";
import "./App.css";
import { Route, BrowserRouter as router } from "react-router-dom";
import Login from "./components/Login";
class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Route exact path="/" component={Wiitis} />
        <Route path="/post/:id" component={Post} /> 
        <Route path="/login" render={props => <Login reason="LOGIN" {...props}/>} />
        <Route path="/signup" render={props => <Login reason="SIGNUP" {...props} />} />
      </div>
    );
  }
}

export default App;
