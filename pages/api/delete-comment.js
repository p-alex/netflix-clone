import { MongoClient, ObjectId } from "mongodb";
import withProtect from "../../middleware/withProtect";
import sanitize from "mongo-sanitize";
const deleteCommentHanlder = async (req, res) => {
  const client = await MongoClient.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const commentInfo = sanitize(req.body);
  try {
    if (req.method === "POST") {
      const usersCollection = client.db().collection("users");
      const moviesCollection = client.db().collection("movies");
      const user = await usersCollection.findOne({ _id: ObjectId(req.userId) });
      if (user.username && commentInfo) {
        const deleteCommentFromMovie = await moviesCollection.findOne({
          _id: ObjectId(movieId),
        });
        const oldCommentsArray = deleteCommentFromMovie.comments;
        const updatedCommentsArray = oldCommentsArray.filter(
          (co) => co.commentId !== commentId
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
