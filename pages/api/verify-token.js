import User from "../../models/User";
import dbConnect from "../../utils/dbConnect";
import jwt from "jsonwebtoken";
dbConnect();
export default async function verifyTokenHandler(req, res) {
  if (req.method === "POST") {
    try {
      let token = req.headers.authorization.split(" ")[1];
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

        const user = await User.findById({
          _id: decoded.id,
        });

        if (user.username) {
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
    }
  }
}
