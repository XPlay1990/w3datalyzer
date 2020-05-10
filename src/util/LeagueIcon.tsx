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
        input.leagueOrder > 0 ? (
            <Box display={"flex"} flexDirection={"column"}>

                <Tooltip
                    title={`${getLeagueName(input.leagueOrder)} ${input.leagueDivision ? `Division ${input.leagueDivision}` : ""}`}
                >
                    <img src={`https://w3champions.com/leagues/${input.leagueOrder}.png`} alt={"League"}
                         className="LeagueIcon"
                    />
                </Tooltip>
                <Typography variant={"body1"} noWrap align={"center"} style={{overflow:"visible"}}>Rank {input.rank}</Typography>
            </Box>
        ) : (
            <Box display={"flex"} flexDirection={"column"}>
                <Typography variant={"body1"} noWrap align={"center"}>unranked</Typography>
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