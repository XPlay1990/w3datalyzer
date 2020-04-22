import React from 'react';
import CustomTable from "../util/CustomTable";
import {MapStatistic, Statistic} from "../util/CalculateStatistics";
import {chartColors} from "../util/ChartColors";
import {Grid} from "@material-ui/core";
import {Bar} from "react-chartjs-2";

function Overview(statistic: any) {
    const headers = ['stat', 'value']
    const data: any[] = []
    const rowAccessors = ['test']

    const mapOptions = createMapChartOptions(statistic.statistic)

    return (
        <Grid container spacing={3}>
            <Grid item sm={6}>
                <Bar data={mapOptions.data} options={mapOptions.options}/>
            </Grid>
            <Grid item sm={6}>
                <CustomTable headers={headers} data={data} rowAccessors={rowAccessors}/>
            </Grid>
        </Grid>
    )
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

function createOverviewTableData(statisticData: any){

}

export default Overview;
