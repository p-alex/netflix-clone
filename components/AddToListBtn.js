import { useContext } from "react";
import ProjectContext from "../context/Project-context";
import styles from "../styles/AddToListBtn.module.css";
export default function AddToListBtn({ movie }) {
  const context = useContext(ProjectContext);
  const { userMovieList, handleAddMovieToList } = context;

  return (
    <>
      {userMovieList && userMovieList.some((item) => item._id === movie._id) ? (
        <button
          className={styles.addToListBtn + " " + styles.movieIsAdded}
          onClick={() => handleAddMovieToList(movie, false)}
        >
          <i className="fas fa-check"></i>
        </button>
      ) : (
        <button
          className={styles.addToListBtn}
          onClick={() => handleAddMovieToList(movie, true)}
        >
          <i className="fas fa-plus"></i>
        </button>
      )}
    </>
  );
}
