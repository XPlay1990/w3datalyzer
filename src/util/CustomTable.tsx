import React from 'react';
import {
    Box,
    Link,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    withStyles
} from '@material-ui/core';
import {APP_PATH_STATISTICS_OVERVIEW, DEFAULT_GATEWAY, STORAGE_GATEWAY} from "../resources/AppConstants";
import {MapStatistic, RaceStatisticList, Team2v2Statistics} from "./CalculateStatistics";
import {LeagueIcon} from "./LeagueIcon";

interface CustomPairTableProps {
    headers: string[],
    data: any[],
    rowAccessors: string[],
    linkAccessor?: string
}

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },
}))(TableRow);


function CustomPairTable(customTableProps: CustomPairTableProps) {

    const headerCells = []
    for (const header of customTableProps.headers) {
        headerCells.push(<StyledTableCell key={header}>{header}</StyledTableCell>)
    }

    function resolve(path: string, obj: any) {
        return path.split('.').reduce(function (prev, curr) {
            return prev ? prev[curr] : null
        }, obj)
    }

    return (
        <TableContainer component={Paper} style={{margin: "20px"}}>
            <Table size="small" aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {headerCells}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        customTableProps.data ? (
                            customTableProps.data.map(function (row, index) {
                                return (
                                    <StyledTableRow key={index}>
                                        {customTableProps.rowAccessors.map((accessor, index) =>
                                            <StyledTableCell align="right" key={index}>
                                                {
                                                    (customTableProps.linkAccessor && resolve(customTableProps.linkAccessor, row)) ?
                                                        (<Link
                                                            href={"http://" + resolve(customTableProps.linkAccessor, row)}
                                                            target="_blank" rel="noopener noreferrer">
                                                            {resolve(accessor, row)}
                                                        </Link>)
                                                        :
                                                        (resolve(accessor, row))
                                                }
                                            </StyledTableCell>
                                        )}
                                    </StyledTableRow>
                                )
                            })
                        ) : null
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default CustomTable;

interface CustomTableProps {
    headers: string[],
    data: Map<string, any>,
}

export function CustomTable(customTableProps: CustomTableProps) {

    const headerCells = []
    for (const header of customTableProps.headers) {
        headerCells.push(<StyledTableCell key={header}>{header}</StyledTableCell>)
    }

    function createRows() {
        const rows: any[] = []
        if (!customTableProps.data) {
            return null
        }
        customTableProps.data.forEach(function (value, key) {
                rows.push(
                    <StyledTableRow key={rows.length}>
                        <StyledTableCell>
                            {key}
                        </StyledTableCell>
                        <StyledTableCell>
                            {value}
                        </StyledTableCell>
                    </StyledTableRow>
                )
            }
        )
        return rows
    }


    return (
        <TableContainer component={Paper} style={{margin: "20px"}}>
            <Table size="small" aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {headerCells}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        createRows()
                    }
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export function CustomVersusTable(customTableProps: CustomTableProps) {
    const headerCells = []
    for (const header of customTableProps.headers) {
        headerCells.push(<StyledTableCell key={header}>{header}</StyledTableCell>)
    }

    function createRows() {
        const rows: any[] = []
        if (!customTableProps.data) {
            return null
        }
        customTableProps.data.forEach(function (value, key) {
                let valueCells: any[] = []
                Object.entries(value).forEach(
                    objectValue => {
                        valueCells.push(
                            <StyledTableCell key={valueCells.length}>
                                {objectValue[1] as string}
                            </StyledTableCell>)
                    }
                )
                rows.push(
                    <StyledTableRow key={rows.length}>
                        <StyledTableCell>
                            <Link href={`${APP_PATH_STATISTICS_OVERVIEW(encodeURIComponent(key),
                                localStorage.getItem(STORAGE_GATEWAY) || DEFAULT_GATEWAY)}`}>
                                {key}
                            </Link>
                        </StyledTableCell>
                        {valueCells}
                    </StyledTableRow>
                )
            }
        )
        return rows
    }


    return (
        <TableContainer component={Paper} style={{margin: "20px"}}>
            <Table size="small" aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {headerCells}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        createRows()
                    }
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export function Custom2v2Table(customTableProps: CustomTableProps) {

    function createRows() {
        const rows: any[] = []
        if (!customTableProps.data) {
            return null
        }
        customTableProps.data.forEach((teamStatistic: Team2v2Statistics) => {

            const playerNameCells = []
            for (const playerName of teamStatistic.playerNames) {
                playerNameCells.push(
                    <StyledTableCell key={playerNameCells.length}>
                        <Link
                            href={`${APP_PATH_STATISTICS_OVERVIEW(encodeURIComponent(playerName),
                                localStorage.getItem(STORAGE_GATEWAY) || DEFAULT_GATEWAY)}`}>
                            {playerName}
                        </Link>
                    </StyledTableCell>
                )
            }
            const statsCells: any[] = []
            statsCells.push(
                <StyledTableCell>{teamStatistic.stats.total}</StyledTableCell>
            )
            statsCells.push(
                <StyledTableCell>{teamStatistic.stats.win}</StyledTableCell>
            )
            statsCells.push(
                <StyledTableCell>{teamStatistic.stats.lose}</StyledTableCell>
            )
            statsCells.push(
                <StyledTableCell>{teamStatistic.stats.winRate}</StyledTableCell>
            )
            if (teamStatistic.rank === -1) {
                statsCells.push(
                    <StyledTableCell>unranked</StyledTableCell>
                )
            } else {
                statsCells.push(
                    <StyledTableCell>
                        <Box display={"flex"} flexDirection={"row"} style={{
                            justifyContent: "flex-start", alignContent: "center",
                            alignItems: "center", textAlign: "center", marginTop: "auto", marginBottom: "auto"
                        }}>
                            <LeagueIcon
                                leagueId={teamStatistic.league.leagueId}
                                leagueOrder={teamStatistic.league.leagueOrder}
                                rank={teamStatistic.rank}
                            />
                        </Box>
                    </StyledTableCell>
                )
            }
            rows.push(
                <StyledTableRow>
                    {playerNameCells}
                    {statsCells}
                </StyledTableRow>
            )
        })
        return rows
    }

    return (
        <TableContainer component={Paper} style={{margin: "20px"}}>
            <Table size="small" aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="center" colSpan={2}>
                            Team
                        </StyledTableCell>
                        <StyledTableCell>
                            total
                        </StyledTableCell>
                        <StyledTableCell>
                            won
                        </StyledTableCell>
                        <StyledTableCell>
                            lost
                        </StyledTableCell>
                        <StyledTableCell>
                            winrate
                        </StyledTableCell>
                        <StyledTableCell>
                            rank
                        </StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        createRows()
                    }
                </TableBody>
            </Table>
        </TableContainer>
    )
}

interface CustomRaceTableProps {
    headers: string[],
    data: RaceStatisticList
}

export function CustomRaceTable(customTableProps: CustomRaceTableProps) {

    const headerCells = []
    for (const header of customTableProps.headers) {
        headerCells.push(<StyledTableCell key={header}>{header}</StyledTableCell>)
    }

    function createRows() {
        const rows: any[] = []
        if (!customTableProps.data) {
            return null
        }

        Object.entries(customTableProps.data).forEach(raceStatistic => {
            const cells: any[] = []
            cells.push(
                <StyledTableCell key={cells.length}>
                    {raceStatistic[0]}
                </StyledTableCell>
            )
            Object.entries(raceStatistic[1]).forEach(raceStat => {
                cells.push(
                    <StyledTableCell key={cells.length}>
                        {(raceStat[1] as string)}
                    </StyledTableCell>
                )
            })
            rows.push(
                <StyledTableRow key={rows.length}>
                    {cells}
                </StyledTableRow>
            )
        })
        return rows
    }


    return (
        <TableContainer component={Paper} style={{margin: "20px"}}>
            <Table size="small" aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {headerCells}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        createRows()
                    }
                </TableBody>
            </Table>
        </TableContainer>
    )
}


interface CustomMapTableProps {
    headers: string[],
    data: Map<string, MapStatistic>
}

export function CustomMapTable(customTableProps: CustomMapTableProps) {

    const headerCells = []
    for (const header of customTableProps.headers) {
        headerCells.push(<StyledTableCell key={header}>{header}</StyledTableCell>)
    }

    function createRows() {
        const rows: any[] = []
        if (!customTableProps.data) {
            return null
        }

        customTableProps.data.forEach((mapStatistic, map) => {
            const cells: any[] = []
            cells.push(
                <StyledTableCell key={cells.length}>
                    {map}
                </StyledTableCell>
            )
            Object.entries(mapStatistic).forEach(mapStat => {
                if (mapStat[0] !== "raceStats") {
                    cells.push(
                        <StyledTableCell key={cells.length}>
                            {(mapStat[1] as string)}
                        </StyledTableCell>
                    )
                }
            })
            rows.push(
                <StyledTableRow key={rows.length}>
                    {cells}
                </StyledTableRow>
            )
        })
        return rows
    }


    return (
        <TableContainer component={Paper} style={{margin: "20px"}}>
            <Table size="small" aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {headerCells}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        createRows()
                    }
                </TableBody>
            </Table>
        </TableContainer>
    )
}