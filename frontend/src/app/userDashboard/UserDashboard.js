import React from "react";
import styles from "./UserDashboard.module.css";
import {BugDetail} from "./BugView/BugDetail"

export const UserDashboard = ({ user }) => {
  return (
    <div className={styles.userDashboard}>
      <div className={styles.navbar}>NAVBAR ----- {user ? `${user.name}'s ` : ""}Dashboard</div>
      <div className={styles.buglist}>BUGLIST</div>
      <div className={styles.bugviews}>
        <BugDetail/>
      </div>
    </div>
  );
};
