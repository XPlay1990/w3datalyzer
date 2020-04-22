import React from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';
import '../App.css';
import {MapStatistic, RaceStatisticList, useCalculateStatistics} from "../util/CalculateStatistics";
import {Pie} from "react-chartjs-2";
import {Grid, Typography} from "@material-ui/core";
import {chartColors} from "../util/ChartColors";
import {APP_PATH_STATISTICS, STORAGE_BATTLETAG} from "../resources/AppConstants";
import Overview from "./Overview";
import Race from "./Race";
import MapRace from "./MapRace";
import MapStats from "./MapStats";
import './Statistic.css'

function Statistics(props: any) {
    const battleTag = decodeURIComponent(props.match.params.battleTag)
    const statisticData = useCalculateStatistics(battleTag)

    localStorage.setItem(STORAGE_BATTLETAG, battleTag)

    return (
        <div className="Statistic">
            <Switch>
                <Route
                    path={`${APP_PATH_STATISTICS}/:battleTag/overview`}
                    render={(props) => <Overview statistic={statisticData} />}
                />
                <Route
                    path={`${APP_PATH_STATISTICS}/:battleTag/map`}
                    render={(props) => <MapStats statistic={statisticData} />}
                />
                <Route
                    path={`${APP_PATH_STATISTICS}/:battleTag/race`}
                    render={(props) => <Race statistic={statisticData} />}
                />
                <Route
                    path={`${APP_PATH_STATISTICS}/:battleTag/maprace`}
                    render={(props) => <MapRace statistic={statisticData} />}
                />
            </Switch>
        </div>
    );
}

export default withRouter(Statistics);
