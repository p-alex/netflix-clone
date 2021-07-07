import { MongoClient } from "mongodb";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
const authHandler = async (req, res) => {
  const client = await MongoClient.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = client.db();

  const collection = db.collection("users");

  if (req.method === "POST") {
    try {
      if (req.body.isRegister) {
        const { username, email, password, confirmPassword, date } = req.body;

        const userWithEmail = await collection.findOne({ email });

        const userWithUsername = await collection.findOne({ username });

        if (!username || !email || !password || !confirmPassword)
          return res.json({ message: "Please fill in all fields" });

        if (userWithEmail)
          return res.json({ message: "A user with that email already exists" });

        if (userWithUsername)
          return res.json({
            message: "A user with that username already exists",
          });

        if (password !== confirmPassword)
          return res.json({ message: "Passwords must match" });

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await collection.insertOne({
          username,
          email,
          password: hashedPassword,
          date: new Date(date),
        });

        res.json({ message: "Registered successfuly!" });
      } else {
        const { email, password } = req.body;

        if (!email || !password)
          return res.json({ message: "Please fill in all fields" });

        const user = await collection.findOne({ email });

        if (!user)
          return res.json({
            message: "The user with that email doesn't exist",
          });

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) return res.json({ message: "Wrong password" });

        if (user && isValidPassword) {
          const token = await jwt.sign(
            { username: user.username, email: user.email, id: user._id },
            process.env.SECRET,
            { expiresIn: "15m" }
          );

          res.json({
            message: "Logged in!",
            user: {
              username: user.username,
              email: user.email,
              id: user._id,
              token,
            },
          });
        }
      }
    } catch (error) {
      console.log(error);

      res.json({ message: "Something went wrong..." });
    } finally {
      client.close();
    }
  }
};

export default authHandler;
