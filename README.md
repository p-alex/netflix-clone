# Netflix Clone  


 **I kinda stole all the images and information about the movies from Netflix ... please don't sue me. I built this application just to have something to show in my portfolio so I can maybe land a job.**

---
![Application Screenshot](/public/images/application_screenshot/netflix-clone-screenshot.webp)

## Intro
Hey! This is a **fullstack Netflix Clone application** created with **Next Js**, **CSS Modules**, **MongoDb** and **SendGrid**. In this application, the movies are fetched from an API i created. 

You can:
* register a new account
* login
* login as guest
* reset password
* play movies (i just added trailers from youtube)
* see more info about the movie
* add movies to your list
* remove movies from your list
* add comments to movies (this feature does not exist in the official Netflix site)
* edit comments you wrote
* delete comments you wrote
* search for a movie
* change your profile picture.

The application also has an authentication system. You can sign up, sign in, logout and reset your password.
For sign up and reset password i use SendGrid to send emails for email verification.

## Link
[Live site url](https://netflix-clone-inky-five.vercel.app/) to see live version

## Features
* I used **NextJS** library to create my app. Next.js gives you the best developer experience with all the features you need for production: hybrid static & server rendering, TypeScript support, smart bundling, route pre-fetching, and more. No config needed.
* I used the **useContext API** to manage state. useContext is a hook built into React and allows you to distribute props to components without prop-drilling.
* To style my app i used **css-modules**. CSS modules are CSS files in which all class names and animation names are scoped locally by default.
* I used the **Mongoose** package to work with the mongodb database. Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment. It also allows you to specify the types of each property. This is great because this way you can prevent NOSQL injections.
* I used **SendGrid API** to send emails to users whenever they want to create a new account or reset their password.
* To secure user passwords i used **bcrypt** which allows you to hash and salt the passwords.
* For authentication i used **jsonwebtokens**. JSON Web Token (JWT, pronounced / dʒ ɒ t /, same as the word "jot") is a proposed Internet standard for creating data with optional signature and/or optional encryption whose payload holds JSON that asserts some number of claims.
* I used **cookie** npm package to create a cookie, and store to jwt token. I set the cookie to be httpOnly so it can't be accessed from the client, set it to be secure to ensure that the cookie will only get sent through encrypted channels, and i set the sameSite to Lax
