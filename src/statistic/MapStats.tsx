import React from 'react';
import {MapStatistic} from "../util/CalculateStatistics";
import {chartColors} from "../util/ChartColors";
import {Grid, Typography} from "@material-ui/core";
import {HorizontalBar, Pie} from "react-chartjs-2";

function MapStats(statistic: any) {
    const mapWinRateOverviewChart = createMapWinrateOverviewChart(
        statistic.statistic ?
            (statistic.statistic.statistics ?
                statistic.statistic.statistics.map : new Map<string, MapStatistic>()) : new Map<string, MapStatistic>()
    )
    const mapWinrateCharts = createMapWinrateCharts(
        statistic.statistic ?
            (statistic.statistic.statistics ?
                statistic.statistic.statistics.map : new Map<string, MapStatistic>()) : new Map<string, MapStatistic>()
    )

    return (
        <Grid container spacing={3}>
            {mapWinRateOverviewChart}
            {mapWinrateCharts}
        </Grid>
    )
}

function createMapWinrateOverviewChart(mapStatisticsList: Map<string, MapStatistic>) {
    const mapChartArray: any[] = []
    const dataMap = new Map()
    mapStatisticsList.forEach((mapStatistic, mapName) => {
        dataMap.set(mapName, mapStatistic.winrate)
    });

    console.log(dataMap)
    const data = {
        labels: Array.from(dataMap.keys()),
        datasets: [
            {
                label: 'winpercentage',
                backgroundColor: chartColors('warm', dataMap.size, 'bar'),
                data: Array.from(dataMap.values())
            }
        ]
    };
    const options = {
        legend: {
            display: false
        },
        scales: {
            xAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        },
        title: {
            display: true,
            text: 'Map Winrate'
        }
    }

    mapChartArray.push(
        <Grid item sm={6}>
            <HorizontalBar data={data} options={options}/>
        </Grid>
    )
    mapChartArray.push(
        <Grid item sm={6}>
        </Grid>
    )
    return mapChartArray
}

function createMapWinrateCharts(mapStatisticsList: Map<string, MapStatistic>) {
    console.log(mapStatisticsList)
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