import jwt from "jsonwebtoken";
const withProtect = (handler) => {
  return async (req, res) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      if (token) {
        let decoded = await jwt.verify(token, process.env.SECRET);
        if (!decoded.id) return res.json({ message: "Not allowed" });
        req.userId = decoded.id;
        return handler(req, res);
      }
    } catch (error) {
      return res.json(error);
    }
  };
};

export default withProtect;
