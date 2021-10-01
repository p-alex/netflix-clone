import { MongoClient, ObjectId } from "mongodb";
import withProtect from "../../middleware/withProtect";
import sanitize from "mongo-sanitize";

const changeProfilePictureHandler = async (req, res) => {
  const client = await MongoClient.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const image = sanitize(req.body);
  if (req.method === "POST") {
    try {
      const userCollection = await client.db().collection("users");
      const user = await userCollection.findOne({ _id: ObjectId(req.userId) });
      if (user.username) {
        const theResult = await userCollection.updateOne(
          { _id: ObjectId(user._id) },
          { $set: { profileImg: image } }
        );
        if (theResult.result.ok) {
          res.json({ ok: 1, message: "Worked" });
        } else {
          res.json({ ok: 0, message: "Failed" });
        }
      } else {
        res.json({ ok: 0, message: "Something went wrong" });
      }
    } catch (error) {
      res.json({ ok: 0, message: "Failed" });
    } finally {
      client.close();
    }
  }
};

export default withProtect(changeProfilePictureHandler);
