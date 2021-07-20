import { MongoClient, ObjectId } from "mongodb";
import jwt from "jsonwebtoken";
export default async function verifyTokenHandler(req, res) {
  const client = await MongoClient.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const collection = await client.db().collection("users");
  if (req.method === "POST") {
    try {
      const token = req.headers.authorization.split(" ")[1];
      if (token) {
        console.log(token);
        let decoded = await jwt.verify(token, process.env.SECRET);
        if (decoded?.id) {
          const user = collection.findOne({ _id: ObjectId(decoded.id) });
          if (user) {
            return res.json({ message: "Authorized" });
          } else {
            return res.json({ message: "That user doesn't exist" });
          }
        } else {
          return res.json({ message: "Invalid signiture" });
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
