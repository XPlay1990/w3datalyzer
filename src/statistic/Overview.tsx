import React from 'react';
import CustomTable, {CustomVersusTable} from "../util/CustomTable";
import {MapStatistic} from "../util/CalculateStatistics";
import {chartColors} from "../util/ChartColors";
import {Grid} from "@material-ui/core";
import {Bar, Line} from "react-chartjs-2";

function Overview(statistic: any) {
    const headers = ['stat', 'value']
    const versusHeaders = ['vs Player', 'total', 'win', 'lose', 'winrate']
    const dataMap = new Map()
    dataMap.set("avg game time", statistic.statistic.statistics ? statistic.statistic.statistics.avgGameTime : null)
    dataMap.set("percentage of games played as host", statistic.statistic.statistics ? (statistic.statistic.statistics.host.hostedPercentage + "%") : null)

    const mapOptions = createMapChartOptions(statistic.statistic)

    const mmrChart = createMMrChart(statistic.statistic.statistics ? statistic.statistic.statistics.mmrArray : [])

    return (
        <Grid container spacing={3}>
            <Grid item sm={6}>
                <Bar data={mapOptions.data} options={mapOptions.options}/>
            </Grid>
            <Grid item sm={6}>
                <CustomTable headers={headers} data={dataMap}/>
            </Grid>
            <Grid item sm={6}>
                <CustomVersusTable headers={versusHeaders}
                                   data={statistic.statistic.statistics ? statistic.statistic.statistics.versus : null}/>
            </Grid>
            {mmrChart}
        </Grid>
    )
}

function createMMrChart(mmrArray: Number[]) {
    const data = {
        labels: mmrArray,
        datasets: [
            {
                fill: false,
                label: 'mmr over time',
                backgroundColor: chartColors('warm', mmrArray.length, 'line'),
                data: mmrArray
            }
        ]
    };
    const options = {
        legend: {
            display: false
        },
        scales: {
            // yAxes: [{
            //     ticks: {
            //         beginAtZero: true
            //     }
            // }],
            xAxes: [{
                ticks: {
                    display: false //this will remove only the label
                }
            }]
        },
        title: {
            display: true,
            text: 'Your mmr over time'
        }
    }
    return (
        <Grid item sm={6}>
            <Line data={data} options={options}/>
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
            text: ['Map statistics', 'How often you played on map x']
        }
    }
    return {data: data, options: options}
}

function createOverviewTableData(statisticData: any) {

}

export default Overview;
