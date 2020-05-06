import React, {Dispatch} from 'react';
import {Box, Grid, Tooltip, Typography} from "@material-ui/core";
import EqualizerIcon from '@material-ui/icons/Equalizer';
import './Header.css'
import {ToggleButton, ToggleButtonGroup} from "@material-ui/lab";
import ReactGA from 'react-ga';
import {IS_DARK_MODE} from "../resources/AppConstants";

interface DarkModeState {
    isDarkMode: string,
    setIsDarkMode: Dispatch<string>
}

function Header(darkModeState: DarkModeState) {

    function changeDarkMode(event: any, isDarkMode: string) {
        darkModeState.setIsDarkMode(isDarkMode);
        localStorage.setItem(IS_DARK_MODE, isDarkMode);

        ReactGA.event({
            category: "ChangeDisplayMode",
            action: isDarkMode ? 'dark' : 'light',
        });
    }

    return (
        <div className={"HeaderContainer"}>
            <Grid container spacing={3} className={"HeaderAppContainer"}>
                <Grid item sm={6} xs={12} className="AppTitle">
                    <Box display={"flex"} flexDirection={"row"}>
                        <EqualizerIcon className={"HeaderIcon"} fontSize={"large"}/>
                        <Typography variant={"h1"} style={{fontSize: '3rem',}}>
                            w3datalyzer
                        </Typography>
                    </Box>
                </Grid>
                <Grid item sm={6} xs={12} style={{display: "flex", alignContent: "flex-end"}}>
                    <Tooltip title={"Change color mode"}>
                        <ToggleButtonGroup
                            value={darkModeState.isDarkMode}
                            exclusive
                            size="medium"
                            onChange={changeDarkMode}
                            aria-label="text alignment"
                            className="DarkmodeToggle"
                        >
                            <ToggleButton value='true' aria-label="centered">
                                <Typography variant={"body1"}>Dark</Typography>
                            </ToggleButton>
                            <ToggleButton value='false' aria-label="centered">
                                <Typography variant={"body1"}>Bright</Typography>
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </Tooltip>
                </Grid>
                {/*<img src={""} alt={""} className={"Logo"}/>*/}
            </Grid>
            <hr className={"HeaderDivider"}/>
        </div>
    );
}

export default Header;
