import React from 'react';
import {
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
import {APP_PATH_STATISTICS_OVERVIEW} from "../resources/AppConstants";

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
                                {objectValue[1] as Number}
                            </StyledTableCell>)
                    }
                )
                rows.push(
                    <StyledTableRow key={rows.length}>
                        <StyledTableCell>
                            <Link href={`${APP_PATH_STATISTICS_OVERVIEW(encodeURIComponent(key))}`}>
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