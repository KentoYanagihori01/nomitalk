import React, { forwardRef } from "react";
import styles from "../styles/TopicDisplay.module.css";

const TopicDisplay = forwardRef(({ text }, ref) => {
  return (
    <div ref={ref} className={styles.topic}>
      {text}
    </div>
  );
});

export default TopicDisplay;
