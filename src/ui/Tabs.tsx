import React, {useState} from 'react';
import {Tab, Tabs} from "@material-ui/core";
import {useHistory} from 'react-router-dom'
import {APP_PATH_STATISTICS, APP_PATH_STATISTICS_OVERVIEW} from "../resources/AppConstants";

function TabBar() {
    const [selectedTab, setSelectedTab] = useState('overview')
    let history = useHistory()

    const moduleMap = new Map()
    moduleMap.set('overview', APP_PATH_STATISTICS_OVERVIEW)
    moduleMap.set('map', APP_PATH_STATISTICS_OVERVIEW)
    moduleMap.set('race', APP_PATH_STATISTICS_OVERVIEW)
    moduleMap.set('racemap', APP_PATH_STATISTICS_OVERVIEW)
    moduleMap.set('racemap', APP_PATH_STATISTICS_OVERVIEW)

    const tabs = []
    for (let key of Array.from(moduleMap.keys())) {
        tabs.push(<Tab key={key} value={key} label={key}/>)
    }

    return (
        <Tabs value={selectedTab} onChange={(event, newValue) => {
            setSelectedTab(newValue);
            history.push(moduleMap.get(newValue))
        }}>
            {tabs}
        </Tabs>
    );
}

export default TabBar;
