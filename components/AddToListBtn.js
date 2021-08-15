import { useContext } from "react";
import ProjectContext from "../context/Project-context";
import styles from "../styles/AddToListBtn.module.css";
export default function AddToListBtn({ id }) {
  const context = useContext(ProjectContext);
  const { userMovieList, handleAddMovieToList } = context;
  return (
    <>
      {userMovieList.includes(id) ? (
        <button
          className={styles.addToListBtn + " " + styles.movieIsAdded}
          onClick={() => handleAddMovieToList(id, false)}
        >
          <i className="fas fa-check"></i>
        </button>
      ) : (
        <button
          className={styles.addToListBtn}
          onClick={() => handleAddMovieToList(id, true)}
        >
          <i className="fas fa-plus"></i>
        </button>
      )}
    </>
  );
}
