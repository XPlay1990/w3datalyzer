import React, {useEffect, useState} from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import './App.css';
import {Box, Button, Grid, ListItem, ListItemIcon, ListItemText, TextField, Typography} from "@material-ui/core";
import MailIcon from '@material-ui/icons/Mail';
import SendIcon from '@material-ui/icons/Send';
import {fetchBattleTagCandidates} from "./api/ApiUtils";
import './LandingPage.css'
import {useHistory} from "react-router-dom";
import {
    APP_PATH_STATISTICS,
    GATEWAY_EU,
    GATEWAY_NA,
    STORAGE_BATTLETAG,
    STORAGE_GATEWAY
} from "./resources/AppConstants";
import ReactGA from 'react-ga';
import {ToggleButton, ToggleButtonGroup} from "@material-ui/lab";

interface Suggestion {
    mmr: { rating: number },
    battleTag: string,
    rank: number,
    wins: number,
    loses: number,
    leagueId: number
}

function LandingPage() {
    const [playerTag, setPlayerTag] = useState<string>('')
    const [suggestions, setSuggestions] = useState<any[]>([])
    const [gateway, setGateway] = React.useState(GATEWAY_EU);

    const handleSetGateway = (newGateway: number) => {
        if (newGateway) {
            setGateway(newGateway);
        }
    };

    let history = useHistory()


    useEffect(() => {
        if (playerTag.length > 2) {
            const fetchData = async () => {
                const result = await fetchBattleTagCandidates(playerTag)
                setSuggestions(result.items);
            };
            fetchData();
        }
    }, [playerTag]);

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} sm={8}>
                <Box display={"flex"} flexDirection={"row"} flexWrap={"wrap"}>
                    <Autocomplete
                        id="playerTag"
                        style={{width: 300, marginRight: "50px", marginBottom: "20px"}}
                        options={suggestions}
                        debug
                        autoHighlight
                        filterOptions={(options, state) => {
                            return suggestions
                        }}

                        getOptionLabel={(option) => decodeURIComponent(option.battleTag)}
                        renderOption={(option) => (
                            <React.Fragment>
                                <div>
                                    {option.battleTag}
                                    {/*{option.wins}*/}
                                    {/*{option.loses}*/}
                                </div>
                            </React.Fragment>
                        )}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Enter battleTag"
                                // variant="outlined"
                                onChange={event => {
                                    setPlayerTag(event.target.value)
                                }}
                            />
                        )}
                        onChange={(event: any, value: any) => setPlayerTag(value.battleTag)}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        // className={classes.button}
                        style={{marginBottom: "auto", marginTop: "auto"}}
                        endIcon={<SendIcon/>}
                        disabled={!playerTag}
                        onClick={event => {
                            ReactGA.event({
                                category: "LandingPage",
                                action: "toStatistic",
                                label: playerTag
                            });
                            localStorage.setItem(STORAGE_BATTLETAG, playerTag)
                            localStorage.setItem(STORAGE_GATEWAY, gateway.toString())
                            history.push(`${APP_PATH_STATISTICS}/${encodeURIComponent(playerTag)}/${encodeURIComponent(gateway)}`)
                        }}
                    >Send</Button>
                    <ToggleButtonGroup size="small" value={gateway} exclusive
                                       onChange={(event, value) => handleSetGateway(value)}
                                       style={{margin: "auto"}}
                    >
                        <ToggleButton key={0} value={GATEWAY_EU}>
                            EU
                        </ToggleButton>,
                        <ToggleButton key={1} value={GATEWAY_NA}>
                            NA
                        </ToggleButton>,
                    </ToggleButtonGroup>
                </Box>
            </Grid>
            <Grid item xs={12} sm={8}>
                <Typography variant={"body1"}>Got suggestions? Contact me at: <ReactGA.OutboundLink
                    eventLabel="Contact_Mail" to={'mailto:j_adamczyk@hotmail.com'}
                    rel="noopener noreferrer">
                    <ListItem button key='Mail'>
                        <ListItemIcon><MailIcon/></ListItemIcon>
                        <ListItemText primary='j_adamczyk@hotmail.com'/>
                    </ListItem>
                </ReactGA.OutboundLink></Typography>
            </Grid>
        </Grid>
    );
}

export default LandingPage;
