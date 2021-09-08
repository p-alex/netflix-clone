import { useContext } from "react";
import ProjectContext from "../../context/Project-context";
import styles from "./AddToListBtn.module.css";
export default function AddToListBtn({ movieId, btnType }) {
  const context = useContext(ProjectContext);
  const { userMovieList, handleAddMovieToList } = context;

  return (
    <>
      {userMovieList && userMovieList.some((item) => item === movieId) ? (
        <button
          className={
            btnType === "regular"
              ? styles.addToListRegularBtn + " " + styles.movieIsAdded
              : btnType === "rounded"
              ? styles.addToListRoundedBtn + " " + styles.movieIsAdded
              : styles.addToListRegularBtn + " " + styles.movieIsAdded
          }
          onClick={() => handleAddMovieToList(movieId, false)}
        >
          <i className="fas fa-check"></i>
        </button>
      ) : (
        <button
          className={
            btnType === "regular"
              ? styles.addToListRegularBtn
              : btnType === "rounded"
              ? styles.addToListRoundedBtn
              : styles.addToListRegularBtn
          }
          onClick={() => handleAddMovieToList(movieId, true)}
        >
          <i className="fas fa-plus"></i>
        </button>
      )}
    </>
  );
}
