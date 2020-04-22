import React, {useState} from 'react';
import {Tab, Tabs} from "@material-ui/core";
import {useHistory} from 'react-router-dom'
import {
    APP_PATH_STATISTICS_MAP, APP_PATH_STATISTICS_MAPRACE,
    APP_PATH_STATISTICS_OVERVIEW,
    APP_PATH_STATISTICS_RACE, STORAGE_BATTLETAG
} from "../resources/AppConstants";

function TabBar(props: any) {
    const [selectedTab, setSelectedTab] = useState('overview')
    // const battleTag = decodeURIComponent(props.match.params.battleTag)
    let history = useHistory()

    const moduleMap = new Map()
    moduleMap.set('overview', APP_PATH_STATISTICS_OVERVIEW)
    moduleMap.set('map', APP_PATH_STATISTICS_MAP)
    moduleMap.set('race', APP_PATH_STATISTICS_RACE)
    moduleMap.set('maprace', APP_PATH_STATISTICS_MAPRACE)

    const tabs = []
    for (let key of Array.from(moduleMap.keys())) {
        tabs.push(<Tab key={key} value={key} label={key}/>)
    }

    return (
        <Tabs value={selectedTab} onChange={(event, newValue) => {
            setSelectedTab(newValue);
            history.push(moduleMap.get(newValue)(encodeURIComponent(localStorage.getItem(STORAGE_BATTLETAG) || '')))
        }}>
            {tabs}
        </Tabs>
    );
}

export default TabBar;
