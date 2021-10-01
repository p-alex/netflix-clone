import { MongoClient, ObjectId } from "mongodb";
import withProtect from "../../middleware/withProtect";
import sanitize from "mongo-sanitize";
const commentSanitize = (editedComment) => {
  const { username, profileImg, text, stars, movieId, commentId } =
    editedComment;
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
    return sanitize({ ...editedComment });
  }
};
const editCommentHandler = async (req, res) => {
  const client = await MongoClient.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const editedComment = commentSanitize(req.body);
  console.log(editedComment);
  if (editedComment === null)
    return res.json({ ok: 0, message: "GOOD ONE BUD" });
  if (req.method === "POST") {
    try {
      const usersCollection = client.db().collection("users");
      const moviesCollection = client.db().collection("movies");
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
          res.json({ ok: 1, message: "The comment was changed successfuly" });
        } else {
          res.json({ ok: 0, message: "Something went wrong" });
        }
      }
    } catch (error) {
      console.log(error);
      res.json({ ok: 0, message: "Something went wrong" });
    } finally {
      client.close();
    }
  }
};

export default withProtect(editCommentHandler);
