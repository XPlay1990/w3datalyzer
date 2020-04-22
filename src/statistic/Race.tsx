import React from 'react';
import {RaceStatisticList} from "../util/CalculateStatistics";
import {chartColors} from "../util/ChartColors";
import {Grid, Typography} from "@material-ui/core";
import {Pie} from "react-chartjs-2";

function Race(statistic: any) {

    const raceWinrateCharts = createRaceWinrateCharts(
        statistic.statistic ?
            (statistic.statistic.statistics ?
                statistic.statistic.statistics.race : null) : null
    )

    return (
        <Grid container spacing={3}>
            {raceWinrateCharts}
        </Grid>
    )
}

function createRaceWinrateCharts(raceStats: RaceStatisticList | null) {
    if (!raceStats) {
        return null
    }
    const raceChartArray = []
    for (const raceStat of Object.entries(raceStats)) {
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
                text: "vs " + raceStat[0]
            }
        }
        const data = {
            labels: ['won', 'lost'],
            datasets: [
                {
                    label: 'MapStatistics',
                    backgroundColor: chartColors('warm', 2, 'pie'),
                    data: [raceStat[1].won, raceStat[1].lost]
                }
            ]
        };

        raceChartArray.push(
            <Grid item sm={6}>
                <Pie data={data} options={options}/>
                <Typography
                    variant={"h6"}>Winrate: {((raceStat[1].won / raceStat[1].total) * 100).toFixed(2)}%</Typography>
            </Grid>
        )
    }
    return raceChartArray
}

export default Race;
