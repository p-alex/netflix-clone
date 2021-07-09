import { MongoClient, ObjectId } from "mongodb";
export default async function verifyHandler(req, res) {
  const client = await MongoClient.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const collection = client.db().collection("users");

  if (req.method === "POST") {
    try {
      const { id } = req.body;

      let user = await collection.findOne({ _id: ObjectId(id) });

      if (!user) {
        return res.json({ message: "That user doesn't exist" });
      }

      if (user.isVerified)
        return res.json({ message: "Your account is already verified!" });

      await collection.updateOne(
        { _id: ObjectId(id) },
        { $set: { isVerified: true } }
      );

      res.json({ message: "Verification Successful!" });
    } catch (error) {
      res.json({ message: "Something went wrong" });
    } finally {
      client.close();
    }
  }
}
