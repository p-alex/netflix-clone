import { useState, useEffect } from "react";
import { useContext } from "react";
import ProjectContext from "../context/Project-context";
import Image from "next/image";
import styles from "../styles/NavBar.module.css";
export default function NavBar() {
  const context = useContext(ProjectContext);
  const { username, profileImg } = context.userData;
  const [isScrolled, setIsScrolled] = useState(false);
  const { handleLogout, userData, handleGetUserData } = context;

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    });
  });

  useEffect(() => {
    if (!userData?.username) {
      handleGetUserData();
    }
  }, []);

  return (
    <nav
      className={
        isScrolled ? styles.navbar + " " + styles.navbar_active : styles.navbar
      }
      id="navbar"
    >
      <div className={styles.logo_big}>
        <Image
          src={"/images/logo/netflix-logo.png"}
          alt=""
          width="112"
          height="30"
        />
      </div>

      <div className={styles.logo_small}>
        <img src="/images/logo/netflix-logo-mini.png" />
      </div>

      <ul className={styles.links}>
        <li>
          <a href="/">Home</a>
        </li>
      </ul>
      {userData.username && (
        <div className={styles.user}>
          <ul>
            <li>
              <p>{username}</p>
              <div className={styles.profileImg}>
                <Image src={profileImg} alt="" width="300px" height="300px" />
              </div>

              <i className="fas fa-caret-down"></i>
              <ul>
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
