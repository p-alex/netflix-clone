import { useContext } from "react";
import ProjectContext from "../../context/Project-context";
import styles from "./AddToListBtn.module.css";
export default function AddToListBtn({ movie, btnType }) {
  const context = useContext(ProjectContext);
  const { userMovieList, handleAddMovieToList } = context;

  return (
    <>
      {userMovieList && userMovieList.some((item) => item._id === movie._id) ? (
        <button
          className={
            btnType === "regular"
              ? styles.addToListRegularBtn + " " + styles.movieIsAdded
              : btnType === "rounded"
              ? styles.addToListRoundedBtn + " " + styles.movieIsAdded
              : styles.addToListRegularBtn + " " + styles.movieIsAdded
          }
          onClick={() => handleAddMovieToList(movie, false)}
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
          onClick={() => handleAddMovieToList(movie, true)}
        >
          <i className="fas fa-plus"></i>
        </button>
      )}
    </>
  );
}
