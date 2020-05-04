import React from 'react';
import '../App.css';
import {APP_PATH_STATISTICS} from "../resources/AppConstants";
import './Statistic.css'
import {Route, Switch} from "react-router-dom";
import Overview from "./Overview";
import MapStats from "./MapStats";
import Race from "./Race";
import MapRace from "./MapRace";
import {StatisticDataFetch} from "../util/CalculateStatistics";
import Team2v2 from "./team/Team_2v2";


function StatisticsSwitch(input: StatisticDataFetch) {

    return (
        <Switch>
            <Route
                path={`${APP_PATH_STATISTICS}/:battleTag/:gateway/overview`}
                render={(props) => <Overview statistics={input.statistics!}/>}
            />
            <Route
                path={`${APP_PATH_STATISTICS}/:battleTag/:gateway/map`}
                render={(props) => <MapStats statistics={input.statistics!}/>}
            />
            <Route
                path={`${APP_PATH_STATISTICS}/:battleTag/:gateway/race`}
                render={(props) => <Race statistics={input.statistics!}/>}
            />
            <Route
                path={`${APP_PATH_STATISTICS}/:battleTag/:gateway/maprace`}
                render={(props) => <MapRace statistics={input.statistics!}/>}
            />
            <Route
                path={`${APP_PATH_STATISTICS}/:battleTag/:gateway/2v2`}
                render={(props) => <Team2v2 statistics={input.statistics!}/>}
            />
            <Route
                path={`${APP_PATH_STATISTICS}/:battleTag/:gateway`}
                render={(props) => <Overview statistics={input.statistics!}/>}
            />
        </Switch>
    )
}

export default StatisticsSwitch;
