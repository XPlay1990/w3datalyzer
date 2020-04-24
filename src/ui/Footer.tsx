import React from 'react';
import ReactGA from 'react-ga';
import './Footer.css'
import {Box, Typography} from "@material-ui/core";

function Footer() {

    return (
        <Box className="Footer">
            <div className={"FooterText"}>
                <Typography variant={"body2"}>Brought to you by
                    <ReactGA.OutboundLink eventLabel="homepage"
                                          to={'https://www.jan-adamczyk.de'}
                                          rel="noopener noreferrer">
                        Jan "XPlay" Adamczyk
                    </ReactGA.OutboundLink>
                </Typography>
            </div>
            <div className={"FooterText"}>
                <Typography variant={"body2"} className={"FooterText"}>Data taken from
                    <ReactGA.OutboundLink eventLabel="w3champions"
                                          to={'https://w3champions.com/'}
                                          rel="noopener noreferrer"> www.w3champions.com</ReactGA.OutboundLink>
                </Typography>
            </div>
        </Box>
    );
}

export default Footer;
