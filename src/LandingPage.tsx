import React, {useState} from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import './App.css';
import {Button, TextField} from "@material-ui/core";
import SendIcon from '@material-ui/icons/Send';
import {useFetchBattleTagCandidates} from "./api/ApiUtils";

function LandingPage() {
    const [playerTag, setPlayerTag] = useState('')

    const top100Films = [
        {title: 'The Shawshank Redemption', year: 1994},
        {title: 'The Godfather', year: 1972},
    ];

    const defaultProps = {
        options: top100Films,
    };

    function handleOnChange() {
        // let options = useFetchBattleTagCandidates(playerTag)
    }

    return (
        <div>
            <Autocomplete
                {...defaultProps}
                id="debug"
                debug
                renderInput={(params) =>
                    <TextField {...params} label="debug" margin="normal"/>
                }
            />
            <Button
                variant="contained"
                color="primary"
                // className={classes.button}
                endIcon={<SendIcon/>}
            >Send</Button>
        </div>
    );
}

export default LandingPage;
