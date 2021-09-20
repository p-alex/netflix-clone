import { useState, useEffect } from "react";
import { useContext } from "react";
import ProjectContext from "../../context/Project-context";
import Image from "next/image";
import Link from "next/link";
import styles from "./NavBar.module.css";
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
      window.removeEventListener("scroll", () => {});
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
          height="30"
        />
      </div>

      <ul className={styles.navbar__links}>
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
      {userData.username && (
        <div className={styles.navbar__user}>
          <ul>
            <li>
              <p>{username}</p>
              <div className={styles.navbar__user__profileImage}>
                <Image src={profileImg} alt="" width="300px" height="300px" />
              </div>

              <i className="fas fa-caret-down"></i>
              <ul>
                <li>
                  <Link href="/profile">Account</Link>
                </li>
                <li>
                  <button onClick={handleLogout}>Sign out of Netflix</button>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
