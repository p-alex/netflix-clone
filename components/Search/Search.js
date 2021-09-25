import { useContext, useState, useEffect, useRef } from "react";
import ProjectContext from "../../context/Project-context";
import Link from "next/link";
import styles from "./Search.module.css";
export default function Search() {
  const context = useContext(ProjectContext);
  const searchInput = useRef(null);
  const searchBar = useRef(null);
  const [currentPath, setCurrentPath] = useState("");
  const {
    searchQuery,
    handleChangeSearchQuery,
    isSearchBarActive,
    setIsSearchBarActive,
    //   handleToggleSearchBar,
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
    } else {
      handleToggleOffSearchBar();
    }
    searchInput?.current?.focus();
  }, [currentPath]);
  console.count("Reload");
  return (
    <div
      className={
        isSearchBarActive
          ? styles.search + " " + styles.searchActive
          : styles.search
      }
      name={"searchBar"}
      ref={searchBar}
    >
      <Link href="/search">
        <i className="fas fa-search"></i>
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
            ref={searchInput}
          />
          <button
            className={styles.search__clear}
            onClick={handleClearSearchQuery}
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
      )}
    </div>
  );
}
