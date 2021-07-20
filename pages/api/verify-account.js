import { MongoClient, ObjectId } from "mongodb";
import jwt from "jsonwebtoken";
export default async function verifyAccountHandler(req, res) {
  const client = await MongoClient.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const collection = client.db().collection("users");

  if (req.method === "POST") {
    try {
      const { token } = req.body;

      console.log(token);

      const decoded = await jwt.verify(token, process.env.SECRET);

      if (!decoded.id) return res.json({ message: "Invalid token" });

      let user = await collection.findOne({ _id: ObjectId(decoded.id) });

      if (!user) {
        return res.json({ message: "That user doesn't exist" });
      }

      if (user.isVerified)
        return res.json({ message: "Your account is already verified!" });

      await collection.updateOne(
        { _id: ObjectId(decoded.id) },
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
