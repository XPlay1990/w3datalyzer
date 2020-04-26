import React, {useEffect, useState} from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import './App.css';
import {Box, Button, TextField} from "@material-ui/core";
import SendIcon from '@material-ui/icons/Send';
import {fetchBattleTagCandidates} from "./api/ApiUtils";
import './LandingPage.css'
import {useHistory} from "react-router-dom";
import {APP_PATH_STATISTICS, STORAGE_BATTLETAG} from "./resources/AppConstants";
import ReactGA from 'react-ga';

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
                    history.push(`${APP_PATH_STATISTICS}/${encodeURIComponent(playerTag)}`)
                    localStorage.setItem(STORAGE_BATTLETAG, playerTag)
                }}
            >Send</Button>
        </Box>
    );
}

export default LandingPage;
