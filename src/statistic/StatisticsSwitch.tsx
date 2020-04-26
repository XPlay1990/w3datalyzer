import React from 'react';
import '../App.css';
import {APP_PATH_STATISTICS} from "../resources/AppConstants";
import './Statistic.css'
import {Route, Switch} from "react-router-dom";
import Overview from "./Overview";
import MapStats from "./MapStats";
import Race from "./Race";
import MapRace from "./MapRace";
import {StatisticDataOutput} from "../util/CalculateStatistics";


function StatisticsSwitch(input: StatisticDataOutput) {

    return (
        <Switch>
            <Route
                path={`${APP_PATH_STATISTICS}/:battleTag/overview`}
                render={(props) => <Overview statistic={input}/>}
            />
            <Route
                path={`${APP_PATH_STATISTICS}/:battleTag/map`}
                render={(props) => <MapStats statistic={input}/>}
            />
            <Route
                path={`${APP_PATH_STATISTICS}/:battleTag/race`}
                render={(props) => <Race statistic={input}/>}
            />
            <Route
                path={`${APP_PATH_STATISTICS}/:battleTag/maprace`}
                render={(props) => <MapRace statistic={input}/>}
            />
            <Route
                path={`${APP_PATH_STATISTICS}/:battleTag`}
                render={(props) => <Overview statistic={input}/>}
            />
        </Switch>
    )
}

export default StatisticsSwitch;
