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
      const passwordRegex =
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*-]).{8,}$/.test(
          password
        );
      if (!passwordRegex)
        return res.json({
          ok: 0,
          message: `
                Not a valid password.
              `,
        });

      console.log("id: " + ObjectId(req.body.id));
      if (password !== confirmPassword)
        return res.json({ message: "Passwords must match." });
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
    } finally {
      client.close();
    }
  }
}
