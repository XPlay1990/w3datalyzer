import {Box, Tooltip, Typography} from "@material-ui/core";
import React from "react";

import "./LeagueIcon.css"

interface Input {
    leagueId: number,
    leagueOrder: number,
    rank: number
}

export function LeagueIcon(input: Input) {

    return (
        <Box display={"flex"} flexDirection={"row"}>
            <Typography variant={"body1"}>{input.rank}.</Typography>
            <Tooltip
                title={`${getLeagueName(input.leagueOrder)}`}
            >
                <img src={`https://w3champions.com/leagues/${input.leagueOrder}.png`} alt={"League"}
                     className="LeagueIcon"
                />
            </Tooltip>
        </Box>
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