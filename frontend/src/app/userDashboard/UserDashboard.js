import React from "react";
import styles from "./UserDashboard.module.css";
import { BugList } from "./BugList";
import { NavbarContainer } from "./navbarContainer";

export const UserDashboard = ({ user, setUser, setPageSelected }) => {
  return (
    <div className={styles.userDashboard}>
      <NavbarContainer {...{ user, setUser, setPageSelected }} />
      <div className={styles.buglist}>
        <BugList />
      </div>
      <div className={styles.bugviews}>BUGVIEWS</div>
    </div>
  );
};
