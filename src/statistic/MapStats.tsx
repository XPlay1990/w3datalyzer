import React from 'react';
import {MapStatistic} from "../util/CalculateStatistics";
import {chartColors} from "../util/ChartColors";
import {Grid, Typography} from "@material-ui/core";
import {Pie} from "react-chartjs-2";

function MapStats(statistic: any) {
    const mapWinrateCharts = createMapWinrateCharts(
        statistic.statistic ?
            (statistic.statistic.statistics ?
                statistic.statistic.statistics.map : new Map<string, MapStatistic>()) : new Map<string, MapStatistic>()
    )

    return (
        <Grid container spacing={3}>
            {mapWinrateCharts}
        </Grid>
    )
}

function createMapWinrateCharts(mapStatisticsList: Map<string, MapStatistic>) {
    const mapChartArray: any[] = []
    mapStatisticsList.forEach((mapStatistic, mapName) => {
        const options = {
            legend: {
                display: true,
                reverse: true
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            },
            title: {
                display: true,
                text: mapName
            }
        }
        const data = {
            labels: ['won', 'lost'],
            datasets: [
                {
                    label: 'MapStatistics',
                    backgroundColor: chartColors('warm', 2, 'pie'),
                    data: [mapStatistic.won, mapStatistic.lost]
                }
            ]
        };

        mapChartArray.push(
            <Grid item sm={6}>
                <Pie data={data} options={options}/>
                <Typography
                    variant={"h6"}>Winrate: {((mapStatistic.won / mapStatistic.total) * 100).toFixed(2)}%</Typography>
            </Grid>
        )

    });
    return mapChartArray
}

export default MapStats;