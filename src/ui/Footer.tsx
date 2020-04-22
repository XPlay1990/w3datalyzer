import React from 'react';
import ReactGA from 'react-ga';
import './Footer.css'

function Footer() {

    return (
        <div className={"Footer"}>
            Brought to you by <ReactGA.OutboundLink eventLabel="homepage" to={'https://www.jan-adamczyk.de'}
                                                    rel="noopener noreferrer">Jan "XPlay" Adamczyk</ReactGA.OutboundLink>
        </div>
    );
}

export default Footer;
