import { MongoClient, ObjectId } from "mongodb";
import withProtect from "../../middleware/withProtect";
import sanitize from "mongo-sanitize";
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
const addCommentHandler = async (req, res) => {
  const client = await MongoClient.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const newComment = cleanComment(req.body);
  if (newComment === null)
    return res.json({ ok: 0, message: "PATHETIC! GET REKT MR. HACKER!!!!" });

  if (req.method === "POST") {
    try {
      const usersCollection = client.db().collection("users");
      const moviesCollection = client.db().collection("movies");
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
          res.json({ ok: 1, message: "Comment added successfully" });
        } else {
          res.json({ ok: 0, message: "Failed to add comment" });
        }
      }
    } catch (error) {
      console.log(error);
      res.json({ ok: 0, message: "Failed to add comment" });
    } finally {
      client.close();
    }
  }
};

export default withProtect(addCommentHandler);
