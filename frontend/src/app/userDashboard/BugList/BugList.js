import React, { useRef, useState, useEffect } from "react";
import { get } from "../../../utils";
import { BUGS_ALL } from "../../../constants";
import { makeStyles } from "@material-ui/core/styles";
import styles from "./BugList.module.css";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import BugReportIcon from "@material-ui/icons/BugReportRounded";

const useStyles = makeStyles((theme) => ({
  matTheme: {
    backgroundColor: theme.palette.background.paper,
  },
  blocker: {
    background: "#b71c1c",
  },
  critical: {
    background: "#e53935",
  },
  high: {
    background: "#fb8c00",
  },
  normal: {
    background: "#fdd835",
  },
  enhancement: {
    background: "#8bc34a",
  },
}));

export const BugList = ({
  bugs,
  setBugs,
  userName,
  handleVisibleBugChange,
}) => {
  const myBugsBtn = useRef(null);

  useEffect(() => {
    const getList = async () => {
      //Prevents user from double-clicking the submit button
      const error = (e) => {
        console.log(e);
      };
      const result = await get(BUGS_ALL, error);
      if (result) {
        setBugs(result);

        myBugsBtn.current.click();
      }
    };
    getList();
  }, []);

  const [filteredList, setFilteredList] = useState([]);

  const classes = useStyles();

  function filterBugs(assigned_to) {
    let filtered = [];

    // If owner isn't specified, just use OG list. Otherwise, filter the list by owner.
    filtered = !assigned_to
      ? bugs
      : bugs.filter((bug) => {
          return bug.assigned_to === assigned_to;
        });

    console.log(filtered);
    setFilteredList(filtered);
  }

  return (
    <div className={styles.bugList}>
      <div className={styles.ownersBugs}>
        <Button
          ref={myBugsBtn}
          className="contained"
          onClick={() => filterBugs(userName)}
        >
          Assigned Bugs
        </Button>
      </div>
      <div className={styles.allBugs}>
        <Button onClick={() => filterBugs()}>Other Bugs</Button>
      </div>
      <div className={styles.bugs}>
        <List>
          {filteredList.map((bug, i) => (
            <ListItem
              key={i}
              button
              onClick={() => handleVisibleBugChange(bug.id)}
            >
              <ListItemAvatar>
                <Avatar className={classes[bug.priority]}>
                  <BugReportIcon></BugReportIcon>
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={bug.description}
                secondary={bug.assigned_to ? `${bug.assigned_to}` : "No Owner"}
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
      </div>
    </div>
  );
};
