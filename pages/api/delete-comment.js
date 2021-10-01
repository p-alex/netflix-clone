import { MongoClient, ObjectId } from "mongodb";
import withProtect from "../../middleware/withProtect";
import sanitize from "mongo-sanitize";
const commentSanitize = (commentToDelete) => {
  const { movieId, commentId } = commentToDelete;
  if (typeof movieId !== "string" || typeof commentId !== "string") {
    return null;
  } else {
    return sanitize({ ...commentToDelete });
  }
};
const deleteCommentHanlder = async (req, res) => {
  console.log(req.body);
  const client = await MongoClient.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const commentInfo = commentSanitize(req.body);
  if (commentInfo === null)
    return res.json({ ok: 0, message: "Fock off bruv!" });
  try {
    if (req.method === "POST") {
      const usersCollection = client.db().collection("users");
      const moviesCollection = client.db().collection("movies");
      const user = await usersCollection.findOne({ _id: ObjectId(req.userId) });
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
          res.json({
            ok: 1,
            message: "The comment has been deleted successfuly",
          });
        } else {
          res.json({ ok: 0, message: "Something went wrong" });
        }
      } else {
        res.jsno({ ok: 0, message: "User does not exists or no commentInfo" });
      }
    }
  } catch (error) {
    console.log(error);
    res.json({ ok: 0, message: "Something went wrong" });
  } finally {
    client.close();
  }
};

export default withProtect(deleteCommentHanlder);
