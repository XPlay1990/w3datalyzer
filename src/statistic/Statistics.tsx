import React, {useEffect} from 'react';
import {Route, Switch, useHistory, withRouter} from 'react-router-dom';
import '../App.css';
import {useCalculateStatistics} from "../util/CalculateStatistics";
import {
    APP_PATH_LandingPage,
    APP_PATH_STATISTICS,
    APP_PATH_STATISTICS_OVERVIEW,
    STORAGE_BATTLETAG
} from "../resources/AppConstants";
import Overview from "./Overview";
import Race from "./Race";
import MapRace from "./MapRace";
import MapStats from "./MapStats";
import './Statistic.css'
import TabBar from "../ui/Tabs";
import {Button} from "@material-ui/core";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ReactGA from "react-ga";

function Statistics(props: any) {
    const battleTag = decodeURIComponent(props.match.params.battleTag)
    const statisticData = useCalculateStatistics(battleTag)
    let history = useHistory()

    localStorage.setItem(STORAGE_BATTLETAG, battleTag)

    useEffect(() => {
        history.push(APP_PATH_STATISTICS_OVERVIEW(encodeURIComponent(battleTag)))
    }, [statisticData])

    return (
        <div className="Statistic">
            <Button
                variant="contained"
                color="default"
                // className={classes.button}
                startIcon={<ArrowBackIosIcon/>}
                onClick={event => {
                    ReactGA.event({
                        category: "navigation",
                        action: "toLandingPage",
                    });
                    history.push(`${APP_PATH_LandingPage}`)
                }}
            >Back</Button>
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
    );
}

export default withRouter(Statistics);
