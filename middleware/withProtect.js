import jwt from "jsonwebtoken";
const withProtect = (handler) => {
  return async (req, res) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      if (token) {
        let decoded = jwt.verify(token, process.env.SECRET, (err, decoded) => {
          if (err) console.log(err.message);
          return decoded;
        });
        if (!decoded) return res.json({ message: "Not allowed" });
        req.userId = decoded.id;
        return handler(req, res);
      }
    } catch (error) {
      return res.json(error);
    }
  };
};

export default withProtect;
