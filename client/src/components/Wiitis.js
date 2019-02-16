import React, { Component } from 'react'
import Wiiti from "./Wiiti";
import axios from "axios";
class Wiitis extends Component {
    state = {
        postList: []
    }
    componentDidMount() {
        // getting the data from api
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
                    //looping through the data
                    return <Wiiti postId={post._id} key={post._id} imgSrc={post.imgUrls[0]} title={post.questionTitle}></Wiiti>
                })}
            </div>
        )
    }
}
export default Wiitis;
