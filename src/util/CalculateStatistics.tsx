import {Match, useFetchMatchData} from "../api/ApiUtils";
import {useEffect, useState} from "react";
import {GAMEMODE_1v1, GAMEMODE_2v2_AT, NO_GAMES_TEXT} from "../resources/AppConstants";

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
    winRate: string,
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
    winRate: string
}

export interface Statistic {
    map: Map<string, MapStatistic>,
    race: RaceStatisticList,
    host: { hosted: number, notHosted: number, hostedPercentage: string },
    avgGameTime: string,
    versus: Map<string, VersusObject>,
    mmrMap: Map<any, number>,
    mostPlayedRace: number,
    team2v2: Map<string, Team2v2Statistics>
}

interface VersusObject {
    total: number,
    win: number,
    lose: number,
    winRate: number
}

export interface StatisticDataFetch {
    isLoading: boolean,
    total: number,
    statistics: Statistic | undefined
}

export interface Team2v2Statistics {
    stats: VersusObject,
    playerNames: string[],
    rank: number,
    league: { leagueId: number, leagueOrder: number }
}

export function useCalculateStatistics(playerBattleTag: string, gateway: number) {
    const playerMatchDataResponseList = useFetchMatchData(playerBattleTag)
    const [statisticValues, setStatisticValues] = useState<StatisticDataFetch>({
        total: 0,
        isLoading: true,
        statistics: undefined
    })

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
        let gameCount = 0
        let raceStatisticList: RaceStatisticList = {
            rdm: {total: 0, won: 0, lost: 0, winRate: NO_GAMES_TEXT},
            orc: {total: 0, won: 0, lost: 0, winRate: NO_GAMES_TEXT},
            undead: {total: 0, won: 0, lost: 0, winRate: NO_GAMES_TEXT},
            elf: {total: 0, won: 0, lost: 0, winRate: NO_GAMES_TEXT},
            human: {total: 0, won: 0, lost: 0, winRate: NO_GAMES_TEXT}
        }
        let versusMap = new Map()
        let mmrMap = new Map()
        let playedRaceMap = new Map()

        const team2v2Map = new Map<string, Team2v2Statistics>()
        for (let match of matchList) {
            if (match.state === 2) {
                if (match.gateway === gateway) {
                    if (match.gameMode === GAMEMODE_1v1) {
                        let gameTime = ((match.endTime - match.startTime) / 1000) / 60
                        gameTimes += gameTime
                        gameCount += 1
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
                                winRate: NO_GAMES_TEXT,
                                raceStats: {
                                    elf: {total: 0, won: 0, lost: 0, winRate: NO_GAMES_TEXT},
                                    rdm: {total: 0, won: 0, lost: 0, winRate: NO_GAMES_TEXT},
                                    undead: {total: 0, won: 0, lost: 0, winRate: NO_GAMES_TEXT},
                                    orc: {total: 0, won: 0, lost: 0, winRate: NO_GAMES_TEXT},
                                    human: {total: 0, won: 0, lost: 0, winRate: NO_GAMES_TEXT}
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
                                        winRate: 0
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
                    } else if (match.gameMode === GAMEMODE_2v2_AT) {
                        const teamMap =
                            new Map<number, {
                                playerNames: string[], won: boolean,
                                league: { leagueId: number, leagueOrder: number }, rank: number
                            }>()
                        for (const player of match.players) {
                            let actualTeam = teamMap.get(player.team);
                            if (actualTeam) {
                                actualTeam.playerNames.push(player.battleTag)
                                actualTeam.playerNames = actualTeam.playerNames.sort()
                            } else {
                                actualTeam = {
                                    won: player.won,
                                    rank: player.ranking.rank,
                                    league: {
                                        leagueId: player.ranking.leagueId,
                                        leagueOrder: player.ranking.leagueOrder
                                    },
                                    playerNames: [player.battleTag]
                                }
                            }
                            teamMap.set(player.team, actualTeam)
                        }

                        teamMap.forEach(team => {
                            if (team.playerNames.includes(playerBattleTag)) {
                                const teamName = team.playerNames.join(' & ')
                                let savedTeam = team2v2Map.get(teamName);
                                if (savedTeam) {
                                    team.won ? savedTeam.stats.win += 1 : savedTeam.stats.lose += 1
                                    savedTeam.stats.total += 1
                                    savedTeam.stats.winRate =
                                        Number(((savedTeam.stats.win / savedTeam.stats.total) * 100).toFixed(2))
                                } else {
                                    savedTeam = {
                                        stats: {
                                            win: team.won ? 1 : 0,
                                            lose: team.won ? 0 : 1,
                                            total: 1,
                                            winRate: team.won ? 100 : 0,
                                        },
                                        playerNames: team.playerNames,
                                        rank: team.rank,
                                        league: team.league
                                    }
                                }
                                team2v2Map.set(teamName, savedTeam)
                            }
                        })
                    }
                }
            }
        }
        host.hostedPercentage = (host.hosted + host.notHosted > 0) ?
            ((host.hosted / (host.hosted + host.notHosted)) * 100).toFixed(2) + "%" : "Never"
        mapMap.forEach(mapStatistic => {
                mapStatistic.winRate =
                    mapStatistic.total > 0 ?
                        ((mapStatistic.won / mapStatistic.total) * 100).toFixed(2) + "%" : NO_GAMES_TEXT
                for (const raceStatistic of Object.values(mapStatistic.raceStats)) {
                    raceStatistic.winRate =
                        raceStatistic.total > 0 ?
                            ((raceStatistic.won / raceStatistic.total) * 100).toFixed(2) + "%" : NO_GAMES_TEXT
                }
            }
        )
        for (const raceStatistic of Object.values(raceStatisticList)) {
            raceStatistic.winRate = raceStatistic.total > 0 ?
                ((raceStatistic.won / raceStatistic.total) * 100).toFixed(2) + "%" : NO_GAMES_TEXT
        }
        versusMap.forEach(versusObject => {
            versusObject.winRate = Number(((versusObject.win / versusObject.total) * 100).toFixed(2))
        })

        const playedRaceCount: any[] = []
        playedRaceMap.forEach((value, key) => {
            playedRaceCount.push({race: key, count: value})
        })
        const mostPlayedRaceNumber = playedRaceCount.reduce((a, b) => a.count > b.count ? a : b, 0).race;

        return {
            map: mapMap,
            race: raceStatisticList,
            host: host,
            avgGameTime: (gameCount > 0) ? ((gameTimes / gameCount).toFixed(2) + " min") : 0,
            versus: versusMap,
            mmrMap: mmrMap,
            mostPlayedRace: mostPlayedRaceNumber,
            team2v2: team2v2Map
        } as Statistic
    }

    useEffect(() => {
        calculateStatisticValues();
    }, [playerMatchDataResponseList.isLoading]);
    return statisticValues
}