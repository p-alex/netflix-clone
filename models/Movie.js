const { Schema, models, model } = require("mongoose");

const commentsSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  profileImg: {
    type: String,
    required: true,
  },
  stars: {
    type: Number,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  movieId: {
    type: String,
    required: true,
  },
  commentId: {
    type: String,
    required: true,
  },
});

const movieSchema = new Schema({
  name: {
    type: String,
    required: [true, "Movie must have a name"],
  },
  nameSlug: {
    type: String,
    required: [true, "Movie must have a nameSlug"],
  },
  isOnlyOnNetflix: {
    type: Boolean,
    required: [true, "Movie must have a isOnlyOnNetflix"],
  },
  release: {
    type: Number,
    required: [true, "Movie must have a release date"],
  },
  maturityRating: {
    type: Number,
    required: [true, "Movie must have a maturityRating"],
  },
  duration: {
    type: String,
    required: [true, "Movie must have a duration"],
  },
  description: {
    type: String,
    required: [true, "Movie must have a description"],
  },
  directors: {
    type: Array,
    require: [true, "Movie must have a directors array"],
  },
  writer: {
    type: Array,
    required: [true, "Movie must have a writers array"],
  },
  cast: {
    type: Array,
    require: [true, "Movie must have a cast array"],
  },
  genres: {
    type: Array,
    required: [true, "Movie must have a genres array"],
  },
  thisMovieIs: {
    type: Array,
    required: [true, "Movie must have a thisMovieIs array"],
  },
  datePosted: {
    type: Date,
    required: [true, "Please add the date"],
    default: Date.now(),
  },
  comments: {
    type: [commentsSchema],
  },
  videoUrl: {
    type: String,
    required: [true, "Movie must have a videoUrl"],
  },
});

module.exports = models.Movie || model("Movie", movieSchema);
