import User from "../../models/User";
import dbConnect from "../../utils/dbConnect";
import withProtect from "../../middleware/withProtect";
const cleanMovieId = (id) => {
  let movieId = id;
  if (typeof movieId !== "string") {
    return null;
  } else {
    return movieId;
  }
};
dbConnect();
async function addMovieToListHandler(req, res) {
  const { movieId, currentUserMovieList } = req.body;
  if (req.method === "POST") {
    try {
      let id = cleanMovieId(movieId);
      if (id === null)
        return res.json({ ok: 0, message: "Failed! Expected a string." });
      let isMovieIdAlreadyInList = false;
      await currentUserMovieList.map((movie) => {
        if (movie === id) {
          isMovieIdAlreadyInList = true;
          return;
        }
      });
      let theResult;
      if (isMovieIdAlreadyInList) {
        // Remove movie id from list
        theResult = await User.updateOne(
          {
            _id: req.userId,
          },
          { $pull: { movieList: movieId } }
        );
      } else {
        // Add movie id to list
        theResult = await User.updateOne(
          {
            _id: req.userId,
          },
          { $push: { movieList: { $each: [movieId], $position: 0 } } }
        );
      }
      if (theResult) {
        if (isMovieIdAlreadyInList) {
          return res.json({ ok: 1, message: "Movie removed from list" });
        } else {
          return res.json({ ok: 1, message: "Movie added to list" });
        }
      } else {
        return res.json({ ok: 0, message: "Didn't work" });
      }
    } catch (error) {
      console.log(error);
      return res.json({ ok: 0, message: "Something went wrong" });
    }
  }
}

export default withProtect(addMovieToListHandler);
