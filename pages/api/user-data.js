import User from "../../models/User";
import dbConnect from "../../utils/dbConnect";
import withProtect from "../../middleware/withProtect";
dbConnect();
const userDataHandler = async (req, res) => {
  if (req.method === "GET") {
    try {
      const user = await User.findById({ _id: req.userId });
      if (user?.username) {
        return res.json({
          ok: 1,
          message: "Found user!",
          username: user.username,
          profileImg: user.profileImg,
          isVerified: user.isVerified,
          movieList: user.movieList,
          date: user.date,
        });
      }
      return res.json({ ok: 0, message: "That user doesn't exist" });
    } catch (error) {
      return res.json({ ok: 0, message: "Something went wrong" });
    }
  }
};

export default withProtect(userDataHandler);
