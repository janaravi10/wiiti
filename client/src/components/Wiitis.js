import React, { Component } from 'react'
import Wiiti from "./Wiiti";
import axios from "axios";
class Wiitis extends Component {
    state = {
        postList: []
    }
    componentDidMount() {
        axios.get("http://localhost:5000/api/wiitis")
            .then(res => {
          
                if (res.data.length) {
                    this.setState({ postList: res.data });
                }else{
                    console.log("nothing")
                }
            });
    }
    render() {
        return (
            <div className="wrapper">
                {this.state.postList.map(post => {
                    console.log(post);
                    return <Wiiti postId={post.postId} imgSrc={post.imgSrc} title={post.title}></Wiiti>
                })}
            </div>
        )
    }
}
export default Wiitis;
