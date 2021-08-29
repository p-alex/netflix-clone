import { useState, useEffect, useContext } from "react";
import ProjectContext from "../../context/Project-context";
import styles from "./MovieFilter.module.css";
export default function MovieFilter({
  activeFilter,
  handleSetActiveFilter,
  handleResetActiveFilter,
}) {
  const context = useContext(ProjectContext);
  const { filters } = context;
  const [isDropdownActive, setIsDropdownActive] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    });
  }, []);
  return (
    <div
      className={
        isScrolled
          ? styles.movieFilter + " " + styles.movieFilter__scrolled
          : styles.movieFilter
      }
    >
      <h2>Movies</h2>
      {!activeFilter ? (
        <div className={styles.movieFilter__filters}>
          <button
            className={styles.movieFilter__filtersToggle}
            onClick={() => setIsDropdownActive(!isDropdownActive)}
          >
            <p>Genres</p>
            <i className="fas fa-sort-down"></i>
          </button>
          {isDropdownActive && (
            <ul className={styles.movieFilter__dropdown}>
              {filters.map((filter) => (
                <li
                  className={styles.movieFilter__dropdown__filter}
                  key={filter}
                  onClick={() => handleSetActiveFilter(filter)}
                >
                  {filter}
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : (
        <div
          className={styles.movieFilter__activeFilter}
          onClick={() => {
            setIsDropdownActive(false);
            handleResetActiveFilter();
          }}
        >
          <i className="fas fa-times"></i>
          <p>{activeFilter}</p>
        </div>
      )}
    </div>
  );
}
