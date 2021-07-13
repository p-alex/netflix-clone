import { MongoClient, ObjectId } from "mongodb";
import bcrypt from "bcryptjs";
export default async function passwordReset(req, res) {
  const client = await MongoClient.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const collection = client.db().collection("users");
  if (req.method === "POST") {
    try {
      const { password, confirmPassword, id } = req.body;
      console.log("id: " + ObjectId(req.body.id));
      if (password !== confirmPassword)
        return res.json({ message: "Passwords must match you fokin idiot" });
      const user = await collection.findOne({ _id: ObjectId(id) });
      if (user?._id) {
        const hashedPassword = await bcrypt.hash(password, 12);
        if (hashedPassword) {
          await collection.updateOne(
            { _id: ObjectId(id) },
            { $set: { password: hashedPassword } }
          );

          return res.json({ message: "Success" });
        }
      }
      res.json({ message: "failed" });
    } catch (error) {
      console.log(error);
      res.json({ message: error });
    }
  }
}
