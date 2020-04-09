import React from "react";
import styles from "./UserDashboard.module.css";

export const UserDashboard = ({ user }) => {
  return (
    <div className={styles.userDashboard}>
      {user ? `${user.name}'s ` : ""}Dashboard
    </div>
  );
};
