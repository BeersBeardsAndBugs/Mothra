import React, { useRef, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import styles from "./BugList.module.css";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import BugReportIcon from '@material-ui/icons/BugReportRounded';

const useStyles = makeStyles((theme) => ({

  matTheme: {
    backgroundColor: theme.palette.background.paper,
  },
  blocker: {
    background: "#b71c1c"
  },
  critical: {
    background: "#e53935"
  },
  high: {
    background: "#fb8c00"
  },
  normal: {
    background: "#fdd835"
  },
  enhancement: {
    background: "#8bc34a"
  }
  }));

export const BugList = ({ }) => {

  const [filteredList, setFilteredList] = useState([]);

  const classes = useStyles();

  const bugs = [
    { 
      id: 200,
      title : "App Crashes in Chrome",
      owner: "Jordon",
      dateCreated: "04-03-2020",
      severity: "blocker"
    },
    { 
      id: 393,
      title : "No info text on button hover",
      owner: "Preston",
      dateCreated: "02-11-2020",
      severity: "normal"
    },
    { 
      id: 450,
      title : "Users can't edit Comments",
      owner: "Jordon",
      dateCreated: "04-09-2020",
      severity: "critical"
    },
    { 
      id: 78,
      title : "Button Scaling Issues",
      owner: "Jordon",
      dateCreated: "03-01-2020",
      severity: "high"
    },
    { 
      id: 28,
      title : "Doesn't work in IE",
      owner: "Jordon",
      dateCreated: "02-11-2020",
      severity: "normal"
    },
    { 
      id: 432,
      title : "Log Out isnt Instant",
      owner: "",
      dateCreated: "03-11-2020",
      severity: "high"
    },
    { 
      id: 367,
      title : "Needs Hungarian Translations",
      owner: "Jordon",
      dateCreated: "12-14-2019",
      severity: "enhancement"
    },
    { 
      id: 69,
      title : "Textbox Animations Needed",
      owner: "Alex",
      dateCreated: "12-11-2019",
      severity: "enhancement"
    },
    { 
      id: 10000,
      title : "Unclassified Bug?",
      owner: "Jordon",
      dateCreated: "01-01-2020"
    }
  ]

    function selectBug(bug) {
      console.log(bug);
    }

    function filterBugs(owner) {
      let filtered = []

      // If owner isn't specified, just use OG list. Otherwise, filter the list by owner.
      filtered = (!owner) ? bugs : bugs.filter((bug) => {return bug.owner === owner;})

      console.log(filtered);
      setFilteredList(filtered);
    }

  return (
    <div className={styles.bugList}>
      <div className={styles.ownersBugs}>
        <Button className="contained" onClick={() =>filterBugs('Jordon')}>Assigned Bugs</Button>
      </div>
      <div className={styles.allBugs}>
        <Button onClick={() =>filterBugs()}>All Bugs</Button></div>
      <div className={styles.bugs}>
        <List>
          {
            filteredList.map((bug, i) => (
              <ListItem key={i} button onClick={() =>selectBug(bug)}>
                <ListItemAvatar>
                  <Avatar className={classes[bug.severity]}>
                    <BugReportIcon></BugReportIcon>
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={bug.title}
                  secondary={bug.owner ? `${bug.owner}` : "No Owner"}
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
            ))
          }
        </List>
      </div>
      
    </div>
  );
}
