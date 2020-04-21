import React from 'react';
import './App.css';
import {useCalculateStatistics} from "./util/CalculateStatistics";
import {Bar} from "react-chartjs-2";
import {Grid} from "@material-ui/core";
import {chartColors} from "./util/ChartColors";

function Statistics(props: any) {
    const battleTag = decodeURIComponent(props.match.params.battleTag)
    const statisticData = useCalculateStatistics(battleTag)

    let mapOptions = createMapChartOptions(statisticData)

    console.log("statisticData")
    console.log(statisticData)

    return (
        <div className="App">
            <Grid container spacing={3}>
                <Grid item sm={6}>
                    <Bar data={mapOptions.data} options={mapOptions.options}/>
                </Grid>
            </Grid>
        </div>
    );
}

function createMapChartOptions(playerMatchData: any) {
    let mapChartData = {
        keys: playerMatchData ? Array.from(playerMatchData.statistics.map.keys()) : [],
        values: playerMatchData ? Array.from(playerMatchData.statistics.map.values()) : []
    }
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

export default Statistics;
