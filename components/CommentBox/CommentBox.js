import { useState, useEffect, useContext, useRef } from "react";
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

  // Trap focus for delete mode
  const topTabTrapDeleteConfirmation = useRef();
  const bottomTabTrapDeleteConfirmation = useRef();

  const firstFocusableElementDeleteConfirmation = useRef();
  const lastFocusableElementDeleteConfirmation = useRef();
  useEffect(() => {
    document.addEventListener("focusin", trapFocus);

    return () => {
      document.removeEventListener("focusin", trapFocus);
    };

    function trapFocus(event) {
      if (event.target === topTabTrapDeleteConfirmation.current) {
        lastFocusableElementDeleteConfirmation.current.focus();
      }

      if (event.target === bottomTabTrapDeleteConfirmation.current) {
        firstFocusableElementDeleteConfirmation.current.focus();
      }
    }
  }, [
    firstFocusableElementDeleteConfirmation,
    lastFocusableElementDeleteConfirmation,
  ]);

  // Trap focus for edit mode
  const topTabTrapEditMode = useRef();
  const bottomTabTrapEditMode = useRef();

  const firstFocusableElementEditMode = useRef();
  const lastFocusableElementEditMode = useRef();
  useEffect(() => {
    if (isEditMode) {
      document.addEventListener("focusin", trapFocus);

      return () => {
        document.removeEventListener("focusin", trapFocus);
      };

      function trapFocus(event) {
        if (event.target === topTabTrapEditMode.current) {
          lastFocusableElementEditMode.current.focus();
        }

        if (event.target === bottomTabTrapEditMode.current) {
          firstFocusableElementEditMode.current.focus();
        }
      }
    }
  }, [isEditMode, firstFocusableElementEditMode, lastFocusableElementEditMode]);

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
                aria-label={`Delete your comment which is rating ${stars} ${
                  stars === 1 ? "star" : "stars"
                } and says '${text}'`}
              >
                <i className="fas fa-trash-alt"></i>Delete
              </button>
            )}
            {isEditMode && <span ref={topTabTrapEditMode} tabIndex="0"></span>}
            <button
              onClick={handleToggleEdit}
              aria-label={`Edit your comment which is rating ${stars} ${
                stars === 1 ? "star" : "stars"
              } and says '${text}'`}
              ref={isEditMode ? firstFocusableElementEditMode : null}
            >
              {isEditMode ? (
                "Cancel"
              ) : (
                <>
                  <i className="far fa-edit"></i>Edit
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {isEditMode ? (
        <Stars
          howManyStars={updatedComment.stars}
          handleSetStars={handleStarsChange}
          focusable={true}
        />
      ) : (
        <Stars howManyStars={stars} focusable={false} />
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
        <button
          className={styles.commentBox__editBtn}
          onClick={handleSubmit}
          ref={lastFocusableElementEditMode}
        >
          Edit
        </button>
      )}

      {isEditMode && <span ref={bottomTabTrapEditMode} tabIndex="0"></span>}

      {isDeleteConfirmationActive && (
        <>
          <div
            className={styles.commentBox__deleteConfirmationBackdrop}
            onClick={handleToggleDelete}
          ></div>
          <div className={styles.commentBox__deleteConfirmation}>
            <span ref={topTabTrapDeleteConfirmation} tabIndex="0"></span>
            <p>Are you sure you want to delete this comment?</p>
            <div className={styles.commentBox__deleteConfirmation__btns}>
              <button
                ref={firstFocusableElementDeleteConfirmation}
                className={
                  styles.commentBox__deleteConfirmation__btns__deleteBtn
                }
                autoFocus
                onClick={handleDeleteSubmit}
                aria-label="Delete the comment"
              >
                Delete
              </button>
              <button
                className={
                  styles.commentBox__deleteConfirmation__btns__cancelBtn
                }
                onClick={handleToggleDelete}
                ref={lastFocusableElementDeleteConfirmation}
                aria-label="Cancel delete process"
              >
                Cancel
              </button>
            </div>
            <span ref={bottomTabTrapDeleteConfirmation} tabIndex="0"></span>
          </div>
        </>
      )}
    </div>
  );
}
