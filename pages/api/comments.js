import { MongoClient, ObjectId } from "mongodb";
import sanitize from "mongo-sanitize";
import withProtect from "../../middleware/withProtect";
const commentsHandler = async (req, res) => {
  const client = await MongoClient.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const usersCollection = client.db().collection("users");
  const moviesCollection = client.db().collection("movies");
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

      const user = await usersCollection.findOne({ _id: ObjectId(req.userId) });
      if (user.username && newComment.movieId) {
        const movieToAddComment = await moviesCollection.findOne({
          _id: ObjectId(newComment.movieId),
        });

        movieToAddComment.comments.map((comment) => {
          if (newComment.commentId === comment.commentId) {
            return res.json({
              ok: 0,
              message: "A comment with that id already exists",
            });
          }
        });

        const oldCommentsArray = movieToAddComment.comments;

        const updatedCommentsArray = [newComment, ...oldCommentsArray];

        const theResult = await moviesCollection.updateOne(
          {
            _id: ObjectId(newComment.movieId),
          },
          { $set: { comments: updatedCommentsArray } }
        );
        if (theResult.result.ok) {
          return res.json({ ok: 1, message: "Comment added successfully" });
        } else {
          return res.json({ ok: 0, message: "Failed to add comment" });
        }
      }
    } catch (error) {
      console.log(error);
      return res.json({ ok: 0, message: "Failed to add comment" });
    } finally {
      client.close();
    }
  }

  //   ------------------- EDIT COMMENT -------------------
  if (req.method === "PATCH") {
    try {
      const editedComment = cleanComment(req.body);
      if (editedComment === null)
        return res.json({ ok: 0, message: "GOOD ONE BUD" });

      const user = await usersCollection.findOne({ _id: ObjectId(req.userId) });

      if (user.username && editedComment.commentId) {
        const movieToEditComment = await moviesCollection.findOne({
          _id: ObjectId(editedComment.movieId),
        });
        const oldCommentsArray = movieToEditComment.comments;
        const updatedCommentsArray = oldCommentsArray.map((comment) => {
          if (comment.commentId === editedComment.commentId) {
            return editedComment;
          }
          return comment;
        });
        const theResult = await moviesCollection.updateOne(
          { _id: ObjectId(editedComment.movieId) },
          { $set: { comments: updatedCommentsArray } }
        );
        if (theResult.result.ok) {
          return res.json({
            ok: 1,
            message: "The comment was changed successfuly",
          });
        } else {
          return res.json({ ok: 0, message: "Something went wrong" });
        }
      }
    } catch (error) {
      return res.json({ ok: 0, message: "Something went wrong" });
    } finally {
      client.close();
    }
  }

  //   ------------------- DELETE COMMENT -------------------
  if (req.method === "DELETE") {
    try {
      const commentInfo = cleanDeleteCommentInfo(req.body);
      if (commentInfo === null)
        return res.json({ ok: 0, message: "Fock off bruv!" });

      const user = await usersCollection.findOne({
        _id: ObjectId(req.userId),
      });
      if (user.username && commentInfo) {
        const deleteCommentFromMovie = await moviesCollection.findOne({
          _id: ObjectId(commentInfo.movieId),
        });
        const oldCommentsArray = deleteCommentFromMovie.comments;
        const updatedCommentsArray = oldCommentsArray.filter(
          (co) => co.commentId !== commentInfo.commentId
        );
        const theResult = await moviesCollection.updateOne(
          { _id: ObjectId(commentInfo.movieId) },
          { $set: { comments: updatedCommentsArray } }
        );
        if (theResult.result.ok) {
          return res.json({
            ok: 1,
            message: "The comment has been deleted successfuly",
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
      console.log(error);
      return res.json({ ok: 0, message: "Something went wrong" });
    } finally {
      client.close();
    }
  }
};

export default withProtect(commentsHandler);
