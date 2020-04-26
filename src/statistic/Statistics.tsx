import React, {useEffect, useState} from 'react';
import {Route, Switch, useHistory, withRouter} from 'react-router-dom';
import '../App.css';
import {useCalculateStatistics} from "../util/CalculateStatistics";
import {
    APP_PATH_LandingPage,
    APP_PATH_STATISTICS,
    APP_PATH_STATISTICS_OVERVIEW,
    STORAGE_BATTLETAG,
    W3CHAMPIONS_PROFILE_URL
} from "../resources/AppConstants";
import Overview from "./Overview";
import Race from "./Race";
import MapRace from "./MapRace";
import MapStats from "./MapStats";
import './Statistic.css'
import TabBar from "../ui/Tabs";
import {Box, Button, CircularProgress, Typography} from "@material-ui/core";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ReactGA from "react-ga";
import RdmImage from "../resources/rdm.jpg";
import OrcImage from "../resources/orc.jpg";
import ElfImage from "../resources/elf.jpg";
import HumanImage from "../resources/human.jpg";
import UndeadImage from "../resources/undead.jpg";

function Statistics(props: any) {
    const battleTag = decodeURIComponent(props.match.params.battleTag)
    const statisticData = useCalculateStatistics(battleTag)
    const [raceImage, setRaceImage] = useState(RdmImage)
    let history = useHistory()

    localStorage.setItem(STORAGE_BATTLETAG, battleTag)

    useEffect(() => {
        history.push(APP_PATH_STATISTICS_OVERVIEW(encodeURIComponent(battleTag)))
    }, [statisticData])


    useEffect(() => {
        switch (statisticData.statistics?.mostPlayedRace) {
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
    }, [statisticData.isLoading])

    return (
        (statisticData.isLoading) ? (
            <Box display={"flex"} style={{justifyContent: "center"}}>
                <CircularProgress size={80}/>
            </Box>
        ) : (
            <div className="Statistic">
                <Box display={"flex"} flexDirection={"row"} className="StatisticTitleBox">
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
                                              to={W3CHAMPIONS_PROFILE_URL(battleTag)}
                                              rel="noopener noreferrer">
                            {battleTag}
                        </ReactGA.OutboundLink>
                    </Typography>
                </Box>
                <TabBar/>
                <Switch>
                    <Route
                        path={`${APP_PATH_STATISTICS}/:battleTag/overview`}
                        render={(props) => <Overview statistic={statisticData}/>}
                    />
                    <Route
                        path={`${APP_PATH_STATISTICS}/:battleTag/map`}
                        render={(props) => <MapStats statistic={statisticData}/>}
                    />
                    <Route
                        path={`${APP_PATH_STATISTICS}/:battleTag/race`}
                        render={(props) => <Race statistic={statisticData}/>}
                    />
                    <Route
                        path={`${APP_PATH_STATISTICS}/:battleTag/maprace`}
                        render={(props) => <MapRace statistic={statisticData}/>}
                    />
                </Switch>
            </div>
        )
    )
}

export default withRouter(Statistics);
