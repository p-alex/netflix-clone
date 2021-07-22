import { MongoClient, ObjectId } from "mongodb";
import jwt from "jsonwebtoken";
export default async function verifyTokenHandler(req, res) {
  const client = await MongoClient.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const collection = client.db().collection("users");
  if (req.method === "POST") {
    try {
      const token = req.headers.authorization.split(" ")[1];
      if (token) {
        let decoded = await jwt.verify(
          token,
          process.env.SECRET,
          (err, decoded) => {
            if (err) return "";
            return decoded;
          }
        );
        if (!decoded) {
          return res.json({ message: "Invalid signiture" });
        }

        const user = await collection.findOne({ _id: ObjectId(decoded.id) });
        if (user) {
          return res.json({
            message: "Authorized",
            username: user.username,
            profileImg: user.profileImg,
          });
        } else {
          return res.json({ message: "That user doesn't exist" });
        }
      }
    } catch (error) {
      console.log(error);
      return res.json(error.message);
    } finally {
      client.close();
    }
  }
}
