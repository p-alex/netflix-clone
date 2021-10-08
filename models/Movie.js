const mongoose = require("mongoose");

const movieSchema = mongoose.Schema({
  name: {
    type: String,
    require: [true, "Movie must have a name"],
  },
  nameSlug: {
    type: String,
    require: [true, "Movie must have a nameSlug"],
  },
  isOnlyOnNetflix: {
    type: Boolean,
    require: [true, "Movie must have a isOnlyOnNetflix"],
  },
  release: {
    type: Number,
    require: [true, "Movie must have a release date"],
  },
  maturityRating: {
    type: Number,
    require: [true, "Movie must have a maturityRating"],
  },
  duration: {
    type: String,
    require: [true, "Movie must have a duration"],
  },
  description: {
    type: String,
    require: [true, "Movie must have a description"],
  },
  directors: {
    type: Array,
    require: [true, "Movie must have a directors array"],
  },
  writer: {
    type: Array,
    require: [true, "Movie must have a writers array"],
  },
  cast: {
    type: Array,
    require: [true, "Movie must have a cast array"],
  },
  genres: {
    type: Array,
    require: [true, "Movie must have a genres array"],
  },
  thisMovieIs: {
    type: Array,
    require: [true, "Movie must have a thisMovieIs array"],
  },
  datePosted: {
    type: Date,
    require: [true, "Please add the date"],
    default: Date.now(),
  },
  comments: {
    type: Array,
    required: [true, "Movie must have a comments array"],
  },
  videoUrl: {
    type: String,
    required: [true, "Movie must have a videoUrl"],
  },
});

module.exports = mongoose.models.Movie || mongoose.model("Movie", movieSchema);
