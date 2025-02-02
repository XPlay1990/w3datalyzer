import React, {Component} from 'react';
import './NotFound.css';
import {Link} from 'react-router-dom';
import errorImage from "../resources/error/ape.jpg";
import Button from "@material-ui/core/Button";

class NotFound extends Component {
    render() {
        return (
            <div className="page-not-found">
                <img src={errorImage} className="errorImage" alt=""/>
                <h1 className="title">
                    404
                </h1>
                <div className="desc">
                    The Page you're looking for was not found.
                </div>
                <Link to="/"><Button className="go-back-btn" type="primary" size="large">Go Back</Button></Link>
            </div>
        );
    }
}

export default NotFound;