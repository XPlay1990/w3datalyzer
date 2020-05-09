import React from 'react';
import {MapStatistic} from "../util/CalculateStatistics";
import {chartColors} from "../util/ChartColors";
import {Grid, useTheme} from "@material-ui/core";
import {HorizontalBar} from "react-chartjs-2";
import {StatisticInput} from "./Overview";
import {CustomMapTable} from "../util/CustomTable";

function MapStats(input: StatisticInput) {
    const theme = useTheme();

    const mapWinRateOverviewChart = createMapWinrateOverviewChart(
        input.statistics.map
    )

    function createMapWinrateOverviewChart(mapStatisticsList: Map<string, MapStatistic>) {
        const mapChartArray: any[] = []
        const dataMap = new Map()
        mapStatisticsList.forEach((mapStatistic, mapName) => {
            dataMap.set(mapName, Number(mapStatistic.winRate.replace("%", "")))
        });

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
                    },
                }],
            },
            title: {
                display: true,
                text: "Your winrate percentage on maps",
                fontColor: theme.palette.text.primary
            }
        }

        mapChartArray.push(
            <Grid item md={6} xs={12} key={mapChartArray.length}>
                <HorizontalBar data={data} options={options}/>
            </Grid>
        )
        return mapChartArray
    }

    const headers = ['on Map', 'total', 'win', 'lose', 'winrate']
    return (
        <Grid container spacing={3}>
            {mapWinRateOverviewChart}
            <Grid item md={6} xs={12}>
                <CustomMapTable headers={headers} data={input.statistics.map}/>
            </Grid>
        </Grid>
    )
}

export default MapStats;