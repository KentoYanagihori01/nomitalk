import React from "react";
import styles from "../styles/ThemeCard.module.css";

function ThemeCard({ name, icon, selected, onClick }) {
  return (
    <div
      className={`${styles.card} ${selected ? styles.selected : ""}`}
      onClick={onClick}
    >
      <h3>{name}</h3>
      <span className={styles.icon}>{icon}</span>
    </div>
  );
}

export default ThemeCard;
