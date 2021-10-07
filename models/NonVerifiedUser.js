const mongoose = require("mongoose");

const nonVerifiedUserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please add a username"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Please add an email address"],
  },
  password: {
    type: String,
    required: [true, "Please add a password"],
  },
  isVerified: {
    type: Boolean,
    required: [true, "isVerified has to exist"],
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  profileImg: {
    type: String,
    required: [true, "Please provide profile image url"],
  },
  movieList: {
    type: Array,
    required: [true, "Please provide movie list"],
  },
});

module.exports =
  mongoose.models.nonverifieduser ||
  mongoose.model("nonverifieduser", nonVerifiedUserSchema);
