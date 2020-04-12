import React, { useState } from "react";
import styles from "./Logo.module.css";
export const Logo = () => {
  const [isFlapping, setIsFlapping] = useState(false);

  return (
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
  );
};
