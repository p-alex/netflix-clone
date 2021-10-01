import { MongoClient, ObjectId } from "mongodb";
import withProtect from "../../middleware/withProtect";
import { sanitizeInput } from "../../sanitizeInput";

const cleanComment = (comment) => {
  const { username, profileImg, text, stars, movieId, commentId } = comment;
  let clean = {
    ...comment,
    username: sanitizeInput(username),
    profileImg: `${profileImg}`,
    text: `${text}`,
    stars: Number(stars),
    movieId: `${sanitizeInput(movieId)}`,
    commentId: `${sanitizeInput(commentId)}`,
  };
  return clean;
};

const addCommentHandler = async (req, res) => {
  const client = await MongoClient.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const comment = cleanComment(req.body.comment);
  if (comment === null)
    return res.json({ ok: 0, message: "Something is wrong with the comment" });

  if (req.method === "POST") {
    try {
      const usersCollection = client.db().collection("users");
      const moviesCollection = client.db().collection("movies");
      const user = await usersCollection.findOne({ _id: ObjectId(req.userId) });

      if (user.username && comment.movieId) {
        const movieToAddComment = await moviesCollection.findOne({
          _id: ObjectId(comment.movieId),
        });
        const oldCommentsArray = movieToAddComment.comments;

        const updatedCommentsArray = [comment, ...oldCommentsArray];

        const theResult = await moviesCollection.updateOne(
          {
            _id: ObjectId(sanitizeInput(commentcomment.movieId)),
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
