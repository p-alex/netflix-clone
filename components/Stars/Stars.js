import { useState } from "react";
import styles from "./Stars.module.css";
export default function Stars({ howManyStars, handleSetStars, focusable }) {
  const stars = [1, 2, 3, 4, 5];
  return (
    <div className={styles.stars}>
      {stars.map((star) => {
        return (
          <button
            key={star + "star"}
            onClick={handleSetStars ? () => handleSetStars(star) : () => {}}
            style={star > howManyStars ? { color: "grey" } : null}
            tabIndex={focusable ? "0" : "-1"}
            aria-label={`Rate ${star} ${star === 1 ? "star" : "stars"}`}
          >
            <i
              className={star <= howManyStars ? "fas fa-star" : "far fa-star"}
            ></i>
          </button>
        );
      })}
    </div>
  );
}
