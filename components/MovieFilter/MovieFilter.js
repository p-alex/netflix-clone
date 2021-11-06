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
    function handleSetNavBarActive() {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    }
    window.addEventListener("scroll", handleSetNavBarActive);
    return () => {
      window.removeEventListener("scroll", handleSetNavBarActive);
    };
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
            name="filterMenuToggleBtn"
            aria-label="Open genres dropdown menu"
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
                >
                  <button
                    aria-label={`Add ${filter} filter`}
                    onClick={() => handleSetActiveFilter(filter)}
                  >
                    {filter}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : (
        <button
          className={styles.movieFilter__activeFilter}
          onClick={() => {
            setIsDropdownActive(false);
            handleResetActiveFilter();
          }}
          aria-label={`Remove ${activeFilter} filter`}
        >
          <i className="fas fa-times"></i>
          <p>{activeFilter}</p>
        </button>
      )}
    </div>
  );
}
