import { MongoClient, ObjectId } from "mongodb";
import bcrypt from "bcryptjs";
import sanitize from "mongo-sanitize";
const cleanPasswordResetInfo = (passwordResetInfo) => {
  const { password, confirmPassword, id } = passwordResetInfo;
  if (
    typeof password !== "string" ||
    typeof confirmPassword !== "string" ||
    typeof id !== "string"
  ) {
    return null;
  } else {
    return sanitize({ ...passwordResetInfo });
  }
};
export default async function passwordReset(req, res) {
  const client = await MongoClient.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const collection = client.db().collection("users");
  if (req.method === "POST") {
    try {
      const passwordResetInfo = cleanPasswordResetInfo(req.body);
      if (passwordResetInfo === null)
        return res.json({ ok: 0, message: "Failed! Expected a string." });
      const passwordRegex =
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*-]).{8,}$/.test(
          passwordResetInfo.password
        );
      if (!passwordRegex)
        return res.json({
          ok: 0,
          message: `
                Not a valid password.
              `,
        });
      if (passwordResetInfo.password !== passwordResetInfo.confirmPassword)
        return res.json({ message: "Passwords must match." });
      const user = await collection.findOne({
        _id: ObjectId(passwordResetInfo.id),
      });
      if (user?._id) {
        const hashedPassword = await bcrypt.hash(
          passwordResetInfo.password,
          12
        );
        if (hashedPassword) {
          await collection.updateOne(
            { _id: ObjectId(passwordResetInfo.id) },
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
