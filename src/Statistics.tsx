import React from 'react';
import './App.css';
import {MapStatistic, useCalculateStatistics} from "./util/CalculateStatistics";
import {Bar, Pie} from "react-chartjs-2";
import {Grid} from "@material-ui/core";
import {chartColors} from "./util/ChartColors";

function Statistics(props: any) {
    const battleTag = decodeURIComponent(props.match.params.battleTag)
    const statisticData = useCalculateStatistics(battleTag)

    let mapOptions = createMapChartOptions(statisticData)
    const mapWinrateCharts = createMapWinrateCharts(statisticData ? statisticData.statistics.map : new Map<string, MapStatistic>())

    console.log("statisticData")
    console.log(statisticData)

    return (
        <div className="App">
            <Grid container spacing={3}>
                <Grid item sm={6}>
                    <Bar data={mapOptions.data} options={mapOptions.options}/>
                </Grid>
                {mapWinrateCharts}
            </Grid>
        </div>
    );
}

function createMapChartOptions(statisticData: any) {
    let mapChartData = {
        keys: statisticData ? Array.from(statisticData.statistics.map.keys()) : [],
        values: statisticData ? Array.from(statisticData.statistics.map.values()) : []
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
                label: 'MapStatistics',
                backgroundColor: chartColors('warm', mapChartData.keys.length, 'bar'),
                data: mapChartData.values
            }
        ]
    };
    const options = {
        legend: {
            display: true
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
    const chartArray: any[] = []
    mapStatisticsList.forEach((mapStatistic, mapName) => {
        console.log("entered")
        const options = {
            legend: {
                display: true
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

        chartArray.push(
            <Grid item sm={6}>
                <Pie data={data} options={options}/>
            </Grid>
        )
    });
    return chartArray
}

export default Statistics;
