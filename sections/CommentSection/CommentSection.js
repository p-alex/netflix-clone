import { useState, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import CommentBox from "../../components/CommentBox/CommentBox";
import Stars from "../../components/Stars/Stars";
import ProjectContext from "../../context/Project-context";
import styles from "./CommentSection.module.css";
export default function CommentSection({ movie }) {
  const context = useContext(ProjectContext);
  const { handleAddNewComment } = context;
  const { profileImg, username } = context.userData;
  const [comment, setComment] = useState({
    username,
    profileImg,
    text: "",
    stars: 0,
    movieId: movie._id,
  });

  const handleSetStars = (value) =>
    setComment((prevState) => ({ ...prevState, stars: value }));

  const handleSetText = (e) =>
    setComment((prevState) => ({ ...prevState, text: e.target.value }));

  const handleSubmit = (comment) => {
    if (comment.stars !== 0) {
      const commentObject = {
        ...comment,
        commentId: uuidv4(),
      };
      handleAddNewComment(commentObject);
    }
  };
  return (
    <section className={styles.commentSection}>
      <h2>Comments - {movie.comments.length}</h2>
      {movie.comments.length ? (
        movie.comments.map((comment) => {
          return (
            <CommentBox
              key={comment.commentId}
              profileImg={comment.profileImg}
              username={comment.username}
              text={comment.text}
              stars={comment.stars}
              movieId={movie._id}
              commentId={comment.commentId}
            />
          );
        })
      ) : (
        <p>Be the first to add a comment!</p>
      )}
      <Stars howManyStars={comment.stars} handleSetStars={handleSetStars} />
      <textarea
        type="text"
        placeholder="Comment...(Optional)"
        onChange={(e) => handleSetText(e)}
      />
      <button onClick={() => handleSubmit(comment)}>Comment</button>
    </section>
  );
}
