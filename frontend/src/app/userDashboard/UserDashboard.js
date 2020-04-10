import React from "react";
import styles from "./UserDashboard.module.css";
import { Navbar } from "./navbar";

export const UserDashboard = ({ user, setUser }) => {
  return (
    <div className={styles.userDashboard}>
      <Navbar {...{ user, setUser }} />
      <div className={styles.buglist}>BUGLIST</div>
      <div className={styles.bugviews}>BUGVIEWS</div>
    </div>
  );
};
