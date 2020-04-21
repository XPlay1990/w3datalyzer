import React from 'react';
import './App.css';
import {useCalculateStatistics} from "./util/CalculateStatistics";
import {Bar} from "react-chartjs-2";
import {Grid} from "@material-ui/core";
import {chartColors} from "./util/ChartColors";

function App() {
    const playerMatchData = useCalculateStatistics()

    let mapOptions = createMapChartOptions(playerMatchData)


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
        keys: playerMatchData ? Array.from(playerMatchData.statistics.mapStatistics.keys()) : [],
        values: playerMatchData ? Array.from(playerMatchData.statistics.mapStatistics.values()) : []
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

export default App;
