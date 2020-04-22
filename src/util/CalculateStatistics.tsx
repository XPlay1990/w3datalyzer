import {Match, useFetchMatchData} from "../api/ApiUtils";
import {useEffect, useState} from "react";

interface TimesAgainstRace {
    elf: number
    human: number
    orc: number
    undead: number
}

export interface MapStatistic {
    total: number,
    won: number,
    lost: number,
    raceStats: RaceStatisticList
}

export interface RaceStatisticList {
    rdm: RaceStatistic,
    human: RaceStatistic,
    elf: RaceStatistic,
    orc: RaceStatistic,
    undead: RaceStatistic
}

interface RaceStatistic {
    won: number,
    lost: number,
    total: number
}

export interface Statistic {
    map: Map<string, MapStatistic>,
    race: RaceStatisticList,
    host: { hosted: number, notHosted: number },
    avgGameTime: number
}

export interface Output {
    total: number,
    statistics: Statistic | undefined
}

export function useCalculateStatistics(playerBattleTag: string) {
    const playerMatchDataResponseList = useFetchMatchData(playerBattleTag)
    const [statisticValues, setStatisticValues] = useState<Output>({total: 0, statistics: undefined})

    function calculateStatisticValues() {
        if (playerMatchDataResponseList.length > 0) {
            let playerMatchList: Match[] = []
            const totalGames = playerMatchDataResponseList[0].total as number
            for (let response of playerMatchDataResponseList) {
                playerMatchList = playerMatchList.concat(response.items)
            }

            let statistics = calculateMatchStatistics(playerMatchList)

            setStatisticValues({total: totalGames, statistics: statistics})
        }
    }

    function calculateMatchStatistics(matchList: Match[]) {
        let host = {hosted: 0, notHosted: 0}
        let mapMap = new Map<string, MapStatistic>()
        let gameTimes = 0
        let raceStatistic: RaceStatisticList = {
            rdm: {total: 0, won: 0, lost: 0},
            orc: {total: 0, won: 0, lost: 0},
            undead: {total: 0, won: 0, lost: 0},
            elf: {total: 0, won: 0, lost: 0},
            human: {total: 0, won: 0, lost: 0}
        }
        for (let match of matchList) {
            if (match.state === 2) {
                let gameTime = ((match.endTime - match.startTime) / 1000) / 60
                gameTimes += gameTime
                //MapStats
                const slashIndex = match.map.lastIndexOf('/');
                const mapName = match.map.substring(slashIndex + 1).replace('.w3x', '');
                // mapMap.set(mapName, mapMap.get(mapName) ? mapMap.get(mapName) + 1 : 1)
                let mapStatistic = mapMap.get(mapName)
                if (!mapStatistic) {
                    mapStatistic = {
                        total: 0,
                        won: 0,
                        lost: 0,
                        raceStats: {
                            elf: {total: 0, won: 0, lost: 0},
                            rdm: {total: 0, won: 0, lost: 0},
                            undead: {total: 0, won: 0, lost: 0},
                            orc: {total: 0, won: 0, lost: 0},
                            human: {total: 0, won: 0, lost: 0}
                        }
                    }
                }

                mapStatistic.total += 1

                //RaceStats
                for (const player of match.players) {
                    if (player.battleTag.toLowerCase() !== playerBattleTag.toLowerCase()) {
                        player.won ? mapStatistic.lost += 1 : mapStatistic.won += 1
                        switch (player.race) {
                            case 0:
                                //rdm
                                raceStatistic.rdm.total += 1
                                player.won ? raceStatistic.rdm.lost += 1 : raceStatistic.rdm.won += 1
                                mapStatistic.raceStats.rdm.total += 1
                                player.won ? mapStatistic.raceStats.rdm.lost += 1 : mapStatistic.raceStats.rdm.won += 1
                                break;
                            case 1:
                                //human
                                raceStatistic.human.total += 1
                                player.won ? raceStatistic.human.lost += 1 : raceStatistic.human.won += 1
                                mapStatistic.raceStats.human.total += 1
                                player.won ? mapStatistic.raceStats.human.lost += 1 : mapStatistic.raceStats.human.won += 1
                                break;
                            case 2:
                                //orc
                                raceStatistic.orc.total += 1
                                player.won ? raceStatistic.orc.lost += 1 : raceStatistic.orc.won += 1
                                mapStatistic.raceStats.orc.total += 1
                                player.won ? mapStatistic.raceStats.orc.lost += 1 : mapStatistic.raceStats.orc.won += 1
                                break;
                            case 4:
                                //elf
                                raceStatistic.elf.total += 1
                                player.won ? raceStatistic.elf.lost += 1 : raceStatistic.elf.won += 1
                                mapStatistic.raceStats.elf.total += 1
                                player.won ? mapStatistic.raceStats.elf.lost += 1 : mapStatistic.raceStats.elf.won += 1
                                break;
                            case 8: //wtf pad
                                //undead
                                raceStatistic.undead.total += 1
                                player.won ? raceStatistic.undead.lost += 1 : raceStatistic.undead.won += 1
                                mapStatistic.raceStats.undead.total += 1
                                player.won ? mapStatistic.raceStats.undead.lost += 1 : mapStatistic.raceStats.undead.won += 1
                                break
                        }
                        // player.won
                    }
                }

                //Hosted Stats
                (match.host === playerBattleTag) ? host.hosted = host.hosted + 1 : host.notHosted = host.notHosted + 1
                mapMap.set(mapName, mapStatistic)
            }
        }
        return {map: mapMap, race: raceStatistic, host: host, avgGameTime: (gameTimes / matchList.length)} as Statistic
    }

    useEffect(() => {
        calculateStatisticValues();
    }, [playerMatchDataResponseList]);
    return statisticValues
}