import {useEffect, useState} from 'react';
export interface Match {
    createdAt: Date,
    endTime: Date,
    gameMode: number, //1=1n1?
    gateway: number, //20=EU
    host: string,
    id: string,
    map: string,
    mapId: number,
    objectId: string,
    players: [{
        battleTaq: string,
        id: string,
        inviteName: string,
        mmr: Mmr,
        race: number,
        ranking: Ranking,
        updatedMmr: Mmr,
        updatedRanking: Ranking,
        won: boolean
    }],
    publicGame: boolean,
    startTime: Date,
    state: number,
    updatedAt: Date
}

interface Mmr {
    rating: number,
    rd: number,
    vol: number
}

interface Ranking {
    lastGame: number,
    leagueId: number,
    leagueOrder: number,
    progress: number,
    rank: number,
    rp: number
}

export function useFetchMatchData() {
    const playerTag = "XlorD#2596"
    const limit = 100
    const offset = 0
    const headers = new Headers()
    headers.append("Content-Type", "application/json");

    const options = {
        method: 'GET',
        mode: 'cors' as RequestMode,
        headers: headers
    }

    return useFetch(options, limit, offset, `https://api.w3champions.com/player/${encodeURIComponent(playerTag)}/match`)
}


function useFetch(options: any, limit: number, offset: number, baseUrl: string) {
    const [data, setData] = useState<any[]>([]);

    // const [loading, setLoading] = useState(true);
    async function fetchUrl() {
        options.url = `${baseUrl}?limit=${limit}&offset=${offset}`

        let matchCount = -1
        let matchData: any[] = []
        while ((matchCount === -1) || (matchCount > (offset + limit))) {
            if (matchCount !== -1) {
                offset += limit
            }
            options.url = `${baseUrl}?limit=${limit}&offset=${offset}`
            const response = await fetch(options.url, options);
            const json = await response.json();
            matchData = matchData.concat(json)
            matchCount = json.total
        }
        setData(matchData)
    }

    useEffect(() => {
        fetchUrl();
    }, []);
    // return [data, loading];
    return data;
}