import Movie from "../../models/Movie";
import dbConnect from "../../utils/dbConnect";
import sanitize from "mongo-sanitize";
import withProtect from "../../middleware/withProtect";
dbConnect();
const commentsHandler = async (req, res) => {
  const cleanComment = (comment) => {
    const { username, profileImg, text, stars, movieId, commentId } = comment;
    if (
      typeof username !== "string" ||
      typeof profileImg !== "string" ||
      typeof text !== "string" ||
      typeof stars !== "number" ||
      typeof movieId !== "string" ||
      typeof commentId !== "string"
    ) {
      return null;
    } else {
      return sanitize({ ...comment });
    }
  };

  const cleanDeleteCommentInfo = (commentToDelete) => {
    const { movieId, commentId } = commentToDelete;
    if (typeof movieId !== "string" || typeof commentId !== "string") {
      return null;
    } else {
      return sanitize({ ...commentToDelete });
    }
  };

  //   ------------------- ADD COMMENT -------------------
  if (req.method === "POST") {
    try {
      const newComment = cleanComment(req.body);
      if (newComment === null)
        return res.json({
          ok: 0,
          message: "PATHETIC! GET REKT MR. HACKER!!!!",
        });

      if (newComment.movieId) {
        console.time("find the movie");
        const movieToAddComment = await Movie.findById(newComment.movieId);
        console.timeEnd("find the movie");
        await movieToAddComment.comments.map((comment) => {
          if (newComment.commentId === comment.commentId) {
            return res.json({
              ok: 0,
              message: "A comment with that id already exists",
            });
          }
        });
        console.time("Update comments array");
        const theResult = await Movie.updateOne(
          {
            _id: newComment.movieId,
          },
          { $push: { comments: { $each: [newComment], $position: 0 } } }
        );
        console.timeEnd("Update comments array");
        if (theResult) {
          return res.json({ ok: 1, message: "Comment added successfully" });
        } else {
          return res.json({ ok: 0, message: "Failed to add comment" });
        }
      } else {
        return res.json({ ok: 0, message: "Something is not right" });
      }
    } catch (error) {
      return res.json({ ok: 0, message: "Failed to add comment" });
    }
  }

  //   ------------------- EDIT COMMENT -------------------
  if (req.method === "PUT") {
    try {
      const editedComment = cleanComment(req.body);
      if (editedComment === null)
        return res.json({ ok: 0, message: "GOOD ONE BUD" });
      if (editedComment.commentId) {
        const theResult = await Movie.updateOne(
          {
            _id: editedComment.movieId,
            "comments.commentId": editedComment.commentId,
          },
          { $set: { "comments.$": editedComment } }
        );
        if (theResult) {
          return res.json({
            ok: 1,
            message: "The comment was changed successfuly",
          });
        } else {
          return res.json({ ok: 0, message: "Didnt work" });
        }
      }
    } catch (error) {
      return res.json({ ok: 0, message: "Something went wrong" });
    }
  }

  //   ------------------- DELETE COMMENT -------------------
  if (req.method === "DELETE") {
    try {
      const commentInfo = cleanDeleteCommentInfo(req.body);
      if (commentInfo === null)
        return res.json({ ok: 0, message: "Fock off bruv!" });

      if (commentInfo) {
        const theResult = await Movie.updateOne(
          {
            _id: commentInfo.movieId,
          },
          { $pull: { comments: { commentId: commentInfo.commentId } } }
        );
        if (theResult) {
          return res.json({
            ok: 1,
            message: "The comment has been deleted successfully",
          });
        } else {
          return res.json({ ok: 0, message: "Something went wrong" });
        }
      } else {
        return res.json({
          ok: 0,
          message: "User does not exist or no commentInfo",
        });
      }
    } catch (error) {
      return res.json({ ok: 0, message: "Something went wrong" });
    }
  }
};

export default withProtect(commentsHandler);