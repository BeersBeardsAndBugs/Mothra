import React, { useState } from "react";
import styles from "./Navbar.module.css";

export const Navbar = ({ user }) => {
  const [isFlapping, setIsFlapping] = useState(false);
  return (
    <div className={styles.navbar}>
      <div className={styles.name}>{user.name}</div>
      <div
        className={styles.logo}
        onMouseEnter={() => setIsFlapping(true)}
        onMouseLeave={() => setIsFlapping(false)}
      >
        mot
        <span
          className={`${styles.moth} ${isFlapping && styles.leftWingFlap}`}
        >{`}`}</span>
        <span
          className={`${styles.moth} ${isFlapping && styles.mothBody}`}
        >{`;`}</span>
        <span
          className={`${styles.moth} ${isFlapping && styles.rightWingFlap}`}
        >{`{`}</span>
        ra
      </div>
      <div className={styles.settings}>@</div>
    </div>
  );
};
