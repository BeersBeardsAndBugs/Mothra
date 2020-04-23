import React, { useRef, useState, useEffect } from "react";
import { get } from "../../../utils";
import { BUGS_ALL } from "../../../constants";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Avatar from "@material-ui/core/Avatar";
import BugReportIcon from "@material-ui/icons/BugReportRounded";
import Grid from '@material-ui/core/Grid';
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({

  root: {
  },

  listStyle: {
    color: 'black'
  },

  Blocker: {
    background: "#b71c1c",
  },
  Critical: {
    background: "#e53935",
  },
  High: {
    background: "#fb8c00",
  },
  Normal: {
    background: "#fdd835",
  },
  Enhancement: {
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

  function filterBugs(assigned_to, forOwner) {
    let filtered = [];

    if (forOwner) {
      filtered = bugs.filter((bug) => {
        return bug.assigned_to === assigned_to
      });
    } else {
      filtered = bugs.filter((bug) => {
        return bug.assigned_to !== assigned_to
      });
    }


    console.log(filtered);
    setFilteredList(filtered);
  }

  return (

     <Grid container spacing={1} justify="center" alignItems="stretch" >
      <Grid item xs={6}>
        <ButtonGroup>
        <Button fullWidth color="secondary" variant="contained"
          ref={myBugsBtn}
          onClick={() => filterBugs(userName, true)}>
              Assigned Bugs
        </Button>
        <Button fullWidth color="secondary" variant="contained"
          onClick={() => filterBugs(userName, false)}>
              Other Bugs
        </Button>
        </ButtonGroup>
      </Grid>
      <Grid item xs={10}>
        <List className={classes.listStyle}>
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
      </Grid>
    </Grid>

  );
};
