import User from "../../models/User";
import dbConnect from "../../utils/dbConnect";
import withProtect from "../../middleware/withProtect";
import sanitize from "mongo-sanitize";
const cleanImage = (imgUrl) => {
  if (typeof imgUrl !== "string") {
    return null;
  } else if (
    /(\/images\/default-profile-pictures\/image-)([0-9]{1,2}).jpg/g.test(imgUrl)
  ) {
    return sanitize(imgUrl);
  } else {
    return null;
  }
};
dbConnect();
const changeProfilePictureHandler = async (req, res) => {
  const image = cleanImage(req.body);
  if (image === null) return res.json({ ok: 0, message: "Invalid image URL" });
  if (req.method === "POST") {
    try {
      const user = await User.findByIdAndUpdate(
        { _id: req.userId },
        { $set: { profileImg: image } }
      );
      if (user.username) {
        return res.json({ ok: 1, message: "Profile image changed!" });
      } else {
        return res.json({ ok: 0, message: "Failed to change profile image" });
      }
    } catch (error) {
      res.json({ ok: 0, message: "Something went wrong..." });
    }
  }
};

export default withProtect(changeProfilePictureHandler);
