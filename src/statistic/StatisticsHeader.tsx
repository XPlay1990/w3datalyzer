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
import HumanBackground from "../resources/background/WarcraftIII_Human_Wallpaper-min.jpg";
import OrcBackground from "../resources/background/WarcraftIII_Orc_Wallpaper-min.jpg";
import UndeadBackground from "../resources/background/WarcraftIII_Undead_Wallpaper-min.jpg";
import ElfBackground from "../resources/background/WarcraftIII_NightElf_Wallpaper_cut-min.jpg";
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
                document.documentElement.style.setProperty("--root-background", 'url(' + HumanBackground + ')');
                break
            case 2:
                //orc
                setRaceImage(OrcImage)
                document.documentElement.style.setProperty("--root-background", 'url(' + OrcBackground + ')');
                break
            case 4:
                //elf
                setRaceImage(ElfImage)
                document.documentElement.style.setProperty("--root-background", 'url(' + ElfBackground + ')');
                break
            case 8: //wtf pad
                //undead
                setRaceImage(UndeadImage)
                document.documentElement.style.setProperty("--root-background", 'url(' + UndeadBackground + ')');
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
