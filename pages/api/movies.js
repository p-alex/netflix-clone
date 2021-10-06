import { MongoClient } from "mongodb";
import withProtect from "../../middleware/withProtect";
async function moviesHandler(req, res) {
  const client = await MongoClient.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  if (req.method === "GET") {
    const collection = client.db().collection("movies");
    try {
      const movies = await collection.find({}).toArray();
      return res.json({
        ok: 1,
        message: "Allowed",
        movies,
      });
    } catch {
      return res.json({
        ok: 0,
        message: "Something went wrong...",
        movies: [],
      });
    } finally {
      client.close();
    }
  }
}
export default withProtect(moviesHandler);
