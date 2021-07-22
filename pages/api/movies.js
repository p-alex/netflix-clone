import { MongoClient, ObjectId } from "mongodb";
import withProtect from "../../middleware/withProtect";
async function moviesHandler(req, res) {
  const client = await MongoClient.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  if (req.method === "GET") {
    const db = client.db();
    const collection = db.collection("users");
    const moviesCollection = db.collection("movies");

    try {
      const user = await collection.findOne({ _id: ObjectId(req.userId) });
      const movies = await moviesCollection.find({}).toArray();
      if (!user.username) {
        return res.json({ message: `User doesn't exist` });
      }
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
