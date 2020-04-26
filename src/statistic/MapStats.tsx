import React from 'react';
import {MapStatistic} from "../util/CalculateStatistics";
import {chartColors} from "../util/ChartColors";
import {Grid, Typography, useTheme} from "@material-ui/core";
import {HorizontalBar, Pie} from "react-chartjs-2";

function MapStats(statistic: any) {
    const theme = useTheme();

    const mapWinRateOverviewChart = createMapWinrateOverviewChart(
        statistic.statistic ?
            (statistic.statistic.statistics ?
                statistic.statistic.statistics.map : new Map<string, MapStatistic>()) : new Map<string, MapStatistic>()
    )
    const mapWinrateCharts = createMapWinrateCharts(
        statistic.statistic ?
            (statistic.statistic.statistics ?
                statistic.statistic.statistics.map : new Map<string, MapStatistic>()) : new Map<string, MapStatistic>()
    )

    function createMapWinrateOverviewChart(mapStatisticsList: Map<string, MapStatistic>) {
        const mapChartArray: any[] = []
        const dataMap = new Map()
        mapStatisticsList.forEach((mapStatistic, mapName) => {
            dataMap.set(mapName, mapStatistic.winrate)
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
                yAxes:[{
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
            <Grid item sm={6} xs={12} key={mapChartArray.length}>
                <HorizontalBar data={data} options={options}/>
            </Grid>
        )
        mapChartArray.push(
            <Grid item sm={6} xs={12}>
            </Grid>
        )
        return mapChartArray
    }

    function createMapWinrateCharts(mapStatisticsList: Map<string, MapStatistic>) {
        const mapChartArray: any[] = []
        mapStatisticsList.forEach((mapStatistic, mapName) => {
            if (mapStatistic.total === 0) {
                return
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
                    text: "Win/lose-ratio on " + mapName,
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
                        data: [mapStatistic.won, mapStatistic.lost]
                    }
                ]
            };

            mapChartArray.push(
                <Grid item sm={6} xs={12} style={{textAlign: "center"}}>
                    <Pie data={data} options={options}/>
                    <Typography
                        variant={"body1"}>Winrate: {((mapStatistic.won / mapStatistic.total) * 100).toFixed(2)}%</Typography>
                </Grid>
            )

        });
        return mapChartArray
    }

    return (
        <Grid container spacing={3}>
            {mapWinRateOverviewChart}
            {mapWinrateCharts}
        </Grid>
    )
}

export default MapStats;