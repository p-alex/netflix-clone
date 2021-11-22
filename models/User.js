const { Schema, models, model } = require("mongoose");

const userSchema = Schema({
  username: {
    type: String,
    unique: true,
    required: [true, "Please provide a username"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Please provide an email"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
  },
  isVerified: {
    type: Boolean,
    required: [true, "Please provide a isVerified"],
  },
  date: {
    type: Date,
    default: Date.now(),
    required: [true, "Must add a date"],
  },
  profileImg: {
    type: String,
    required: [true, "Please provide a profile image url"],
  },
  movieList: {
    type: Array,
    required: [true, "Please provide a movieList array"],
  },
});

module.exports = models.User || model("User", userSchema);
