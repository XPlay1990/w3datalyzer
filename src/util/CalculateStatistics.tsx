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
    winrate: number,
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
    total: number,
    winrate: number
}

export interface Statistic {
    map: Map<string, MapStatistic>,
    race: RaceStatisticList,
    host: { hosted: number, notHosted: number, hostedPercentage: string },
    avgGameTime: string,
    versus: Map<string, VersusObject>,
    mmrMap: Map<any, number>,
    mostPlayedRace: number
}

interface VersusObject {
    total: number,
    win: number,
    lose: number,
    winrate: number
}

export interface Output {
    isLoading: boolean,
    total: number,
    statistics: Statistic | undefined
}

export function useCalculateStatistics(playerBattleTag: string) {
    const playerMatchDataResponseList = useFetchMatchData(playerBattleTag)
    const [statisticValues, setStatisticValues] = useState<Output>({total: 0, isLoading: true, statistics: undefined})

    function calculateStatisticValues() {
        if (!(playerMatchDataResponseList.isLoading) && playerMatchDataResponseList.data.length > 0) {
            let playerMatchList: Match[] = []
            const totalGames = playerMatchDataResponseList.data[0].total as number
            for (let response of playerMatchDataResponseList.data) {
                playerMatchList = playerMatchList.concat(response.items)
            }

            let statistics = calculateMatchStatistics(playerMatchList)

            setStatisticValues({
                total: totalGames,
                statistics: statistics,
                isLoading: playerMatchDataResponseList.isLoading
            })
        }
    }

    function calculateMatchStatistics(matchList: Match[]) {
        let host = {hosted: 0, notHosted: 0, hostedPercentage: ""}
        let mapMap = new Map<string, MapStatistic>()
        let gameTimes = 0
        let raceStatisticList: RaceStatisticList = {
            rdm: {total: 0, won: 0, lost: 0, winrate: 0},
            orc: {total: 0, won: 0, lost: 0, winrate: 0},
            undead: {total: 0, won: 0, lost: 0, winrate: 0},
            elf: {total: 0, won: 0, lost: 0, winrate: 0},
            human: {total: 0, won: 0, lost: 0, winrate: 0}
        }
        let versusMap = new Map()
        let mmrMap = new Map()
        let playedRaceMap = new Map()
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
                        winrate: 0,
                        raceStats: {
                            elf: {total: 0, won: 0, lost: 0, winrate: 0},
                            rdm: {total: 0, won: 0, lost: 0, winrate: 0},
                            undead: {total: 0, won: 0, lost: 0, winrate: 0},
                            orc: {total: 0, won: 0, lost: 0, winrate: 0},
                            human: {total: 0, won: 0, lost: 0, winrate: 0}
                        }
                    }
                }

                mapStatistic.total += 1

                //RaceStats
                for (const player of match.players) {
                    if (player.battleTag.toLowerCase() !== playerBattleTag.toLowerCase()) {
                        player.won ? mapStatistic.lost += 1 : mapStatistic.won += 1

                        let versusObject: VersusObject = versusMap.get(player.battleTag)
                        if (!versusObject) {
                            versusObject = {
                                total: 0,
                                win: 0,
                                lose: 0,
                                winrate: 0
                            }
                        }
                        versusObject.total += 1
                        if (player.won) {
                            versusObject.lose += 1
                        } else {
                            versusObject.win += 1
                        }
                        versusMap.set(player.battleTag, versusObject)

                        switch (player.race) {
                            case 0:
                                //rdm
                                raceStatisticList.rdm.total += 1
                                player.won ? raceStatisticList.rdm.lost += 1 : raceStatisticList.rdm.won += 1
                                mapStatistic.raceStats.rdm.total += 1
                                player.won ? mapStatistic.raceStats.rdm.lost += 1 : mapStatistic.raceStats.rdm.won += 1
                                break;
                            case 1:
                                //human
                                raceStatisticList.human.total += 1
                                player.won ? raceStatisticList.human.lost += 1 : raceStatisticList.human.won += 1
                                mapStatistic.raceStats.human.total += 1
                                player.won ? mapStatistic.raceStats.human.lost += 1 : mapStatistic.raceStats.human.won += 1
                                break;
                            case 2:
                                //orc
                                raceStatisticList.orc.total += 1
                                player.won ? raceStatisticList.orc.lost += 1 : raceStatisticList.orc.won += 1
                                mapStatistic.raceStats.orc.total += 1
                                player.won ? mapStatistic.raceStats.orc.lost += 1 : mapStatistic.raceStats.orc.won += 1
                                break;
                            case 4:
                                //elf
                                raceStatisticList.elf.total += 1
                                player.won ? raceStatisticList.elf.lost += 1 : raceStatisticList.elf.won += 1
                                mapStatistic.raceStats.elf.total += 1
                                player.won ? mapStatistic.raceStats.elf.lost += 1 : mapStatistic.raceStats.elf.won += 1
                                break;
                            case 8: //wtf pad
                                //undead
                                raceStatisticList.undead.total += 1
                                player.won ? raceStatisticList.undead.lost += 1 : raceStatisticList.undead.won += 1
                                mapStatistic.raceStats.undead.total += 1
                                player.won ? mapStatistic.raceStats.undead.lost += 1 : mapStatistic.raceStats.undead.won += 1
                                break
                        }
                        // player.won
                    } else {
                        // searched player
                        mmrMap.set(new Date(match.endTime), Math.round(player.updatedMmr.rating))
                        let oldValue = playedRaceMap.get(player.race)
                        playedRaceMap.set(player.race, (oldValue ? (oldValue + 1) : 1))
                    }
                }

                //Hosted Stats
                (match.host === playerBattleTag) ? host.hosted = host.hosted + 1 : host.notHosted = host.notHosted + 1
                mapMap.set(mapName, mapStatistic)
            }
        }
        host.hostedPercentage = ((host.hosted / (host.hosted + host.notHosted)) * 100).toFixed(2)
        mapMap.forEach(mapStatistic => {
                mapStatistic.winrate = Number(((mapStatistic.won / mapStatistic.total) * 100).toFixed(2))
                //ToDo: fill racestats inside map
                for (const raceStatistic of Object.values(mapStatistic.raceStats)) {
                    raceStatistic.winrate = Number(((raceStatistic.won / raceStatistic.total) * 100).toFixed(2))
                }
            }
        )
        for (const raceStatistic of Object.values(raceStatisticList)) {
            raceStatistic.winrate = Number(((raceStatistic.won / raceStatistic.total) * 100).toFixed(2))
        }
        versusMap.forEach(versusObject => {
            versusObject.winrate = Number(((versusObject.win / versusObject.total) * 100).toFixed(2))
        })

        const playedRaceCount: any[] = []
        playedRaceMap.forEach((value, key) => {
            playedRaceCount.push({race: key, count: value})
        })
        const mostPlayedRaceNumber = playedRaceCount.reduce((a, b) => a.count > b.count ? a : b).race;

        return {
            map: mapMap,
            race: raceStatisticList,
            host: host,
            avgGameTime: ((gameTimes / matchList.length).toFixed(2) + " min"),
            versus: versusMap,
            mmrMap: mmrMap,
            mostPlayedRace: mostPlayedRaceNumber
        } as Statistic
    }

    useEffect(() => {
        calculateStatisticValues();
    }, [playerMatchDataResponseList.isLoading]);
    return statisticValues
}