import React, { Component } from 'react'
import "../css/wiiti.css";
import logo from "../img/wiiti-image.png";
class Wiiti extends Component {
    render() {
        return (
            <div className="wiiti">
                <img src={logo} alt="" className="query-image" />
                <p className="subtitle">Lorem ipsum dolor sit amet. </p>
            </div>
        )
    }
}

export default Wiiti;