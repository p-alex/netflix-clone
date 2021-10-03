import { MongoClient } from "mongodb";
import sanitize from "mongo-sanitize";
import sgMail from "@sendgrid/mail";
import jwt from "jsonwebtoken";
const cleanEmail = (theEmail) => {
  const { email } = theEmail;
  if (typeof email !== "string") {
    return null;
  } else {
    return sanitize({ ...theEmail });
  }
};
export default async function passwordResetSendEmailHandler(req, res) {
  const client = await MongoClient.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const usersCollection = client.db().collection("users");

  if (req.method === "POST") {
    try {
      const { email } = cleanEmail(req.body);
      if (email === null)
        return res.json({ ok: 0, message: "Failed! Expected a string." });
      if (email === "") {
        return res.json({ ok: 0, message: "Please type your email address" });
      }
      const user = await usersCollection.findOne({ email });
      if (user?.email) {
        let token = await jwt.sign({ id: user._id }, process.env.SECRET, {
          expiresIn: "15m",
        });

        if (token) {
          if (process.env.NODE_ENV === "production") {
            sgMail.setApiKey(process.env.SEND_GRID_API_KEY);
            const msg = {
              to: email,
              from: "netflixclonepalex@gmail.com",
              subject: "Reset password | Netflixpalexclone",
              text: "Reset password",
              html: `<div style='text-align:center;position:relative; width:400px;padding:40px;margin:0 auto;background-color:black;color:white;font-family:Helvetica, sans-serif'><h1>Reset Your Password</h1><br/><br/><p style="color:white;font-size:1.1rem">Hi ${user.username},<br/>Tap the button below to reset your account password.<br/>If you didn't request a new password, you can safely delete this email.</p><br/><br/><a style='display:inline-block;text-decoration:none;background-color:#e50914;padding:15px;color:white;border-radius:5px;font-weight:bold;font-size:1.4rem;font-family:Helvetica, sans-serif;' href="https://netflix-clone-inky-five.vercel.app/user/reset-password/${user._id}/${token}" rel="noreferrer">Reset Password</a><br/><br/><p>If that doesn't work, copy and paste the following link in your browser:<br/><br/>https://netflix-clone-inky-five.vercel.app/user/reset-password/${user._id}/${token}</p></div>`,
            };
            sgMail
              .send(msg)
              .then(() => {
                return res.json({
                  ok: 1,
                  message: "We sent you an email if the account exists",
                });
              })
              .catch((error) => {
                return res.json({
                  ok: 0,
                  message: "Something went wrong! Please try again later.",
                });
              });
          } else {
            console.log(
              `http://localhost:3000/user/reset-password/${user._id}/${token}`
            );

            res.json({
              ok: 1,
              message: "We sent you an email if the account exists",
            });
          }
        } else {
          return res.json({
            ok: 0,
            message: "We sent you an email if the account exists",
          });
        }
      } else {
        return res.json({
          message: "We sent you an email if the account exists",
        });
      }
    } catch (error) {
      return res.json({ message: "Something went wrong..." });
    } finally {
      client.close();
    }
  }
}
