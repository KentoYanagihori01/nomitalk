import React from "react";
import styles from "../styles/RollButton.module.css";

function RollButton({ onClick, disabled }) {
  return (
    <button onClick={onClick} disabled={disabled} className={styles.button}>
      ▶️次の話題
    </button>
  );
}

export default RollButton;
