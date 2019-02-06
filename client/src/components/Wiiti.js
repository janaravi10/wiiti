import React, { Component } from 'react'
import "../css/wiiti.css";
import logo from "../img/wiiti-image.jpg";
import { Link } from "react-router-dom";
class Wiiti extends Component {
    render() {
        return (
            <div className="wiiti">
                <Link to="" className="wiiti-link">
                <img src={logo} alt="" className="query-image" />
                <p className="subtitle">Lorem ipsum dolor sit amet. </p>
                </Link>
            </div>
        );
    }
}

export default Wiiti;