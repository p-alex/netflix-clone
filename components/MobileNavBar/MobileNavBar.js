import { useState, useContext } from "react";
import ProjectContext from "../../context/Project-context";
import styles from "./MobileNavBar.module.css";
import Link from "next/link";
import Search from "../Search/Search";
export default function MobileNavBar() {
  const context = useContext(ProjectContext);
  const { handleLogout, filters } = context;
  const { profileImg, username } = context.userData;
  const [isMenuActive, setIsMenuActive] = useState(false);

  const handleToggleMenu = () => setIsMenuActive(!isMenuActive);
  return (
    <nav className={styles.mobileNavBar}>
      <div className={styles.mobileNavBar__barsAndLogo}>
        <button
          className={styles.mobileNavBar__barsAndLogo__menuToggle}
          onClick={handleToggleMenu}
        >
          <i className="fas fa-bars"></i>
        </button>
        <img
          className={styles.mobileNavBar__barsAndLogo__logo}
          src="/images/logo/netflix-logo.png"
          alt=""
        />
      </div>

      <Search />
      {isMenuActive && (
        <>
          <div className={styles.mobileNavBar__menu}>
            <div className={styles.mobileNavBar__menu__user}>
              <div
                className={
                  styles.mobileNavBar__menu__user__profileImgAndUsername
                }
              >
                <img src={profileImg} alt={username} />
                <p>{username}</p>
              </div>
              <div className={styles.mobileNavBar__menu__user__buttons}>
                <Link href="/profile">Profile</Link>
                <button onClick={handleLogout}>Sign out of Netflix</button>
              </div>
            </div>

            <ul className={styles.mobileNavBar__menu__links}>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/my-list">My List</Link>
              </li>
              <li>
                <Link href="/movies">Movies</Link>
              </li>
              {filters.map((filter) => {
                return (
                  <li key={filter} onClick={handleToggleMenu}>
                    <Link href={`/genres/${filter}`}>{filter}</Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div
            className={styles.mobileNavBar__menuBackdrop}
            onClick={handleToggleMenu}
          ></div>
        </>
      )}
    </nav>
  );
}
