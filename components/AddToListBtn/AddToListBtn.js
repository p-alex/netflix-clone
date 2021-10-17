import { useContext } from "react";
import ProjectContext from "../../context/Project-context";
import styles from "./AddToListBtn.module.css";
export default function AddToListBtn({ movieId, btnType, margin, movieName }) {
  const context = useContext(ProjectContext);
  const { userMovieList, handleAddMovieToList, isAddToListLoading } = context;

  return (
    <>
      {userMovieList && userMovieList.some((item) => item === movieId) ? (
        <div className={styles.btnContainer} style={{ margin }}>
          <div className={styles.infoPopup}>
            <p>Remove from My List</p>
            <div className={styles.infoPopup__triangle}></div>
          </div>
          <button
            className={
              btnType === "regular"
                ? styles.addToListRegularBtn + " " + styles.movieIsAdded
                : btnType === "rounded"
                ? styles.addToListRoundedBtn + " " + styles.movieIsAdded
                : styles.addToListRegularBtn + " " + styles.movieIsAdded
            }
            onClick={() => handleAddMovieToList(movieId, false)}
            name={"addToListBtn"}
            aria-label={`Remove ${movieName} from list`}
            disabled={isAddToListLoading}
          >
            <i className="fas fa-check"></i>
          </button>
        </div>
      ) : (
        <div className={styles.btnContainer} style={{ margin }}>
          <div className={styles.infoPopup}>
            <p>Add to My List</p>
            <div className={styles.infoPopup__triangle}></div>
          </div>
          <button
            className={
              btnType === "regular"
                ? styles.addToListRegularBtn
                : btnType === "rounded"
                ? styles.addToListRoundedBtn
                : styles.addToListRegularBtn
            }
            onClick={() => handleAddMovieToList(movieId, true)}
            name={"addToListBtn"}
            aria-label={`Add ${movieName} to list`}
            disabled={isAddToListLoading}
          >
            <i className="fas fa-plus"></i>
          </button>
        </div>
      )}
    </>
  );
}
