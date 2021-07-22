import { MongoClient, ObjectId } from "mongodb";
import withProtect from "../../middleware/withProtect";
async function moviesHandler(req, res) {
  const client = await MongoClient.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  if (req.method === "GET") {
    const db = client.db();
    const moviesCollection = db.collection("movies");

    try {
      const movies = await moviesCollection.find({}).toArray();
      return res.json({
        message: "movies..",
        movies,
      });
    } catch {
      return res.json({ message: "Something went wrong..." });
    } finally {
      client.close();
    }
  }
}
export default withProtect(moviesHandler);
