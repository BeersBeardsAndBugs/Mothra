import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import BugReportIcon from '@material-ui/icons/BugReportRounded';

const useStyles = makeStyles((theme) => ({

  matTheme: {
    backgroundColor: theme.palette.background.paper,
  }
}));


export const BugList = ({ bugs2 }) => {
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
      id: 367,
      title : "Needs Hungarian Translations",
      owner: "Jordon",
      dateCreated: "12-14-2019",
      severity: "enhancement"
    },
    { 
      id: 10000,
      title : "Unclassified Bug?",
      owner: "Jordon",
      dateCreated: "01-01-2020"
    }
  ]

    function handleClick(bug) {
      console.log(bug);
    }

  return (
      <div className={classes.matTheme}>
        <List>
          {
            bugs.map((bug, i) => (
              <ListItem key={i} button onClick={() =>handleClick(bug)}>
                <ListItemAvatar>
                  <Avatar style={
                    bug.severity === "blocker" ? {background: "#b71c1c"} : 
                    bug.severity === "critical" ? {background: "#e53935"} :
                    bug.severity === "high" ? {background: "#fb8c00"} :
                    bug.severity === "normal" ? {background: "#fdd835"} :
                    bug.severity === "enhancement" ? {background: "#8bc34a"} :
                    {background: ""}
                  }>
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
  );
}
