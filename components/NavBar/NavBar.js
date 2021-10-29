import { useState, useEffect } from "react";
import { useContext } from "react";
import ProjectContext from "../../context/Project-context";
import Image from "next/image";
import Link from "next/link";
import styles from "./NavBar.module.css";
import Search from "../Search/Search";
export default function NavBar() {
  const context = useContext(ProjectContext);
  const { username, profileImg } = context.userData;
  const [isScrolled, setIsScrolled] = useState(false);
  const { handleLogout, userData, handleGetUserData } = context;

  useEffect(() => {
    if (!userData?.username) handleGetUserData();
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    });
    return () => {
      window.removeEventListener("scroll", () => {
        if (window.scrollY > 0) {
          setIsScrolled(true);
        } else {
          setIsScrolled(false);
        }
      });
    };
  }, []);

  return (
    <nav
      className={
        isScrolled ? styles.navbar + " " + styles.navbar_active : styles.navbar
      }
      id="navbar"
    >
      <div className={styles.navbar__logoBig}>
        <Image
          src={"/images/logo/netflix-logo.png"}
          alt=""
          width="112"
          height="30" //30
        />
      </div>

      <ul className={styles.navbar__links}>
        <li>
          <Link href="/browse">Home</Link>
        </li>
        <li>
          <Link href="/movies">Movies</Link>
        </li>
        <li>
          <Link href="/my-list">My List</Link>
        </li>
      </ul>
      {userData.username && (
        <div className={styles.navbar__searchAndUser}>
          <Search />
          <ul>
            <li tabIndex="0">
              <p>{username}</p>
              <div className={styles.navbar__searchAndUser__profileImage}>
                <Image src={profileImg} alt="" width="300px" height="300px" />
              </div>

              <i className="fas fa-caret-down"></i>
              <ul>
                <li>
                  <Link href="/profile">My Profile</Link>
                </li>
                <li>
                  <button onClick={handleLogout} name="signOutBtn">
                    Sign out of Netflix
                  </button>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
