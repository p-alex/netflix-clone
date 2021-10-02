import { MongoClient, ObjectId } from "mongodb";
import withProtect from "../../middleware/withProtect";
const cleanMovieId = (id) => {
  let movieId = id;
  console.log(movieId);
  if (typeof movieId !== "string") {
    return null;
  } else {
    return movieId;
  }
};
async function addMovieToListHandler(req, res) {
  const client = await MongoClient.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  if (req.method === "POST") {
    try {
      const usersCollection = client.db().collection("users");

      const user = await usersCollection.findOne({ _id: ObjectId(req.userId) });

      let movieId = cleanMovieId(req.body.movieId);
      if (movieId === null)
        return res.json({ ok: 0, message: "Failed! Expected a string." });

      if (movieId && user.username) {
        let oldMovieList = user.movieList;

        if (!oldMovieList.some((item) => item === movieId)) {
          // ADDING MOVIE ID TO MOVIE LIST
          let updatedMovieList = [movieId, ...oldMovieList];
          const updateMovieList = await usersCollection.updateOne(
            { _id: ObjectId(req.userId) },
            { $set: { movieList: updatedMovieList } }
          );

          if (updateMovieList.result.ok) {
            res.json({ ok: 1, message: "Movie added to list" });
          }
        } else {
          // REMOVING MOVIE ID FROM MOVIE LIST
          let updatedMovieList = oldMovieList.filter(
            (item) => item !== movieId
          );

          const updateMovieList = await usersCollection.updateOne(
            { _id: ObjectId(req.userId) },
            { $set: { movieList: updatedMovieList } }
          );

          if (updateMovieList.result.ok) {
            res.json({ ok: 1, message: "Movie removed from list" });
          }
        }
      } else {
        res.json({ ok: 0, message: "Something went wrong" });
      }
    } catch (error) {
      res.json({ ok: 0, message: "Something went wrong" });
    } finally {
      client.close();
    }
  }
}

export default withProtect(addMovieToListHandler);
