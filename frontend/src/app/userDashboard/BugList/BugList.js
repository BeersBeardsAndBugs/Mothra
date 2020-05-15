import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import BugReportIcon from '@material-ui/icons/BugReportRounded'
import Grid from '@material-ui/core/Grid'
import MUIDataTable from 'mui-datatables'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import { BUG } from '../../../constants'

const useStyles = makeStyles((theme) => ({
    root: {},

    listStyle: {
        color: 'black',
    },
    listText: {
        wordWrap: 'break-word',
    },
    Blocker: {
        background: '#b71c1c',
    },
    Critical: {
        background: '#e53935',
    },
    High: {
        background: '#fb8c00',
    },
    Normal: {
        background: '#fdd835',
    },
    Enhancement: {
        background: '#8bc34a',
    },

    // CSS Trick to handle Material Defect that causes horizontal overflow on Grid spacing
    // We'll use this until Google decides to fix the issue. Tho its been around for over a year...
    grid: {
        margin: theme.spacing(0),
        flexGrow: 0,
        maxWidth: `100%`,
        flexBasis: `100%`,
    },
}))

export const BugList = ({ bugs, users, userName, handleVisibleBugChange }) => {
    const { ID, PRIORITY, ASSIGNED_TO, STATUS, TITLE } = BUG
    const classes = useStyles()
    const [filterList, setFilterList] = useState([[], [], [userName], [], []])
    const [rowsSelected, setRowsSelected] = useState([])

    const getMuiTheme = () => createMuiTheme({})

    const userNames = users.response.map((user) => user.name)

    const filterIndexMap = {
        // correlates to their index in columns array
        [PRIORITY]: 1,
        [ASSIGNED_TO]: 2,
        [STATUS]: 3,
    }

    const UNASSIGNED = '<unassigned>'

    const columns = [
        {
            label: 'Id',
            name: ID,
            options: { display: false, filter: false },
        },
        {
            label: 'Priority',
            name: PRIORITY,
            options: {
                customBodyRender: (value) => (
                    <Avatar className={classes[value]}>
                        <BugReportIcon></BugReportIcon>
                    </Avatar>
                ),
                filterList: filterList[filterIndexMap[PRIORITY]],
            },
        },
        {
            label: 'Assigned',
            name: ASSIGNED_TO,
            options: {
                filterList: filterList[filterIndexMap[ASSIGNED_TO]],
                filterOptions: {
                    names: [UNASSIGNED, ...userNames],
                    logic: (value, filters) => {
                        if (filters[0] === UNASSIGNED) {
                            return !!value
                        } else if (filters[0] !== value) {
                            return true
                        }
                        return false
                    },
                },
                rowsPerPageOptions: [10],
            },
        },
        {
            label: 'Status',
            name: STATUS,
            options: {
                filterList: filterList[filterIndexMap[STATUS]],
            },
        },
        {
            label: 'Title',
            name: TITLE,
            options: { filter: false },
        },
    ]

    const onRowsSelect = (rowDataList) => {
        const prevSelBugIndex = rowsSelected[0]
        const selBugIndex = rowDataList[0].dataIndex
        if (prevSelBugIndex !== selBugIndex) {
            handleVisibleBugChange(bugs.response[selBugIndex].id)
            setRowsSelected([selBugIndex])
        }
    }

    const onFilterChange = (changedColumn, filterList, type) => {
        if (type === 'dropdown') {
            switch (changedColumn) {
                case PRIORITY:
                case ASSIGNED_TO:
                case STATUS:
                    setFilterList(filterList)
                    break
                default:
                    break
            }
        } else if (type === 'chip') {
            switch (changedColumn) {
                case PRIORITY:
                    setFilterList(
                        filterList.map((list, index) =>
                            index === filterIndexMap[PRIORITY] ? [] : list
                        )
                    )
                    break
                case ASSIGNED_TO:
                    setFilterList(
                        filterList.map((list, index) =>
                            index === filterIndexMap[ASSIGNED_TO] ? [] : list
                        )
                    )
                    break
                case STATUS:
                    setFilterList(
                        filterList.map((list, index) =>
                            index === filterIndexMap[STATUS] ? [] : list
                        )
                    )
                    break
                default:
                    break
            }
        }
    }

    const options = {
        download: false,
        print: false,
        disableToolbarSelect: true,
        selectableRows: 'single',
        selectableRowsOnClick: true,
        rowsSelected,
        onRowsSelect,
        onFilterChange,
    }

    return (
        <Grid
            container
            justify="center"
            alignItems="stretch"
            spacing={2}
            className={classes.grid}
        >
            {/* <MuiThemeProvider theme={getMuiTheme}> */}
            <MUIDataTable
                title="Bug List"
                data={bugs.response}
                columns={columns}
                options={options}
            />
            {/* </MuiThemeProvider> */}
        </Grid>
    )
}
