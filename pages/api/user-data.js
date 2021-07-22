import { MongoClient, ObjectId } from "mongodb";
import withProtect from "../../middleware/withProtect";
const userDataHandler = async (req, res) => {
  if (req.method === "GET") {
    const client = await MongoClient.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    try {
      const collection = client.db().collection("users");
      const user = await collection.findOne({ _id: ObjectId(req.userId) });
      if (user) {
        return res.json({
          message: `User: ${user.username}`,
          username: user.username,
          profileImg: user.profileImg,
          id: user._id,
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
