import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import React, { useState } from "react";
import { BugDetail } from "./BugDetail";
import { BugList } from "./BugList";
import { NavbarContainer } from "./navbarContainer";
import styles from "./UserDashboard.module.css";

export const UserDashboard = ({ user, setUser, setPageSelected }) => {
    const [bugs, setBugs] = useState([])
    const [visibleBug, setVisibleBug] = useState({})

    const handleVisibleBugChange = (bugId) => {
        const foundBugs = bugs.filter((bug) => bug.id === bugId)
        if (foundBugs.length === 1) {
            setVisibleBug((prevState) => ({
                ...prevState,
                ...foundBugs[0],
            }))
        }
    }

  return (
    <Grid container spacing={2} alignItems="flex-start" justify="center">
      <Grid container item xs={12}>
        <NavbarContainer {...{ user, setUser, setPageSelected, handleVisibleBugChange }}/>
      </Grid>
      <Grid item xs={3}>
        <BugList {...{ bugs, setBugs, userName: user.name, handleVisibleBugChange }}/>
      </Grid>
      <Grid item alignContent="stretch" xs={9}>
        {visibleBug?.id && (<BugDetail key={visibleBug.id} {...{ visibleBug, userEmail: user.email  }} />)}
      </Grid>
    </Grid>);
};
