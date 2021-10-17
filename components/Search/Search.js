import { useContext, useState, useEffect } from "react";
import ProjectContext from "../../context/Project-context";
import Link from "next/link";
import styles from "./Search.module.css";
export default function Search() {
  const context = useContext(ProjectContext);

  const [currentPath, setCurrentPath] = useState("");
  const {
    searchQuery,
    handleChangeSearchQuery,
    isSearchBarActive,
    setIsSearchBarActive,
    handleClearSearchQuery,
    handleToggleOffSearchBar,
  } = context;

  const handleToggleSearchBar = () => setIsSearchBarActive(!isSearchBarActive);

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  useEffect(() => {
    if (currentPath === "/search") {
      handleToggleSearchBar();
      handleClearSearchQuery();
    } else {
      handleToggleOffSearchBar();
    }
  }, [currentPath]);
  return (
    <div
      className={
        isSearchBarActive
          ? styles.search + " " + styles.searchActive
          : styles.search
      }
      name={"searchBar"}
    >
      <Link href="/search">
        <a aria-label="Toggle search bar" role="button">
          <i className="fas fa-search"></i>
        </a>
      </Link>
      {isSearchBarActive && (
        <div className={styles.search__inputAndClear}>
          <input
            className={styles.search__input}
            role="search"
            type="search"
            name="search"
            autoComplete="off"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => handleChangeSearchQuery(e)}
            autoFocus
          />
          <button
            className={styles.search__clear}
            onClick={handleClearSearchQuery}
            name="clearSearchQueryBtn"
            aria-label="Clear search query"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
      )}
    </div>
  );
}
