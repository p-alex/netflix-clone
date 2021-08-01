import jwt from "jsonwebtoken";
const withProtect = (handler) => {
  return async (req, res) => {
    try {
      const token = req.cookies.token;
      if (token) {
        let decoded = await jwt.verify(
          token,
          process.env.SECRET,
          (err, decoded) => {
            if (err) return "Incorrect";
            return decoded;
          }
        );
        if (decoded === "Incorrect") {
          return res.json({ message: "Not allowed" });
        } else {
          req.userId = decoded?.id;
          return handler(req, res);
        }
      }
    } catch (error) {
      return res.json(error);
    }
  };
};

export default withProtect;
