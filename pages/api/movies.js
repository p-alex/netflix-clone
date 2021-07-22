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
      console.log(movies);
      res.json({
        message: "movies..",
        movies,
      });
    } catch {
      res.json({ message: "Something went wrong..." });
    } finally {
      client.close();
    }
  }
}
export default moviesHandler;
