import React from "react";
import styles from "./UserDashboard.module.css";
import { BugList } from "./BugList";

export const UserDashboard = ({ user }) => {
  return (
    <div className={styles.userDashboard}>
      <div className={styles.navbar}>NAVBAR ----- {user ? `${user.name}'s ` : ""}Dashboard</div>
      <div className={styles.buglist}><BugList></BugList></div>
      <div className={styles.bugviews}>BUGVIEWS</div>
    </div>
  );
};
