import React from 'react';
import {MapStatistic, Statistic} from "../util/CalculateStatistics";
import {chartColors} from "../util/ChartColors";
import {Grid, Typography} from "@material-ui/core";
import {Pie} from "react-chartjs-2";

function MapRace(statistic: any) {
    const mapRaceWinrateCharts = createMapWinrateCharts(
        statistic.statistic ?
            (statistic.statistic.statistics ?
                statistic.statistic.statistics.map : new Map<string, MapStatistic>()) : new Map<string, MapStatistic>()
    )
    return (
        <Grid container spacing={3}>
            {mapRaceWinrateCharts}
        </Grid>
    )
}

function createMapWinrateCharts(mapStatisticsList: Map<string, MapStatistic>) {
    const raceMapChartArray: any[] = []
    mapStatisticsList.forEach((mapStatistic, mapName) => {
        for (const raceStatistic of Object.entries(mapStatistic.raceStats)) {
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
                    text: mapName + " vs " + raceStatistic[0]
                }
            }
            const data = {
                labels: ['won', 'lost'],
                datasets: [
                    {
                        label: 'MapStatistics',
                        backgroundColor: chartColors('warm', 2, 'pie'),
                        data: [raceStatistic[1].won, raceStatistic[1].lost]
                    }
                ]
            };

            raceMapChartArray.push(
                <Grid item sm={6}>
                    <Pie data={data} options={options}/>
                    <Typography
                        variant={"h6"}>Winrate: {((raceStatistic[1].won / raceStatistic[1].total) * 100).toFixed(2)}%</Typography>
                </Grid>
            )
        }
    });
    return raceMapChartArray
}

export default MapRace;