import { MongoClient } from "mongodb";
import withProtect from "../../middleware/withProtect";
async function moviesHandler(req, res) {
  if (req.method === "POST") {
    const client = await MongoClient.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const collection = client.db().collection("users");
    try {
      const user = await collection.find({ _id: req.userId });
      if (user) {
        return res.json({ message: "movies.." });
      }
      return res.json({ message: `User doesn't exist` });
    } catch {
      return res.json({ message: "Something went wrong..." });
    } finally {
      client.close();
    }
  }
}
export default withProtect(moviesHandler);
