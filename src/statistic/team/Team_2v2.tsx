import React from 'react';
import {Custom2v2Table} from "../../util/CustomTable";
import {Grid} from "@material-ui/core";
import {StatisticInput} from "../Overview";
import "./Team2v2.css"

function Team2v2(statistic: StatisticInput) {

    return (
        <Grid container spacing={3}>
            <Grid item sm={12} xs={12}>
                <Custom2v2Table
                    headers={[]}
                    data={statistic.statistics ? statistic.statistics.team2v2 : new Map()}
                />
            </Grid>
        </Grid>
    )
}

export default Team2v2;
