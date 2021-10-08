const mongoose = require("mongoose");

const nonVerifiedUserSchema = new mongoose.Schema({
  username: {
    type: String,
    require: [true, "Please add a username"],
    unique: true,
  },
  email: {
    type: String,
    require: [true, "Please add an email address"],
  },
  password: {
    type: String,
    require: [true, "Please add a password"],
  },
  isVerified: {
    type: Boolean,
    require: [true, "isVerified has to exist"],
  },
  date: {
    type: Date,
    default: Date.now(),
    require: [true, "Must add a date"],
  },
  profileImg: {
    type: String,
    require: [true, "Please provide profile image url"],
  },
  movieList: {
    type: Array,
    require: [true, "Please provide movie list"],
  },
});

module.exports =
  mongoose.models.nonverifieduser ||
  mongoose.model("nonverifieduser", nonVerifiedUserSchema);
