import React from "react";
import styles from "./BugList.module.css";
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';

export const BugList = ({ user }) => {
  return (
    <div className={styles.bugList}>
      BUG LIST


      <Button variant="contained" color="primary">
      Hello World
    </Button>
    </div>
  );
};