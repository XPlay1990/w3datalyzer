import React, {Component} from 'react';
import './NotFound.css';
import {Link} from 'react-router-dom';
import errorImage from "../resources/error/ape.jpg";
import Button from "@material-ui/core/Button";

class Forbidden extends Component {
    render() {
        return (
            <div className="page-not-found">
                <img src={errorImage} className="errorImage" alt=""/>
                <h1 className="title">
                    403
                </h1>
                <div className="desc">
                    You are not authorized to view the requested source.
                </div>
                <Link to="/"><Button className="go-back-btn" type="primary" size="large">Go Back</Button></Link>
            </div>
        );
    }
}

export default Forbidden;