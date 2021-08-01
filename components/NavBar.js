import { useState, useEffect } from "react";
import { useContext } from "react";
import ProjectContext from "../context/Project-context";
import Image from "next/image";
import styles from "../styles/NavBar.module.css";
export default function NavBar() {
  const context = useContext(ProjectContext);
  const [userData, setUserData] = useState({});
  const { username, profileImg } = userData;
  const { handleLogout } = context;
  useEffect(async () => {
    console.log("getting user");
    let url =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : "https://netflix-clone-inky-five.vercel.app";
    const result = await fetch(`${url}/api/user-data`);
    const resultJSON = await result.json();
    await setUserData({
      username: resultJSON.username,
      profileImg: resultJSON.profileImg,
    });

    return () => {
      setUserData({});
    };
  }, []);
  return (
    <nav className={styles.navbar} id="navbar">
      <Image
        src={"/images/logo/netflix-logo.png"}
        alt=""
        width="112"
        height="30"
      />
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
