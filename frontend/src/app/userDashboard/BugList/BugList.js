import React, { useRef, useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Avatar from '@material-ui/core/Avatar'
import BugReportIcon from '@material-ui/icons/BugReportRounded'
import Grid from '@material-ui/core/Grid'
import { BUG } from '../../../constants'

const useStyles = makeStyles((theme) => ({
    root: {},

    listStyle: {
        color: 'black',
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
}))

export const BugList = ({ bugs, userName, handleVisibleBugChange }) => {
    const myBugsBtn = useRef(null)

    const [filteredList, setFilteredList] = useState([])

    const classes = useStyles()

    function filterBugs(assigned_to, forOwner) {
        let filtered = []

        if (forOwner) {
            filtered = bugs.response.filter((bug) => {
                return bug[BUG.ASSIGNED_TO] === assigned_to
            })
        } else {
            filtered = bugs.response.filter((bug) => {
                return bug[BUG.ASSIGNED_TO] !== assigned_to
            })
        }

        console.log(filtered)
        setFilteredList(filtered)
    }

    return (
        <Grid container spacing={1} justify="center" alignItems="stretch">
            <Grid item xs={12} sm={12}>
                <ButtonGroup fullWidth>
                    <Button
                        color="secondary"
                        variant="contained"
                        ref={myBugsBtn}
                        onClick={() => filterBugs(userName, true)}
                    >
                        Assigned Bugs
                    </Button>
                    <Button
                        color="secondary"
                        variant="contained"
                        onClick={() => filterBugs(userName, false)}
                    >
                        Other Bugs
                    </Button>
                </ButtonGroup>
            </Grid>
            <Grid item xs={12} sm={12}>
                <List className={classes.listStyle}>
                    {filteredList.map((bug, i) => (
                        <ListItem
                            key={i}
                            button
                            onClick={() => handleVisibleBugChange(bug[BUG.ID])}
                        >
                            <ListItemAvatar>
                                <Avatar className={classes[bug[BUG.PRIORITY]]}>
                                    <BugReportIcon></BugReportIcon>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={bug[BUG.DESCRIPTION]}
                                secondary={
                                    bug[BUG.ASSIGNED_TO]
                                        ? `${bug[BUG.ASSIGNED_TO]}`
                                        : 'No Owner'
                                }
                            />
                            <ListItemSecondaryAction>
                                {/*
                  Keeping this here in case we want to include something in future

                  <IconButton edge="end" aria-label="delete">
                    <DeleteIcon />
                  </IconButton>

                */}
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                </List>
            </Grid>
        </Grid>
    )
}
