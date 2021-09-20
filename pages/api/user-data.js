import { MongoClient, ObjectId } from "mongodb";
import withProtect from "../../middleware/withProtect";
const userDataHandler = async (req, res) => {
  const client = await MongoClient.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  if (req.method === "GET") {
    try {
      const collection = client.db().collection("users");
      const user = await collection.findOne({ _id: ObjectId(req.userId) });
      if (user) {
        return res.json({
          message: "Found",
          username: user.username,
          profileImg: user.profileImg,
          isVerified: user.isVerified,
          movieList: user.movieList,
          date: user.date,
        });
      }
      return res.json({ message: "That user doesn't exist" });
    } catch (error) {
      res.json({ message: "Something went wrong" });
    } finally {
      client.close();
    }
  }
};

export default withProtect(userDataHandler);
