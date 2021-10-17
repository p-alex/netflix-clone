# Netflix Clone
---
![Application Screenshot](/public/images/application_screenshot/application_screenshot.jpg)
## Table of contents

* [Overview](#overview)
  * [Intro](#intro)
  * [Links](#links)
* [My process](#my-process)
  * [Built with](#built-with)
---

## Overview
### Intro
Hey! This is a **fullstack Netflix Clone application** created with **Next Js**, **CSS Modules**, **MongoDb** and **SendGrid**. In this application, the movies are fetched from an API i created. 

In this application you can play the movies (i just added trailers from youtube), see more info about the movie, add the movie to your list, add comments to movies (this feature does not exist in the official Netflix site), and search for a movie. You can also change your profile picture. 

The application also has an authentication system. You can sign up, sign in, logout and reset your password.
For sign up and reset password i use SendGrid to send emails for email verification.

## My process
* I used **NextJS** library to create my app. Next.js gives you the best developer experience with all the features you need for production: hybrid static & server rendering, TypeScript support, smart bundling, route pre-fetching, and more. No config needed.
* I used the **useContext API** to manage global state. useContext is a hook built into React and allows you to distribute props to components without prop-drilling.
* To style my app i used **css-modules**. CSS modules are CSS files in which all class names and animation names are scoped locally by default.
* I used the **Mongoose** package to work with the mongodb database. Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment. It also allows you to specify the types of each property. This is great because this way you can prevent NOSQL injections.
