import Grid from "@material-ui/core/Grid";
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

    <Grid container spacing={1} alignItems="center" justify="center">
      <Grid container item xs={12}>
        <NavbarContainer {...{ user, setUser, setPageSelected, handleVisibleBugChange }}/>
      </Grid>
      <Grid container item xs={3} className={styles.buglist}>
        <BugList {...{ bugs, setBugs, userName: user.name, handleVisibleBugChange }}/>
      </Grid>
      <Grid container item xs={9} className={styles.bugviews}>
        {visibleBug?.id && (<BugDetail key={visibleBug.id} {...{ visibleBug, userEmail: user.email  }} />)}
      </Grid>
    
{/*
    <div className={styles.userDashboard}>
      <NavbarContainer
        {...{ user, setUser, setPageSelected, handleVisibleBugChange }}
      />
      <div className={styles.buglist}>
        <BugList
          {...{ bugs, setBugs, userName: user.name, handleVisibleBugChange }}
        />
      </div>
      <div className={styles.bugviews}>
        {visibleBug?.id && (
          <BugDetail key={visibleBug.id} {...{ visibleBug }} />
        )}
      </div>
    </div>
        */}
    </Grid>
  );
};
