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
  if (req.method === "POST") {
    try {
      let movieId = cleanMovieId(req.body.movieId);

      if (movieId === null)
        return res.json({ ok: 0, message: "Failed! Expected a string." });
      let isMovieIdAlreadyInList = false;
      const userMovieList = await User.findById(req.userId);

      await userMovieList.movieList.map((movie) => {
        if (movie === movieId) {
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
