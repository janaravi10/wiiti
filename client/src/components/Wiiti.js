import React, { Component } from 'react'
import "../css/wiiti.css";
import { Link } from "react-router-dom";
class Wiiti extends Component {
    render() {
        console.log(this.props);
        return (
          <div className="wiiti">
                <Link to={"/question/" + this.props.postId} className="wiiti-link">
              <img
                src={this.props.imgSrc}
                alt=""
                className="query-image"
              />
              <p className="subtitle">{this.props.title} </p>
            </Link>
          </div>
        );
    }
}

export default Wiiti;