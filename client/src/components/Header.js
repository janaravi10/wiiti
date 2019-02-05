import React, { Component } from 'react';
import '../css/header.css';
import brandLogo from "../img/logoBlue.png";

class Header extends Component {
  render() {
    return (
      <header>
        <img className="brand-logo" src={brandLogo} alt="Brand logo" />
      </header>
    )
  }
}

export default Header;