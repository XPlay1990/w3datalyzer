import React, {useEffect, useState} from 'react';
import {withRouter} from 'react-router-dom';
import {useCalculateStatistics} from "../util/CalculateStatistics";
import './Statistic.css'
import TabBar from "../ui/Tabs";
import {Box, CircularProgress} from "@material-ui/core";
import StatisticsHeader from "./StatisticsHeader";
import StatisticsSwitch from "./StatisticsSwitch";
import {DEFAULT_GATEWAY, STORAGE_BATTLETAG} from "../resources/AppConstants";
import {useGetPlayerStats} from "../api/ApiUtils";

function Statistics(props: any) {
    const battleTag = decodeURIComponent(props.match.params.battleTag)
    const gateway = Number(decodeURIComponent(props.match.params.gateway)) || Number(DEFAULT_GATEWAY)
    const statisticData = useCalculateStatistics(battleTag,gateway)
    const playerStats = useGetPlayerStats(battleTag)

    useEffect(() => {
        localStorage.setItem(STORAGE_BATTLETAG, battleTag)
    }, [statisticData])


    return (
        (statisticData.isLoading || playerStats.isLoading) ? (
            <Box display={"flex"} style={{justifyContent: "center"}}>
                <CircularProgress size={80}/>
            </Box>
        ) : (
            <div className="Statistic">
                <StatisticsHeader
                    playerStats={playerStats.data}
                    race={statisticData.statistics?.mostPlayedRace}
                    battleTag={battleTag}
                    gateway={gateway}
                />
                <TabBar/>
                <StatisticsSwitch isLoading={statisticData.isLoading} statistics={statisticData.statistics}
                                  total={statisticData.total}/>
            </div>
        )
    )
}

export default withRouter(Statistics);
