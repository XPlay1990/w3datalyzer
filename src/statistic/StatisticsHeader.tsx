import React, {useEffect, useState} from 'react';
import '../App.css';
import {APP_PATH_LandingPage, NO_GAMES_TEXT, W3CHAMPIONS_PROFILE_URL} from "../resources/AppConstants";
import './Statistic.css'
import {Box, Button, Paper, Typography} from "@material-ui/core";
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
import {LeagueIcon} from "../util/LeagueIcon";

interface Input {
    race: number | undefined,
    battleTag: string,
    gateway: number,
    playerStats: any
}

function StatisticsHeader(input: Input) {
    const [raceImage, setRaceImage] = useState(RdmImage)

    let history = useHistory()

    const solo = input.playerStats.data.ladder[input.gateway].solo
    const wins = Number(solo.wins)
    const losses = Number(solo.losses)
    const winrate = wins + losses > 0 ? ((wins / (wins + losses) * 100).toFixed(2) + "%") : NO_GAMES_TEXT

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
            <Box display={"flex"} flexDirection={"column"}
                 style={{alignItems: "center", marginLeft: "auto", marginRight: "auto"}}>
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

                <Paper style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    width: "min-intrinsic",
                    flexWrap:"wrap",
                    padding: "10px"
                }}>
                    <Typography variant={"body1"}>Solo:</Typography>
                    <Typography variant={"body1"} style={{color: "green"}}>{wins}</Typography>
                    <Typography variant={"body1"} style={{color: "grey"}}> / </Typography>
                    <Typography variant={"body1"} style={{color: "red"}}>{losses}</Typography>
                    <Typography variant={"body1"} style={{color: "grey"}}> / </Typography>
                    <Typography variant={"body1"}>Winrate: {winrate}</Typography>
                    <LeagueIcon
                        leagueId={solo.ranking.leagueId}
                        leagueOrder={solo.ranking.leagueOrder}
                        rank={solo.ranking.rank}
                    />
                    <Typography variant={"body1"}>RP:{solo.ranking.rp.toFixed(0)}</Typography>
                    <Typography variant={"body1"} style={{color: "grey"}}> / </Typography>
                    <Typography variant={"body1"}>MMR:{solo.mmr.rating.toFixed(0)}</Typography>
                </Paper>
            </Box>
        </Box>
    )
}

export default StatisticsHeader;
