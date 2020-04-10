import React from "react";
import styles from "./Navbar.module.css";

export const Navbar = ({ user }) => {
  return (
    <div className={styles.navbar}>
      <div className={styles.name}>{user.name}</div>
      <div className={styles.logo}>
        mot<span className={styles.leftWing}>{`}`}</span>;
        <span className={styles.rightWing}>{`{`}</span>ra
      </div>
      <div className={styles.settings}>@</div>
    </div>
  );
};
