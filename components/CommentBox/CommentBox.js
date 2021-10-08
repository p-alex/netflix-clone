import { useState, useEffect, useContext } from "react";
import ProjectContext from "../../context/Project-context";
import Stars from "../Stars/Stars";
import styles from "./CommentBox.module.css";
export default function CommentBox({
  username,
  profileImg,
  text,
  stars,
  movieId,
  commentId,
}) {
  const context = useContext(ProjectContext);

  const { userData, handleEditComment, handleDeleteComment } = context;

  const [isEditMode, setIsEditMode] = useState(false);

  const [isDeleteConfirmationActive, setIsDeleteConfirmationActive] =
    useState(false);

  const [updatedComment, setUpdatedComment] = useState({
    username,
    profileImg,
    stars,
    text,
    movieId,
    commentId,
  });

  useEffect(() => {
    setUpdatedComment((prevState) => ({ ...prevState, stars: 0, text }));
  }, [isEditMode]);

  const handleToggleEdit = () => setIsEditMode(!isEditMode);

  const handleToggleDelete = () =>
    setIsDeleteConfirmationActive(!isDeleteConfirmationActive);

  const handleTextChange = (e) => {
    setUpdatedComment((prevState) => ({ ...prevState, text: e.target.value }));
  };

  const handleStarsChange = (value) => {
    setUpdatedComment((prevState) => ({ ...prevState, stars: value }));
  };

  const handleSubmit = async () => {
    if (updatedComment.stars !== 0) {
      handleEditComment(updatedComment);
      handleToggleEdit();
    }
  };

  const handleDeleteSubmit = async () => {
    setIsDeleteConfirmationActive(false);
    handleDeleteComment(commentId, movieId);
  };

  return (
    <div className={styles.commentBox}>
      {isDeleteConfirmationActive && (
        <>
          <div
            className={styles.commentBox__deleteConfirmationBackdrop}
            onClick={handleToggleDelete}
          ></div>
          <div className={styles.commentBox__deleteConfirmation}>
            <p>Are you sure you want to delete this comment?</p>
            <div className={styles.commentBox__deleteConfirmation__btns}>
              <button
                className={
                  styles.commentBox__deleteConfirmation__btns__deleteBtn
                }
                onClick={handleDeleteSubmit}
              >
                Delete
              </button>
              <button
                className={
                  styles.commentBox__deleteConfirmation__btns__cancelBtn
                }
                onClick={handleToggleDelete}
              >
                Cancel
              </button>
            </div>
          </div>
        </>
      )}

      <div className={styles.commentBox__userAndBtns}>
        <div className={styles.commentBox__userAndBtns__user}>
          <img
            className={styles.commentBox__userAndBtns__user__profileImg}
            src={profileImg}
            alt={username}
          />

          <p className={styles.commentBox__userAndBtns__user__username}>
            {username}
          </p>
        </div>
        {userData.username === username && (
          <div className={styles.commentBox__userAndBtns__btns}>
            {!isEditMode && (
              <button
                className={styles.commentBox__userAndBtns__btns__deleteBtn}
                onClick={handleToggleDelete}
              >
                <i className="fas fa-trash-alt"></i>Delete
              </button>
            )}
            <button onClick={handleToggleEdit}>
              {isEditMode ? (
                "Cancel"
              ) : (
                <span>
                  <i className="far fa-edit"></i>Edit
                </span>
              )}
            </button>
          </div>
        )}
      </div>

      {isEditMode ? (
        <Stars
          howManyStars={updatedComment.stars}
          handleSetStars={handleStarsChange}
        />
      ) : (
        <Stars howManyStars={stars} />
      )}
      {isEditMode ? (
        <textarea
          type="text"
          value={updatedComment.text}
          onChange={(e) => handleTextChange(e)}
          className={styles.commentBox__textBox}
        />
      ) : (
        <p className={styles.commentBox__commentText}>{text}</p>
      )}
      {isEditMode && (
        <button className={styles.commentBox__editBtn} onClick={handleSubmit}>
          Edit
        </button>
      )}
    </div>
  );
}
