import { MongoClient, ObjectId } from "mongodb";
import jwt from "jsonwebtoken";
export default async function verifyAccountHandler(req, res) {
  const client = await MongoClient.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const usersCollection = await client.db().collection("users");
  const nonVerifiedUsersCollection = await client
    .db()
    .collection("non-verified-users");

  if (req.method === "POST") {
    try {
      const { token } = req.body;

      console.log(token);

      const decoded = await jwt.verify(token, process.env.SECRET);

      if (!decoded.id) return res.json({ message: "Invalid token" });

      let user = await nonVerifiedUsersCollection.findOne({
        _id: ObjectId(decoded.id),
      });

      if (!user.username) {
        return res.json({ message: "That user doesn't exist" });
      }

      if (user.isVerified)
        return res.json({ message: "Your account is already verified!" });

      let updatedUser = { ...user, isVerified: true };

      const theResult = await usersCollection.insertOne(updatedUser);
      const deleteNonVerifiedUserVersion =
        await nonVerifiedUsersCollection.deleteOne({ _id: ObjectId(user._id) });
      if (theResult && deleteNonVerifiedUserVersion) {
        res.json({ message: "Verification Successful!" });
      }
    } catch (error) {
      res.json({ message: "Something went wrong" });
    } finally {
      client.close();
    }
  }
}
