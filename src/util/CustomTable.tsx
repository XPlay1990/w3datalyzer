import React from 'react';
import {
    Paper,
    TableRow,
    TableCell,
    TableBody,
    withStyles,
    TableContainer,
    Table,
    TableHead,
    Link
} from '@material-ui/core';

interface CustomTableProps {
    headers: string[],
    data: any[],
    rowAccessors: string[],
    linkAccessor?: string
}


function CustomTable(customTableProps: CustomTableProps) {

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


    const headerCells = []
    for (var header of customTableProps.headers) {
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
