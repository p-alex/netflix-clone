import { MongoClient, ObjectId } from "mongodb";
import withProtect from "../../middleware/withProtect";
const addCommentHandler = async (req, res) => {
  const client = await MongoClient.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  if (req.method === "POST") {
    try {
      const usersCollection = client.db().collection("users");
      const moviesCollection = client.db().collection("movies");
      const user = await usersCollection.findOne({ _id: ObjectId(req.userId) });

      if (user.username && req.body.comment.movieId) {
        const movieToAddComment = await moviesCollection.findOne({
          _id: ObjectId(req.body.comment.movieId),
        });
        const oldCommentsArray = movieToAddComment.comments;

        const updatedCommentsArray = [req.body.comment, ...oldCommentsArray];
        console.log(updatedCommentsArray);
        const theResult = await moviesCollection.updateOne(
          {
            _id: ObjectId(req.body.comment.movieId),
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
