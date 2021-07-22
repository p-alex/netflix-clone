import jwt from "jsonwebtoken";
const withProtect = (handler) => {
  return async (req, res) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
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
          console.log("HEREEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE");
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
