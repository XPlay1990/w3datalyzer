import React from 'react';
import {Box, Typography} from "@material-ui/core";
import GpsFixedIcon from '@material-ui/icons/GpsFixed'
import './Header.css'

function Header() {

    return (
        <div className={"HeaderContainer"}>
            <Box display={"flex"} flexDirection={"row"} className={"HeaderAppContainer"}>
                <Box display={"flex"} flexDirection={"row"} className={"AppTitle"}>
                    <GpsFixedIcon className={"HeaderIcon"} fontSize={"large"}/>
                    <Typography variant={"h1"} style={{fontSize:'3rem'}}>
                        W3Stats
                    </Typography>
                </Box>
                <img src={""} alt={""} className={"Logo"}/>
            </Box>
            <hr className={"HeaderDivider"}/>
        </div>
    );
}

export default Header;
