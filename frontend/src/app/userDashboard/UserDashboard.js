import React from "react";
import styles from "./UserDashboard.module.css";
import {BugDetail} from "./BugView/BugDetail"
import { BugList } from "./BugList";
import { NavbarContainer } from "./navbarContainer";

export const UserDashboard = ({ user, setUser, setPageSelected }) => {
  return (
    <div className={styles.userDashboard}>
      <div className={styles.navbar}>NAVBAR ----- {user ? `${user.name}'s ` : ""}Dashboard</div>
      <div className={styles.buglist}>BUGLIST</div>
      <div className={styles.bugviews}>
        <BugDetail/>
      </div>
      <NavbarContainer {...{ user, setUser, setPageSelected }} />
      <div className={styles.buglist}>
        <BugList />
      </div>
      <div className={styles.bugviews}><BugDetail/></div>
    </div>
  );
};
