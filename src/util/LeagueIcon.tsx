import {Box, Tooltip, Typography} from "@material-ui/core";
import React from "react";

import "./LeagueIcon.css"

interface Input {
    leagueOrder: number,
    leagueDivision?: number,
    rank: number
}

export function LeagueIcon(input: Input) {
    return (
        input.rank !== 0 ? (
            <Box display={"flex"} flexDirection={"column"} style={{height:"100px"}}>
                <Tooltip
                    title={`${getLeagueName(input.leagueOrder)} ${input.leagueDivision ? `Division ${input.leagueDivision}` : ""}`}
                >
                    <img src={getLeagueIconUrl(input.leagueOrder)} alt={"League"}
                         className="LeagueIcon"
                    />
                </Tooltip>
                <Typography variant={"body1"} noWrap align={"center"}
                            style={{overflow: "visible", wordBreak:"break-word"}}>Rank {input.rank}</Typography>
            </Box>
        ) : (
            <Box display={"flex"} flexDirection={"column"}>
                <Typography variant={"body1"} noWrap align={"center"}
                            style={{overflow: "visible"}}>unranked</Typography>
            </Box>
        )
    )
}

export function getLeagueName(league: number) {
    switch (league) {
        case 0:
            return "Grand Master"
        case 1:
            return "Master"
        case 2:
            return "Diamond"
        case 3:
            return "Platinum"
        case 4:
            return "Gold"
        case 5:
            return "Silver"
        case 6:
            return "Bronze"
        default:
            return "unranked"
    }
}

function getLeagueIconUrl(league: number) {
    switch (league) {
        case 0:
            return "https://www.w3champions.com/img/grandmaster.9613f56f.png"
        case 1:
            return "https://www.w3champions.com/img/master.4ddcd330.png"
        case 2:
            return "https://www.w3champions.com/img/diamond.86df1d96.png"
        case 3:
            return "https://www.w3champions.com/img/platinum.24bc49fa.png"
        case 4:
            return "https://www.w3champions.com/img/gold.fe8039cf.png"
        case 5:
            return "https://www.w3champions.com/img/silver.0c6ea3fc.png"
        case 6:
            return "https://www.w3champions.com/img/bronze.ce21aafe.png"
        default:
            return "https://www.w3champions.com/img/unranked.c8b435f5.png"
    }
}