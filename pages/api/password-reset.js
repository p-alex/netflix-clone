import User from "../../models/User";
import dbConnect from "../../utils/dbConnect";
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
dbConnect();
export default async function passwordReset(req, res) {
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
        return res.json({ ok: 0, message: "Passwords must match." });
      const user = await User.findOne({
        _id: passwordResetInfo.id,
      });
      if (user?._id) {
        const hashedPassword = await bcrypt.hash(
          passwordResetInfo.password,
          Number(process.env.SALT_ROUNDS)
        );
        if (hashedPassword) {
          await User.updateOne(
            { _id: passwordResetInfo.id },
            { $set: { password: hashedPassword } }
          );

          return res.json({ ok: 1, message: "Success" });
        }
      } else {
        return res.json({ ok: 0, message: "failed" });
      }
    } catch (error) {
      console.log(error);
      return res.json({ ok: 0, message: error });
    }
  }
}
