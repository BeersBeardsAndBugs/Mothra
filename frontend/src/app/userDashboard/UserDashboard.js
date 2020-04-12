import React from "react";
import styles from "./UserDashboard.module.css";
import { NavbarContainer } from "./navbarContainer";

export const UserDashboard = ({ user, setUser, setPageSelected }) => {
  return (
    <div className={styles.userDashboard}>
      <NavbarContainer {...{ user, setUser, setPageSelected }} />
      <div className={styles.buglist}>BUGLIST</div>
      <div className={styles.bugviews}>BUGVIEWS</div>
    </div>
  );
};
