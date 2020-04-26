import React from 'react';
import {MapStatistic, RaceStatisticList} from "../util/CalculateStatistics";
import {chartColors} from "../util/ChartColors";
import {Grid, Typography, useTheme} from "@material-ui/core";
import {HorizontalBar, Pie} from "react-chartjs-2";

function Race(statistic: any) {
    const theme = useTheme();

    function raceWinrateChart(raceStats: RaceStatisticList | null) {
        if (!raceStats) {
            return null
        }
        const raceWinrateChart: any[] = []
        const dataMap = new Map()
        for (const raceStatistic of Object.entries(raceStats)) {
            dataMap.set(raceStatistic[0], raceStatistic[1].winrate)
        }

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
                        beginAtZero: true,
                        fontColor: theme.palette.text.primary
                    }
                }],
                yAxes: [{
                    ticks: {
                        fontColor: theme.palette.text.primary
                    }
                }]
            },
            title: {
                display: true,
                text: 'Your winrate percentage against race x',
                fontColor: theme.palette.text.primary
            }
        }

        raceWinrateChart.push(
            <Grid item sm={6} xs={12} key={raceWinrateChart.length}>
                <HorizontalBar data={data} options={options}/>
            </Grid>
        )
        raceWinrateChart.push(
            <Grid item sm={6} xs={12} key={raceWinrateChart.length}>
            </Grid>
        )
        return raceWinrateChart
    }

    function createRaceWinrateCharts(raceStats: RaceStatisticList | null) {
        if (!raceStats) {
            return null
        }
        const raceChartArray = []
        for (const raceStat of Object.entries(raceStats)) {
            if (raceStat[1].total === 0) {
                continue
            }
            const options = {
                legend: {
                    display: true,
                    reverse: true,
                    labels: {
                        fontColor: theme.palette.text.primary
                    }
                },
                title: {
                    display: true,
                    text: "win/loss-ratio vs " + raceStat[0],
                    fontColor: theme.palette.text.primary
                }
            }
            const data = {
                labels: ['won', 'lost'],
                datasets: [
                    {
                        label: 'MapStatistics',
                        backgroundColor: chartColors('warm', 2, 'pie'),
                        borderWidth: 0,
                        data: [raceStat[1].won, raceStat[1].lost]
                    }
                ]
            };

            raceChartArray.push(
                <Grid item sm={6} xs={12} style={{textAlign: "center"}}>
                    <Pie data={data} options={options}/>
                    <Typography
                        variant={"body1"}>Winrate: {((raceStat[1].won / raceStat[1].total) * 100).toFixed(2)}%</Typography>
                </Grid>
            )
        }
        return raceChartArray
    }

    const raceWinrateStatistic = raceWinrateChart(
        statistic.statistic ?
            (statistic.statistic.statistics ?
                statistic.statistic.statistics.race : null) : null
    )
    const raceWinrateCharts = createRaceWinrateCharts(
        statistic.statistic ?
            (statistic.statistic.statistics ?
                statistic.statistic.statistics.race : null) : null
    )

    return (
        <Grid container spacing={3}>
            {raceWinrateStatistic}
            {raceWinrateCharts}
        </Grid>
    )
}

export default Race;
