import React from 'react';
import {RaceStatisticList} from "../util/CalculateStatistics";
import {chartColors} from "../util/ChartColors";
import {Grid, Typography, useTheme} from "@material-ui/core";
import {HorizontalBar, Pie} from "react-chartjs-2";
import {CustomRaceTable} from "../util/CustomTable";
import {StatisticInput} from "./Overview";
import {NO_GAMES_TEXT} from "../resources/AppConstants";

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
            <Grid item md={6} xs={12} key={raceWinrateChart.length}>
                <HorizontalBar data={data} options={options}/>
            </Grid>
        )
        return raceWinrateChart
    }

    function raceAgainstChart() {
        const raceMapChartArray: any[] = []
        const raceTotalMap = new Map()
        for (const raceStatistic of Object.entries(input.statistics.race)) {
            raceTotalMap.set(raceStatistic[0], raceStatistic[1].total)
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
                text: "how often you played against each race",
                fontColor: theme.palette.text.primary
            },
            tooltips: {
                callbacks: {
                    label: function (tooltipItem: any, dataset: any) {
                        //get the concerned dataset
                        const data = dataset.datasets[tooltipItem.datasetIndex].data;
                        //calculate the total of this dataset set
                        const total = data.reduce((a: number, b: number) => a + b, 0);
                        //get the current items value
                        const currentValue = data[tooltipItem.index];
                        const label = dataset.labels[tooltipItem.index];
                        //calculate the precentage based on the total and current item, also this does a rough rounding to give a whole number
                        const percentage = total > 0 ?
                            ((currentValue / total) * 100).toFixed(2) + "%" : NO_GAMES_TEXT

                        return `${label}: ${percentage}, total: ${total}`;
                    }
                }
            }
        }
        const data = {
            labels: Array.from(raceTotalMap.keys()),
            datasets: [
                {
                    label: 'MapStatistics',
                    backgroundColor: chartColors('warm', raceTotalMap.size, 'pie'),
                    borderWidth: 0,
                    data: Array.from(raceTotalMap.values())
                }
            ]
        };

        raceMapChartArray.push(
            <Grid item md={6} xs={12} style={{textAlign: "center"}} key={raceMapChartArray.length}>
                <Pie data={data} options={options}/>
            </Grid>
        )
        return raceMapChartArray
    }

    const raceWinrateStatistic = raceWinrateChart(
        input.statistics ?
            input.statistics.race : null
    )

    const raceAgainstStatistic = raceAgainstChart()

    const headers = ['vs Race', 'total', 'win', 'lose', 'winrate']
    return (
        <Grid container spacing={3}>
            {raceAgainstStatistic}
            <Grid item md={6} xs={12}>
                <CustomRaceTable headers={headers} data={input.statistics!.race}/>
            </Grid>
            {raceWinrateStatistic}
        </Grid>
    )
}

export default Race;
