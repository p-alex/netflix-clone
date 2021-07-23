import { useContext } from "react";
import ProjectContext from "../context/Project-context";
import Image from "next/image";
import Logo from "../components/Logo";
import styles from "../styles/NavBar.module.css";
export default function NavBar({ username, profileImg }) {
  const context = useContext(ProjectContext);
  const { handleLogout } = context;
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
    </nav>
  );
}
