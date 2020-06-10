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
import "./StatisticHeader.css"

interface Input {
    race: number | undefined,
    battleTag: string,
    gateway: number,
    playerStats: any
}

function StatisticsHeader(input: Input) {
    const [raceImage, setRaceImage] = useState(RdmImage)

    let history = useHistory()

    let wins: number = 0
    let losses: number = 0
    let winrate: string = NO_GAMES_TEXT
    let mmr: number = 0
    let rankingPoints: number = 0
    let division: number = 0
    let leagueOrder: number = 0
    let rank: number = 0

    const gateWayStats = input.playerStats.gateWayStats
    console.log(input.playerStats)
    if (gateWayStats) {
        for (const gatewayStat of gateWayStats) {
            if (Number(gatewayStat.gateWay) === input.gateway) {
                for (const gameModeStat of gatewayStat.gameModeStats) {
                    if (gameModeStat.mode === 1) {
                        console.log(gameModeStat)
                        wins = gameModeStat.wins
                        losses = gameModeStat.losses
                        winrate = (gameModeStat.winrate * 100).toFixed(2) + "%"
                        rank = gameModeStat.rank
                        rankingPoints = gameModeStat.rankingPoints
                        mmr = gameModeStat.mmr
                        division = gameModeStat.division
                        leagueOrder = gameModeStat.leagueOrder
                    }
                }
            }
        }
    }
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

                {gateWayStats ? (
                        <Paper style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            flexWrap: "wrap",
                            padding: "10px"
                        }}>
                            <LeagueIcon
                                leagueDivision={division}
                                leagueOrder={leagueOrder}
                                rank={rank}
                            />
                            <Box display={"flex"} flexDirection={"column"}
                                 style={{justifyContent: "center", marginLeft: "10px"}}>
                                <Typography variant={"body1"}>{rankingPoints} rp</Typography>
                                <Typography variant={"body1"}>{mmr} mmr</Typography>
                                <Box display={"flex"} flexDirection={"row"}>
                                    <Typography variant={"body1"} style={{color: "green"}}>{wins}</Typography>
                                    <Typography variant={"body1"} style={{color: "grey"}}> / </Typography>
                                    <Typography variant={"body1"} style={{color: "red"}}>{losses}</Typography>
                                    <div className="SoloBorder">
                                        <Typography variant={"body1"}>{winrate}</Typography>
                                    </div>
                                </Box>
                            </Box>
                        </Paper>
                    )
                    : null
                }
            </Box>
        </Box>
    )
}

export default StatisticsHeader;
