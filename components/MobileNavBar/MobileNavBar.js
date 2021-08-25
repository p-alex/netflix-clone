import { useState, useEffect, useContext } from "react";
import ProjectContext from "../../context/Project-context";
import React from "react";
import styles from "./MobileNavBar.module.css";
import Link from "next/link";
export default function MobileNavBar() {
  const context = useContext(ProjectContext);
  const { handleLogout } = context;
  const [isBrowseDropdownActive, setIsBrowseDropdownActive] = useState(false);
  const [isUserDropdownActive, setIsUserDropdownActive] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    });
    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, []);
  const handleToggleBrowseDropdown = () => {
    if (isBrowseDropdownActive) return setIsBrowseDropdownActive(false);
    if (!isBrowseDropdownActive) {
      if (isUserDropdownActive) setIsUserDropdownActive(false);
      setIsBrowseDropdownActive(true);
    }
  };

  const handleToggleUserDropdown = () => {
    if (isUserDropdownActive) return setIsUserDropdownActive(false);
    if (!isUserDropdownActive) {
      if (isBrowseDropdownActive) setIsBrowseDropdownActive(false);
      setIsUserDropdownActive(true);
    }
  };

  const handleResetDropdowns = () => {
    setIsBrowseDropdownActive(false);
    setIsUserDropdownActive(false);
  };

  const { profileImg, username } = context.userData;
  return (
    <>
      {" "}
      {isBrowseDropdownActive || isUserDropdownActive ? (
        <div
          className={styles.mobileNavBar__backdrop}
          onClick={handleResetDropdowns}
        ></div>
      ) : null}
      <nav
        className={
          isScrolled || isBrowseDropdownActive || isUserDropdownActive
            ? styles.mobileNavBar + " " + styles.mobileNavBar__scrolled
            : styles.mobileNavBar
        }
      >
        <div className={styles.mobileNavBar__logoAndBrowse}>
          <img
            className={styles.mobileNavBar__logo}
            src="/images/logo/netflix-logo-mini.png"
            alt=""
          />
          <button
            className={styles.mobileNavBar__browseToggle}
            onClick={handleToggleBrowseDropdown}
          >
            Browse<i className="fas fa-sort-down"></i>
          </button>
          {isBrowseDropdownActive && (
            <ul className={styles.mobileNavBar__browseDropdown}>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/movies">Movies</Link>
              </li>
              <li>
                <Link href="/my-list">My List</Link>
              </li>
            </ul>
          )}
        </div>
        <button
          className={styles.mobileNavBar__userToggle}
          onClick={handleToggleUserDropdown}
        >
          <img
            className={styles.mobileNavBar__user__profileImg}
            src={profileImg}
            alt={username}
          />
          <i className="fas fa-sort-down"></i>
        </button>
        {isUserDropdownActive && (
          <div className={styles.mobileNavBar__userDropdown}>
            <button onClick={handleLogout}>Sign out of Netflix</button>
          </div>
        )}
      </nav>
    </>
  );
}
