import React from 'react';
import {Box, Link, Typography} from "@material-ui/core";
import EqualizerIcon from '@material-ui/icons/Equalizer';
import './Header.css'

function Header() {

    return (
        <div className={"HeaderContainer"}>
            <Box display={"flex"} flexDirection={"row"} className={"HeaderAppContainer"}>
                <Box display={"flex"} flexDirection={"row"} className={"AppTitle"}>
                    <EqualizerIcon className={"HeaderIcon"} fontSize={"large"}/>
                    <Typography variant={"h1"} style={{fontSize: '3rem'}}>
                        w3datalyzer
                    </Typography>
                </Box>
                <img src={""} alt={""} className={"Logo"}/>
            </Box>
            <hr className={"HeaderDivider"}/>
        </div>
    );
}

export default Header;
