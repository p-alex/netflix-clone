//Mongoose
import dbConnect from '../../utils/dbConnect';
import NonVerifiedUser from '../../models/NonVerifiedUser';
import User from '../../models/User';

import cookie from 'cookie';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import sanitize from 'mongo-sanitize';
import sgMail from '@sendgrid/mail';

export default async function authHandler(req, res) {
  dbConnect();
  if (req.method === 'POST') {
    const { authType } = req.body;
    if (typeof authType !== 'string')
      return res.json({
        ok: 0,
        message: 'authType is expected to be a string',
      });
    try {
      //---------------------------------REGISTER---------------------------------
      if (authType === 'register') {
        const { username, email, password, confirmPassword } = sanitize(req.body);
        if (!username || !email || !password || !confirmPassword)
          return res.json({ ok: 0, message: 'Please fill in all fields' });

        //checks if the username is between 5 and 12 characters long
        const usernameRegexTest = /^[a-zA-Z0-9]{5,12}$/g.test(username);

        //checks if the email is valid
        const emailRegexTest = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/g.test(email);

        //checks for at least one lowercase and one uppercase letter, at least one number, at least one special character, at least 8 characters long
        const passwordRegexTest =
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*-]).{8,}$/g.test(password);

        if (!usernameRegexTest) {
          return res.json({
            ok: 0,
            message: 'Not a valid username.',
          });
        }
        if (!emailRegexTest) {
          return res.json({
            ok: 0,
            message: 'Please enter a valid email address.',
          });
        }
        if (!passwordRegexTest)
          return res.json({
            ok: 0,
            message: 'Not a valid password.',
          });

        const userWithEmail = await NonVerifiedUser.findOne({ email });

        const userWithUsername = await NonVerifiedUser.findOne({ username });

        if (userWithUsername)
          return res.json({
            ok: 0,
            message: 'A user with that username already exists',
          });

        if (userWithEmail)
          return res.json({
            ok: 0,
            message: 'A user with that email already exists',
          });

        if (password !== confirmPassword)
          return res.json({ ok: 0, message: 'Passwords must match' });

        const hashedPassword = await bcrypt.hash(
          password,
          Number(process.env.SALT_ROUNDS)
        );

        const newUser = NonVerifiedUser({
          username,
          email,
          password: hashedPassword,
          movieList: [],
          profileImg: `/images/default-profile-pictures/image-${Math.floor(
            Math.random() * (7 - 1) + 1
          )}.jpg`,
          isVerified: false,
        });

        const result = await newUser.save();

        if (result?._id) {
          const token = await jwt.sign({ id: result._id }, process.env.SECRET, {
            expiresIn: '25m',
          });
          if (process.env.NODE_ENV === 'production') {
            sgMail.setApiKey(process.env.SEND_GRID_API_KEY);
            const msg = {
              to: email,
              from: 'netflixclonepalex@gmail.com',
              subject: 'Email verification link from Netflixpalexclone',
              text: 'Click the button below to verify your account',
              html: `<div style='text-align:center;position:relative; width:400px;padding:40px;margin:0 auto;background-color:black;color:white;font-family:Helvetica, sans-serif'><h1>Hi ${username},</h1><br/><br/><p style="color:white;font-size:1.1rem">You have successfully created a Netflixpalexclone account.<br/>Please click on the link below to verify your email address and complete your registration.</p><br/><br/><a style='display:inline-block;text-decoration:none;background-color:#e50914;padding:15px;color:white;border-radius:5px;font-weight:bold;font-size:1.4rem;font-family:Helvetica, sans-serif;' href="https://netplix-inky-five.vercel.app/user/verify/${token}" rel="noreferrer">Verify your email</a><br/><br/><p>If that doesn't work, copy and paste the following link in your browser:<br/><br/>https://netplix-inky-five.vercel.app/user/verify/${token}</p></div></div>`,
            };
            sgMail
              .send(msg)
              .then(() => {
                return res.json({
                  ok: 1,
                  message:
                    'Success! We sent you an email to verify your account! Please check your email.',
                });
              })
              .catch((error) => {
                return res.json({
                  ok: 0,
                  message: 'Something went wrong! Please try again later.',
                });
              });
          } else {
            console.log(`http://localhost:3000/user/verify/${token}`);
            return res.json({
              ok: 1,
              message:
                'Success! We sent you an email to verify your account! Please check your email.',
            });
          }
        } else {
          return res.json({ ok: 0, message: 'Something went wrong' });
        }
      }

      //---------------------------------LOGIN---------------------------------
      if (authType === 'login') {
        const { email, password } = sanitize(req.body);

        if (!email || !password)
          return res.json({ message: 'Please fill in all fields' });

        if (typeof email !== 'string' || typeof password !== 'string') {
          return res.json({ ok: 0, message: 'Bruh....' });
        }

        const user = await User.findOne({ email });

        if (!user?._id)
          return res.json({
            ok: 0,
            message: 'Wrong email or password',
          });

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword)
          return res.json({ ok: 0, message: 'Wrong email or password' });

        if (!user.isVerified)
          return res.json({
            ok: 0,
            message: "Your account isn't verified! Please check your email.",
          });

        if (user && isValidPassword && user.isVerified) {
          const token = await jwt.sign({ id: user._id }, process.env.SECRET, {
            expiresIn: '72h',
          });
          res.setHeader(
            'Set-Cookie',
            cookie.serialize('token', token, {
              httpOnly: true,
              secure: true,
              sameSite: 'Lax',
              path: '/',
              expiresIn: 259200,
              maxAge: 259200,
            })
          );
          return res.json({
            ok: 1,
            message: 'Logged in!',
            user: {
              username: user.username,
              profileImg: user.profileImg,
            },
          });
        }
      }

      //---------------------------------LOGIN AS GUEST---------------------------------

      if (authType === 'guestLogin') {
        const user = await User.findOne({
          email: process.env.GUEST_ACCOUNT_EMAIL,
        });
        if (!user?.date)
          return res.json({
            ok: 0,
            message: 'Wrong email or password',
          });

        const isValidPassword = await bcrypt.compare(
          process.env.GUEST_ACCOUNT_PASSWORD,
          user.password
        );

        if (!isValidPassword)
          return res.json({ ok: 0, message: 'Wrong email or password' });

        if (user && isValidPassword && user.isVerified) {
          const token = await jwt.sign({ id: user._id }, process.env.SECRET, {
            expiresIn: '72h',
          });
          res.setHeader(
            'Set-Cookie',
            cookie.serialize('token', token, {
              httpOnly: true,
              secure: true,
              sameSite: 'Lax',
              path: '/',
              expiresIn: 259200,
              maxAge: 259200,
            })
          );
          return res.json({
            ok: 1,
            message: 'Logged in as Guest!',
            user: {
              username: user.username,
              profileImg: user.profileImg,
            },
          });
        }
      }

      //---------------------------------LOGOUT---------------------------------
      if (authType === 'logout') {
        res.setHeader(
          'Set-Cookie',
          cookie.serialize('token', '', {
            httpOnly: true,
            secure: true,
            sameSite: 'Strict',
            path: '/',
            expires: new Date(0),
          })
        );
        return res.json({ ok: 1, message: 'Logged out' });
      }

      return res.json({ ok: 0, message: 'Wrong authType' });
    } catch (error) {
      console.log(error);
      return res.json({ ok: 0, message: 'Something went wrong...' });
    }
  }
}
