import { useContext } from "react";
import ProjectContext from "../../context/Project-context";
import styles from "./MoreInfoBtn.module.css";
export default function MoreInfoBtn({ movie }) {
  const context = useContext(ProjectContext);
  const { handleSelectMovie } = context;
  return (
    <div className={styles.btnContainer}>
      <div className={styles.btnContainer__infoPopup}>
        <p>More Info</p>
        <div className={styles.btnContainer__infoPopup__triangle}></div>
      </div>
      <button
        className={styles.btnContainer__moreInfo}
        onClick={() => handleSelectMovie(movie)}
      >
        <i className="fas fa-angle-down"></i>
      </button>
    </div>
  );
}
