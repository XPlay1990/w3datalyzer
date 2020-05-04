import React, {useEffect} from 'react';
import {withRouter} from 'react-router-dom';
import {useCalculateStatistics} from "../util/CalculateStatistics";
import './Statistic.css'
import TabBar from "../ui/Tabs";
import {Box, CircularProgress} from "@material-ui/core";
import StatisticsHeader from "./StatisticsHeader";
import StatisticsSwitch from "./StatisticsSwitch";
import {STORAGE_BATTLETAG} from "../resources/AppConstants";

function Statistics(props: any) {
    const battleTag = decodeURIComponent(props.match.params.battleTag)
    const gateway = Number(decodeURIComponent(props.match.params.gateway))
    const statisticData = useCalculateStatistics(battleTag,gateway)

    useEffect(() => {
        localStorage.setItem(STORAGE_BATTLETAG, battleTag)
    }, [statisticData])


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
