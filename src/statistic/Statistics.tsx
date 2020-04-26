import React from 'react';
import {withRouter} from 'react-router-dom';
import '../App.css';
import {useCalculateStatistics} from "../util/CalculateStatistics";
import './Statistic.css'
import TabBar from "../ui/Tabs";
import {Box, CircularProgress} from "@material-ui/core";
import StatisticsHeader from "./StatisticsHeader";
import StatisticsSwitch from "./StatisticsSwitch";

function Statistics(props: any) {
    const battleTag = decodeURIComponent(props.match.params.battleTag)
    const statisticData = useCalculateStatistics(battleTag)

    return (
        (statisticData.isLoading) ? (
            <Box display={"flex"} style={{justifyContent: "center"}}>
                <CircularProgress size={80}/>
            </Box>
        ) : (
            <div className="Statistic">
                <StatisticsHeader race={statisticData.statistics?.mostPlayedRace} battleTag={battleTag}/>
                <TabBar/>
                <StatisticsSwitch isLoading={statisticData.isLoading} statistics={statisticData.statistics}
                                  total={statisticData.total}/>
            </div>
        )
    )
}

export default withRouter(Statistics);
