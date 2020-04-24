import React from 'react';
import {MapStatistic} from "../util/CalculateStatistics";
import {chartColors} from "../util/ChartColors";
import {Grid, Typography, useTheme} from "@material-ui/core";
import {Pie} from "react-chartjs-2";

function MapRace(statistic: any) {
    const theme = useTheme();

    const mapRaceWinrateCharts = createMapWinrateCharts(
        statistic.statistic ?
            (statistic.statistic.statistics ?
                statistic.statistic.statistics.map : new Map<string, MapStatistic>()) : new Map<string, MapStatistic>()
    )

    function createMapWinrateCharts(mapStatisticsList: Map<string, MapStatistic>) {
        const raceMapChartArray: any[] = []
        mapStatisticsList.forEach((mapStatistic, mapName) => {
            for (const raceStatistic of Object.entries(mapStatistic.raceStats)) {
                if (raceStatistic[1].total === 0) {
                    continue
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
                        text: "win/loss-ratio on " + mapName + " vs " + raceStatistic[0],
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
                            data: [raceStatistic[1].won, raceStatistic[1].lost]
                        }
                    ]
                };

                raceMapChartArray.push(
                    <Grid item sm={6} xs={12} style={{textAlign: "center"}}>
                        <Pie data={data} options={options}/>
                        <Typography
                            variant={"body1"}>Winrate: {((raceStatistic[1].won / raceStatistic[1].total) * 100).toFixed(2)}%</Typography>
                    </Grid>
                )
            }
        });
        return raceMapChartArray
    }

    return (
        <Grid container spacing={3}>
            {mapRaceWinrateCharts}
        </Grid>
    )
}

export default MapRace;