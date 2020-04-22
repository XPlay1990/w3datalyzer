import React, {useEffect, useState} from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import './App.css';
import {Button, TextField} from "@material-ui/core";
import SendIcon from '@material-ui/icons/Send';
import {fetchBattleTagCandidates} from "./api/ApiUtils";
import './LandingPage.css'
import {useHistory} from "react-router-dom";
import {APP_PATH_STATISTICS} from "./resources/AppConstants";

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
        <div>
            <Autocomplete
                id="playerTag"
                style={{width: 300}}
                options={suggestions}
                debug
                autoHighlight
                filterOptions={(options, state) => {
                    return suggestions
                }
                }

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
                endIcon={<SendIcon/>}
                disabled={!playerTag}
                onClick={event => {
                    history.push(`${APP_PATH_STATISTICS}/${encodeURIComponent(playerTag)}`)
                }}
            >Send</Button>
        </div>
    );
}

export default LandingPage;
