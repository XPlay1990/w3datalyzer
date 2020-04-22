import React from 'react';
import './App.css';
import {MapStatistic, RaceStatisticList, useCalculateStatistics} from "./util/CalculateStatistics";
import {Bar, Pie} from "react-chartjs-2";
import {Grid, Paper, Typography} from "@material-ui/core";
import {chartColors} from "./util/ChartColors";

function Statistics(props: any) {
    const battleTag = decodeURIComponent(props.match.params.battleTag)
    const statisticData = useCalculateStatistics(battleTag)

    let mapOptions = createMapChartOptions(statisticData)
    const mapWinrateCharts = createMapWinrateCharts(
        statisticData ?
            (statisticData.statistics ?
                statisticData.statistics.map : new Map<string, MapStatistic>()) : new Map<string, MapStatistic>()
    )
    const raceWinrateCharts = createRaceWinrateCharts(
        statisticData ?
            (statisticData.statistics ?
                statisticData.statistics.race : null) : null
    )

    console.log("statisticData")
    console.log(statisticData)

    return (
        <div className="App">
            <Grid container spacing={3}>
                <Grid item sm={6}>
                    <Bar data={mapOptions.data} options={mapOptions.options}/>
                </Grid>
                {mapWinrateCharts.mapChartArray}
                {mapWinrateCharts.raceMapChartArray}
                {raceWinrateCharts}
            </Grid>
        </div>
    );
}

function createMapChartOptions(statisticData: any) {
    let mapChartData = {
        keys: statisticData ? (statisticData.statistics ? Array.from(statisticData.statistics.map.keys()) : []) : [],
        values: statisticData ? (statisticData.statistics ? Array.from(statisticData.statistics.map.values()) : []) : []
    }

    let totalValues = []
    for (let value of mapChartData.values) {
        totalValues.push((value as MapStatistic).total)
    }
    mapChartData.values = totalValues

    const data = {
        labels: mapChartData.keys,
        datasets: [
            {
                label: 'Maps played',
                backgroundColor: chartColors('warm', mapChartData.keys.length, 'bar'),
                data: mapChartData.values
            }
        ]
    };
    const options = {
        legend: {
            display: false
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
            text: 'Map Statistics'
        }
    }
    return {data: data, options: options}
}

interface MapEntry {
    mapName: string,
    mapStatistic: MapStatistic
}

function createMapWinrateCharts(mapStatisticsList: Map<string, MapStatistic>) {
    console.log(mapStatisticsList)
    const mapChartArray: any[] = []
    const raceMapChartArray: any[] = []
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

        console.log("data")
        console.log(data)

        mapChartArray.push(
            <Grid item sm={6}>
                <Pie data={data} options={options}/>
                <Typography
                    variant={"h6"}>Winrate: {((mapStatistic.won / mapStatistic.total) * 100).toFixed(2)}%</Typography>
            </Grid>
        )

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
    return {mapChartArray: mapChartArray, raceMapChartArray: raceMapChartArray}
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
                text: raceStat[0]
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

export default Statistics;
