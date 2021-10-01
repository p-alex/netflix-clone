import { MongoClient } from "mongodb";
import cookie from "cookie";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import sanitize from "mongo-sanitize";
//import sgMail from "@sendgrid/mail";
export default async function authHandler(req, res) {
  const client = await MongoClient.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const usersCollection = client.db().collection("users");
  const nonVerifiedUsersCollection = client
    .db()
    .collection("non-verified-users");

  if (req.method === "POST") {
    const { authType } = sanitize(req.body);
    if (authType === null)
      return res.json({
        ok: 0,
        message: "authType is expected to be a string",
      });
    try {
      if (authType === "register") {
        //-----------REGISTER-----------
        const {
          username,
          email,
          password,
          confirmPassword,
          date,
          movieList,
          isRegister,
        } = sanitize(req.body);
        console.log(typeof req.body.movieList);
        if (!username || !email || !password || !confirmPassword)
          return res.json({ message: "Please fill in all fields" });

        if (
          typeof username !== "string" ||
          typeof email !== "string" ||
          typeof password !== "string" ||
          typeof confirmPassword !== "string" ||
          typeof authType !== "string" ||
          typeof date !== "number" ||
          typeof movieList !== "object" ||
          typeof isRegister !== "boolean"
        ) {
          return res.json({ ok: 0, message: "Bruh...." });
        }

        //checks if the username is between 5 and 12 characters long
        const usernameRegexTest = /^[a-zA-Z0-9]{5,12}$/.test(username);

        //checks if the email looks like this: example@example.example
        const emailRegexTest = /^([a-zA-Z0-9]*)@([a-z]*)\.([a-z]+)$/.test(
          email
        );

        //checks for at least one lowercase and one uppercase letter, at least one number, at least one special character, at least 8 characters long
        const passwordRegexTest =
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*-]).{8,}$/.test(
            password
          );

        if (!usernameRegexTest) {
          return res.json({
            ok: 0,
            message: "Not a valid username.",
          });
        }
        if (!emailRegexTest) {
          return res.json({
            ok: 0,
            message: "Please enter a valid email address.",
          });
        }
        if (!passwordRegexTest)
          return res.json({
            ok: 0,
            message: `
                Not a valid password.
              `,
          });

        const userWithEmail = await usersCollection.findOne({ email });

        const userWithUsername = await usersCollection.findOne({ username });

        if (userWithUsername)
          return res.json({
            ok: 0,
            message: "A user with that username already exists",
          });

        if (userWithEmail)
          return res.json({
            ok: 0,
            message: "A user with that email already exists",
          });

        if (password !== confirmPassword)
          return res.json({ ok: 0, message: "Passwords must match" });

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await nonVerifiedUsersCollection.insertOne({
          username,
          email,
          password: hashedPassword,
          isVerified: false,
          date: new Date(date),
          profileImg: `/images/default-profile-pictures/image-${Math.floor(
            Math.random() * (7 - 1) + 1
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
        //   subject: "Verification link",
        //   text: "Click the button below to verify your account",
        //   html: `<div style='text-align:center;position:relative; width:400px;padding:40px;margin:0 auto;background-color:black;color:white;'><h1>Click the link to verify your account.</h1><br/><br/><a style='display:inline-block;text-decoration:none;background-color:#e50914;padding:15px;color:white;border-radius:5px;font-weight:bold;font-family:Helvetica, sans-serif;' href="https://netflix-clone-inky-five.vercel.app/user/verify/${token}">Confirm account</a></div>`,
        // };

        // sgMail
        //   .send(msg)
        //   .then(() => {
        //     console.log("Email sent");
        //     return res.json({
        //       ok: 1,
        //       message:
        //         "Success! We sent you an email to verify your account! Please check your email.",
        //     });
        //   })
        //   .catch((error) => {
        //     console.error(error);
        //     return res.json({
        //       ok: 0,
        //       message: "Something went wrong! Please try again later.",
        //     });
        //   });

        console.log(`http://localhost:3000/user/verify/${token}`);
        return res.json({
          ok: 1,
          message:
            "Success! We sent you an email to verify your account! Please check your email.",
        });
      }
      if (authType === "login") {
        //-----------LOGIN-----------
        const { email, password } = sanitize(req.body);

        if (!email || !password)
          return res.json({ message: "Please fill in all fields" });

        if (typeof email !== "string" || typeof password !== "string") {
          return res.json({ ok: 0, message: "Bruh...." });
        }

        const user = await usersCollection.findOne({ email });

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
      if (!authType || authType !== "string") {
        res.json({ ok: 0, message: "authType is required" });
      }
    } catch (error) {
      console.log(error);

      res.json({ message: "Something went wrong..." });
    } finally {
      client.close();
    }
  }
}
