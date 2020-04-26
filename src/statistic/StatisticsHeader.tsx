import React, {useEffect, useState} from 'react';
import '../App.css';
import {APP_PATH_LandingPage, W3CHAMPIONS_PROFILE_URL} from "../resources/AppConstants";
import './Statistic.css'
import {Box, Button, Typography} from "@material-ui/core";
import ReactGA from "react-ga";
import RdmImage from "../resources/rdm.jpg";
import OrcImage from "../resources/orc.jpg";
import ElfImage from "../resources/elf.jpg";
import HumanImage from "../resources/human.jpg";
import UndeadImage from "../resources/undead.jpg";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import {useHistory} from "react-router-dom";

interface Input {
    race: number | undefined,
    battleTag: string
}

function StatisticsHeader(input: Input) {
    const [raceImage, setRaceImage] = useState(RdmImage)

    let history = useHistory()

    useEffect(() => {
        switch (input.race) {
            case 0:
                //rdm
                setRaceImage(RdmImage)
                break
            case 1:
                //human
                setRaceImage(HumanImage)
                break
            case 2:
                //orc
                setRaceImage(OrcImage)
                break
            case 4:
                //elf
                setRaceImage(ElfImage)
                break
            case 8: //wtf pad
                //undead
                setRaceImage(UndeadImage)
                break
            default:
                setRaceImage(RdmImage)
                break
        }
    }, [])

    return (
        <Box display={"flex"} flexDirection={"row"} className="StatisticTitleBox" flexWrap={"wrap"}>
            <Button
                variant="contained"
                color="default"
                // className={classes.button}
                startIcon={<ArrowBackIosIcon/>}
                className="BackButton"
                onClick={event => {
                    ReactGA.event({
                        category: "navigation",
                        action: "toLandingPage",
                    });
                    history.push(`${APP_PATH_LandingPage}`)
                }}
            >Back</Button>
            <Typography
                variant={"h3"}
                style={{marginLeft: "auto", marginRight: "auto"}}
                className="StatisticsTitle"
            >Statistics for <img src={raceImage} className="raceImage" alt=""/>
                <ReactGA.OutboundLink eventLabel="w3champions Profile"
                                      to={W3CHAMPIONS_PROFILE_URL(input.battleTag)}
                                      rel="noopener noreferrer">
                    {input.battleTag}
                </ReactGA.OutboundLink>
            </Typography>
        </Box>
    )
}

export default StatisticsHeader;
