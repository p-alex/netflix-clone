import { MongoClient } from "mongodb";
import sgMail from "@sendgrid/mail";
import jwt from "jsonwebtoken";
export default async function passwordResetSendEmailHandler(req, res) {
  const client = await MongoClient.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const collection = await client.db().collection("users");
  sgMail.setApiKey(process.env.SEND_GRID_API_KEY);
  if (req.method === "POST") {
    try {
      const { email } = req.body;
      const user = await collection.findOne({ email });
      console.log(user);
      if (user) {
        let token = await jwt.sign(
          { email: user.email, id: user._id },
          process.env.SECRET,
          { expiresIn: "15m" }
        );
        if (token) {
          console.log("here");
          const msg = {
            to: user.email,
            from: "netflixclonepalex@gmail.com",
            subject: "Password Reset",
            text: "Reset your passwordddd",
            html: `<div style='text-align:center;position:relative; width:400px;padding:40px;margin:0 auto;background-color:black;color:white;'><h1>Click the link to reset your password.</h1><br/><br/><a style='display:inline-block;text-decoration:none;background-color:#e50914;padding:15px;color:white;border-radius:5px;font-weight:bold;font-family:Helvetica, sans-serif;' href="http://localhost:3000/user/reset-password/${user._id}/${token}" rel=”noopener”>Reset password</a></div>`,
          };

          console.log("here2");

          // sgMail
          //   .send(msg)
          //   .then(() => {
          //     console.log("Email sent");
          //   })
          //   .catch((error) => {
          //     console.error(error);
          //     return res.json({
          //       message: "Something went wrong! Please try again later.",
          //     });
          //   });
          console.log(
            `http://localhost:3000/user/reset-password/${user._id}/${token}`
          );
          res.json({ message: "Sent" });
        }
      }
    } catch (error) {
      return res.json({ message: "Something went wrong..." });
    } finally {
      client.close();
    }
  }
}