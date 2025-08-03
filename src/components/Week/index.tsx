import type { FC } from "react";
import styles from "./styles.module.scss";

const Week: FC = () => {
  return (
    <div className={styles.week}>
      <div className={styles.day}></div>
      <div className={styles.day}></div>
      <div className={styles.day}></div>
      <div className={styles.day}></div>
      <div className={styles.day}></div>
      <div className={styles.day}></div>
      <div className={styles.day}></div>
    </div>
  );
};

export default Week;
