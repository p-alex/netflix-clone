import { MongoClient } from "mongodb";
import cookie from "cookie";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import sgMail from "@sendgrid/mail";
export default async function authHandler(req, res) {
  const client = await MongoClient.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const collection = client.db().collection("users");

  if (req.method === "POST") {
    const { authType } = req.body;
    try {
      if (authType === "register") {
        //-----------REGISTER-----------
        const { username, email, password, confirmPassword, date } = req.body;

        const userWithEmail = await collection.findOne({ email });

        const userWithUsername = await collection.findOne({ username });

        if (!username || !email || !password || !confirmPassword)
          return res.json({ message: "Please fill in all fields" });

        if (userWithUsername)
          return res.json({
            message: "A user with that username already exists",
          });

        if (userWithEmail)
          return res.json({ message: "A user with that email already exists" });

        if (password !== confirmPassword)
          return res.json({ message: "Passwords must match" });

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await collection.insertOne({
          username,
          email,
          password: hashedPassword,
          isVerified: false,
          date: new Date(date),
          profileImg: `/images/default-profile-pictures/image-${Math.floor(
            Math.random() * 6
          )}.jpg`,
          movieList: [],
        });

        const token = await jwt.sign(
          { id: result.ops[0]._id },
          process.env.SECRET,
          {
            expiresIn: "25m",
          }
        );

        // sgMail.setApiKey(process.env.SEND_GRID_API_KEY);

        // const msg = {
        //   to: email,
        //   from: "netflixclonepalex@gmail.com",
        //   subject: "Verification code",
        //   text: "This is your code",
        //   html: `<div style='text-align:center;position:relative; width:400px;padding:40px;margin:0 auto;background-color:black;color:white;'><h1>Click the link to verify your account.</h1><br/><br/><a style='display:inline-block;text-decoration:none;background-color:#e50914;padding:15px;color:white;border-radius:5px;font-weight:bold;font-family:Helvetica, sans-serif;' href="http://localhost:3000/user/verify/${token}">Confirm account</a></div>`,
        // };

        // sgMail
        //   .send(msg)
        //   .then(() => {
        //     console.log("Email sent");
        //   })
        //   .catch((error) => {
        //     console.error(error);
        //     return res.json({message: 'Something went wrong! Please try again later.'})
        //   });

        console.log(`http://localhost:3000/user/verify/${token}`);
        res.json({ message: "Registered successfuly!" });
      }
      if (authType === "login") {
        //-----------LOGIN-----------
        const { email, password } = req.body;

        if (!email || !password)
          return res.json({ message: "Please fill in all fields" });

        const user = await collection.findOne({ email });

        if (!user)
          return res.json({
            message: "Wrong email or password",
          });

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword)
          return res.json({ message: "Wrong email or password" });

        if (!user.isVerified)
          return res.json({
            message: "Your account isn't verified! Please check your email.",
          });

        if (user && isValidPassword && user.isVerified) {
          const token = await jwt.sign({ id: user._id }, process.env.SECRET, {
            expiresIn: "72h",
          });
          res.setHeader(
            "Set-Cookie",
            cookie.serialize("token", token, {
              httpOnly: true,
              secure: process.env.NODE_ENV !== "development",
              sameSite: "Lax",
              path: "/",
              expiresIn: 259200,
              maxAge: 259200,
            })
          );
          res.json({
            message: "Logged in!",
            user: {
              username: user.username,
              profileImg: user.profileImg,
            },
          });
        }
      }

      if (authType === "logout") {
        //-----------LOGOUT-----------
        res.setHeader(
          "Set-Cookie",
          cookie.serialize("token", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            sameSite: "Strict",
            path: "/",
            expires: new Date(0),
          })
        );
        res.json({ message: "Logged out" });
      }
    } catch (error) {
      console.log(error);

      res.json({ message: "Something went wrong..." });
    } finally {
      client.close();
    }
  }
}
