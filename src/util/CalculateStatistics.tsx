import {Match, useFetchMatchData} from "../api/ApiUtils";
import {useEffect, useState} from "react";

interface TimesAgainstRace {
    elf: number
    human: number
    orc: number
    undead: number
}

interface MapStatistic {
    total: number,
    won: number,
    lost: number,
    raceStats: RaceStatistic
}

interface RaceStatisticList {
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

export function useCalculateStatistics(playerBattleTag: string) {
    const playerMatchDataResponseList = useFetchMatchData(playerBattleTag)
    const [statisticValues, setStatisticValues] = useState()

    function calculateStatisticValues() {
        if (playerMatchDataResponseList.length > 0) {
            let playerMatchList: Match[] = []
            const totalGames = playerMatchDataResponseList[0].total
            for (let response of playerMatchDataResponseList) {
                playerMatchList = playerMatchList.concat(response.items)
            }

            let statistics = calculateMatchStatistics(playerMatchList)

            setStatisticValues({total: totalGames, statistics: statistics})
        }
    }

    function calculateMatchStatistics(matchList: Match[]) {
        let host = {hosted: 0, notHosted: 0}
        let mapMap = new Map()
        let gameTimes = 0
        for (let match of matchList) {
            if (match.state === 2) {
                let gameTime = ((match.endTime - match.startTime) / 1000) / 60
                gameTimes += gameTime
                //MapStats
                const slashIndex = match.map.lastIndexOf('/');
                const mapName = match.map.substring(slashIndex + 1).replace('.w3x', '');
                mapMap.set(mapName, mapMap.get(mapName) ? mapMap.get(mapName) + 1 : 1)

                //RaceStats
                for (const player of match.players) {
                    if (player.battleTaq !== playerBattleTag) {
                        // player.battleTaq
                        switch (player.race) {
                            case 0:
                                //rdm
                                break;
                            case 1:
                                //human
                                break;
                            case 2:
                                //orc
                                break;
                            case 4:
                                //elf
                                break;
                            case 8: //wtf pad
                                //undead
                                break
                        }
                        // player.won
                    }
                }

                //Hosted Stats
                (match.host === playerBattleTag) ? host.hosted = host.hosted + 1 : host.notHosted = host.notHosted + 1
            }
        }
        return {map: mapMap, race: null, host: host, avgGameTime: (gameTimes / matchList.length)}
    }

    useEffect(() => {
        calculateStatisticValues();
    }, [playerMatchDataResponseList]);
    return statisticValues
}