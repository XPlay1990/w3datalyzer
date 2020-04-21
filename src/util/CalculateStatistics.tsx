import {Match, useFetchMatchData} from "../api/ApiUtils";
import {useEffect, useState} from "react";

interface TimesAgainstRace {
    elf: number
    human: number
    orc: number
    undead: number
}

export function useCalculateStatistics() {
    const playerMatchDataResponseList = useFetchMatchData()
    const [statisticValues, setStatisticValues] = useState()

    console.log(playerMatchDataResponseList)

    function calculateStatisticValues() {
        console.log(playerMatchDataResponseList)
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
        let mapMap = new Map()
        for (let match of matchList) {
            const slashIndex = match.map.lastIndexOf('/');
            const mapName = match.map.substring(slashIndex + 1).replace('.w3x', '');
            mapMap.set(mapName, mapMap.get(mapName) ? mapMap.get(mapName) + 1 : 1)
        }
        return {mapStatistics: mapMap}
    }

    useEffect(() => {
        calculateStatisticValues();
    }, [playerMatchDataResponseList]);
    return statisticValues
}