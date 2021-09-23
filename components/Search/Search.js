import { useState } from "react";
import styles from "./Search.module.css";
export default function Search() {
  const [toggle, setToggle] = useState(false);
  const handleToggleSearch = () => setToggle(!toggle);
  return (
    <div
      className={
        toggle ? styles.search + " " + styles.searchActive : styles.search
      }
      name={"searchBar"}
    >
      <button
        className={styles.search__toggle}
        onClick={handleToggleSearch}
        name={"searchBar"}
      >
        <i class="fas fa-search"></i>
      </button>
      {toggle && (
        <div class={styles.search__inputAndClear}>
          <input
            className={styles.search__input}
            type="text"
            name="search"
            autoComplete="off"
            placeholder="Search..."
          />
          <button className={styles.search__clear}>
            <i class="fas fa-times"></i>
          </button>
        </div>
      )}
    </div>
  );
}
