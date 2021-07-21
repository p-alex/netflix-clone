import { useContext } from "react";
import ProjectContext from "../context/Project-context";
import Logo from "../components/Logo";
import styles from "../styles/NavBar.module.css";
export default function NavBar({ username, profileImg }) {
  const context = useContext(ProjectContext);
  const { handleLogout } = context;
  return (
    <nav className={styles.navbar} id="navbar">
      <Logo type="big" margin="0" maxWidth="100px" />
      <ul className={styles.links}>
        <li>
          <a href="/">Home</a>
        </li>
      </ul>

      <div className={styles.user}>
        <ul>
          <li>
            <p>{username}</p>
            <img src={profileImg} alt="" />
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
