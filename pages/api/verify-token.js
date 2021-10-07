import { MongoClient, ObjectId } from "mongodb";

import jwt from "jsonwebtoken";
import sanitize from "mongo-sanitize";
const cleanAuthorization = (authorization) => {
  if (typeof authorization !== "string") {
    return null;
  } else {
    return "" + authorization;
  }
};

export default async function verifyTokenHandler(req, res) {
  const client = await MongoClient.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const collection = client.db().collection("users");
  if (req.method === "POST") {
    try {
      let cleanAuthorizationHeader = cleanAuthorization(
        sanitize(req.headers.authorization)
      );

      if (cleanAuthorization === null) {
        return res.json({ ok: 0, message: "Authorization must be a string" });
      }
      let token = cleanAuthorizationHeader.split(" ")[1];

      if (token) {
        let decoded = await jwt.verify(
          token,
          process.env.SECRET,
          (err, decoded) => {
            if (err) return "";
            return decoded;
          }
        );

        if (!decoded?.id) {
          return res.json({ ok: 0, message: "Invalid signiture" });
        }

        const user = await collection.findOne({ _id: ObjectId(decoded.id) });
        if (user?.username) {
          return res.json({ ok: 1, message: "Authorized" });
        } else {
          return res.json({ ok: 0, message: "That user doesn't exist" });
        }
      } else {
        return res.json({ ok: 0, message: "Token incorrect" });
      }
    } catch (error) {
      console.log(error);
      return res.json({ ok: 0, message: "Something went wrong" });
    } finally {
      client.close();
    }
  }
}
