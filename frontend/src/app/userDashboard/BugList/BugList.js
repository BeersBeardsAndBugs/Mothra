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

export const BugList = ({ bugs, userName, handleVisibleBugChange }) => {
    const classes = useStyles()
    const myBugsBtn = useRef(null)
    const [showMine, setShowMine] = useState(true);

    let filteredList = [];
    
    if (showMine) {
        filteredList = bugs.response.filter((bug) => {
            return bug[BUG.ASSIGNED_TO] === userName
        })
    } else {
        filteredList = bugs.response.filter((bug) => {
            return bug[BUG.ASSIGNED_TO] !== userName
        })
    }

    return (
        <Grid
            container
            justify="center"
            alignItems="stretch"
            spacing={2}
            className={classes.grid}
        >
            <Grid item xs={12} sm={12}>
                <ButtonGroup fullWidth>
                    <Button
                        color="primary"
                        variant="contained"
                        ref={myBugsBtn}
                        onClick={() => setShowMine(true)}
                    >
                        Assigned Bugs
                    </Button>
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={() => setShowMine(false)}
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
                            className={classes.listText}
                                primary={bug[BUG.TITLE]}
                                secondary={
                                    bug[BUG.ASSIGNED_TO]
                                        ? `${bug[BUG.ASSIGNED_TO]}`
                                        : 'No Owner'
                                }
                            />
                        </ListItem>
                    ))}
                </List>
            </Grid>
        </Grid>
    )
}
