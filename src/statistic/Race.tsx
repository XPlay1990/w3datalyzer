import React from 'react';
import {RaceStatisticList} from "../util/CalculateStatistics";
import {chartColors} from "../util/ChartColors";
import {Grid, Typography, useTheme} from "@material-ui/core";
import {HorizontalBar, Pie} from "react-chartjs-2";
import {CustomRaceTable} from "../util/CustomTable";
import {StatisticInput} from "./Overview";

function Race(input: StatisticInput) {
    const theme = useTheme();

    function raceWinrateChart(raceStats: RaceStatisticList | null) {
        if (!raceStats) {
            return null
        }
        const raceWinrateChart: any[] = []
        const dataMap = new Map()
        for (const raceStatistic of Object.entries(raceStats)) {
            dataMap.set(raceStatistic[0], Number(raceStatistic[1].winRate.replace("%", "")))
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
        return raceWinrateChart
    }

    const raceWinrateStatistic = raceWinrateChart(
        input.statistics ?
            input.statistics.race : null
    )

    const headers = ['vs Race', 'total', 'win', 'lose', 'winrate']
    return (
        <Grid container spacing={3}>
            {raceWinrateStatistic}
            <Grid item sm={6} xs={12}>
                <CustomRaceTable headers={headers} data={input.statistics!.race}/>
            </Grid>
        </Grid>
    )
}

export default Race;
