import User from "../../models/User";
import NonVerifiedUser from "../../models/NonVerifiedUser";
import dbConnect from "../../utils/dbConnect";
import jwt from "jsonwebtoken";
dbConnect();
export default async function verifyAccountHandler(req, res) {
  if (req.method === "POST") {
    try {
      const { token } = req.body;

      const decoded = await jwt.verify(token, process.env.SECRET);

      if (!decoded.id) return res.json({ ok: 0, message: "Invalid token" });

      let user = await NonVerifiedUser.findById({
        _id: decoded.id,
      });
      if (!user?.username) {
        return res.json({ ok: 0, message: "That user doesn't exist" });
      }

      if (user.isVerified)
        return res.json({
          ok: 0,
          message: "Your account is already verified!",
        });
      let updatedUser = {
        username: user.username,
        email: user.email,
        password: user.password,
        isVerified: true,
        profileImg: user.profileImg,
      };
      const { username, email, password, isVerified, profileImg } = updatedUser;

      const newVerifiedUser = User({
        username,
        email,
        password,
        isVerified,
        profileImg,
      });

      let theResult = await newVerifiedUser.save();

      const deleteNonVerifiedUserVersion =
        await NonVerifiedUser.findOneAndDelete({
          _id: user._id,
        });

      if (theResult.username && deleteNonVerifiedUserVersion.username) {
        return res.json({ ok: 1, message: "Verification Successful!" });
      } else {
        return res.json({ ok: 0, message: "Didnt work" });
      }
    } catch (error) {
      console.log(error);
      return res.json({ ok: 0, message: "Something went wrong" });
    }
  }
}
