import Movie from "../../models/Movie";
import dbConnect from "../../utils/dbConnect";
import withProtect from "../../middleware/withProtect";
dbConnect();
async function moviesHandler(req, res) {
  if (req.method === "GET") {
    try {
      const movies = await Movie.find({});
      if (movies.length) {
        return res.json({
          ok: 1,
          message: "Allowed",
          movies,
        });
      } else {
        return res.json({ ok: 0, message: "Couldn't get movies" });
      }
    } catch {
      return res.json({
        ok: 0,
        message: "Something went wrong...",
        movies: [],
      });
    }
  }
}
export default withProtect(moviesHandler);
