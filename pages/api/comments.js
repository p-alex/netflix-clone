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
    const { comment, currentMovieCommentsList } = req.body;
    try {
      const newComment = cleanComment(comment);
      if (newComment === null)
        return res.json({
          ok: 0,
          message: "Something is wrong with the request's body",
        });

      if (newComment.movieId) {
        if (!newComment.text)
          return res.json({ ok: 0, message: "Please write a comment." });
        if (!newComment.stars || newComment.stars < 0 || newComment.stars > 5)
          return res.json({
            ok: 0,
            message: "Stars value must be a number(min: 0, max: 5)",
          });
        currentMovieCommentsList.map((com) => {
          if (newComment.commentId === com.commentId) {
            return res.json({
              ok: 0,
              message: "A comment with that id already exists",
            });
          }
        });
        console.time("Update comments array");
        const theResult = await Movie.findByIdAndUpdate(
          {
            _id: newComment.movieId,
          },
          { $push: { comments: { $each: [newComment], $position: 0 } } }
        );
        console.timeEnd("Update comments array");
        console.log(theResult);
        if (theResult._id) {
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
        return res.json({
          ok: 0,
          message: "Something is wrong with the request's body",
        });
      if (!editedComment.text)
        return res.json({ ok: 0, message: "Please write a comment." });
      if (
        !editedComment.stars ||
        editedComment.stars < 0 ||
        editedComment.stars > 5
      )
        return res.json({
          ok: 0,
          message: "Stars value must be a number(min: 0, max: 5)",
        });
      if (editedComment.username) {
        const theResult = await Movie.updateOne(
          {
            _id: editedComment.movieId,
            "comments.commentId": editedComment.commentId,
          },
          { $set: { "comments.$": editedComment } }
        );
        if (theResult.acknowledged) {
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
        return res.json({
          ok: 0,
          message: "Something is wrong with the request's body",
        });

      if (commentInfo) {
        const theResult = await Movie.findByIdAndUpdate(
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
