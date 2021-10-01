import { MongoClient, ObjectId } from "mongodb";
import withProtect from "../../middleware/withProtect";
const cleanEditedComment = (editedComment) => {
  const { username, profileImg, text, stars, movieId, commentId } =
    editedComment;
  let clean = {
    ...editedComment,
    username: `${username}`,
    profileImg: `${profileImg}`,
    text: `${text}`,
    stars: Number(stars),
    movieId: `${movieId}`,
    commentId: `${commentId}`,
  };
  return clean;
};
const editCommentHandler = async (req, res) => {
  const client = await MongoClient.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  if (req.method === "POST") {
    try {
      const usersCollection = client.db().collection("users");
      const moviesCollection = client.db().collection("movies");
      const user = await usersCollection.findOne({ _id: ObjectId(req.userId) });
      const editedComment = cleanEditedComment(req.body);
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
