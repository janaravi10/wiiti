import React, { Component } from 'react';
import Header from "./components/Header";
import Wiitis from "./components/Wiitis";
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header></Header>
        <Wiitis></Wiitis>
      </div>
    );
  }
}

export default App;
