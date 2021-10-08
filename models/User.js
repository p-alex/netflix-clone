const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
    require: [true, "Please provide a username"],
  },
  email: {
    type: String,
    unique: true,
    require: [true, "Please provide an email"],
  },
  password: {
    type: String,
    require: [true, "Please provide a password"],
  },
  isVerified: {
    type: Boolean,
    require: [true, "Please provide a isVerified"],
  },
  date: {
    type: Date,
    default: Date.now(),
    require: [true, "Must add a date"],
  },
  profileImg: {
    type: String,
    require: [true, "Please provide a profile image url"],
  },
  movieList: {
    type: Array,
    require: [true, "Please provide a movieList array"],
  },
});

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
