import { useState } from "react";
import styles from "./Stars.module.css";
export default function Stars({ howManyStars, handleSetStars }) {
  const stars = [1, 2, 3, 4, 5];
  return (
    <div className={styles.stars}>
      {stars.map((star) => {
        return (
          <i
            key={star + "star"}
            className={star <= howManyStars ? "fas fa-star" : "far fa-star"}
            onClick={handleSetStars ? () => handleSetStars(star) : () => {}}
          ></i>
        );
      })}
    </div>
  );
}
