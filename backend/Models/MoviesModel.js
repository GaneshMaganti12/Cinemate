const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const moviesSchema = new Schema({
  title: {
    type: String,
    required: true,
  },

  year: {
    type: Number,
    required: true,
  },

  genre: {
    type: Array,
    required: true,
  },

  running_time: {
    type: Number,
  },

  rating: {
    type: Number,
  },

  movie_streaming_urls: {
    type: Array,
  },

  movie_trailer_url: {
    type: String,
  },

  certificate: {
    type: String,
  },

  plot: {
    type: String,
  },

  full_plot: {
    type: String,
  },

  movie_image_url: {
    type: String,
  },

  movie_videos: {
    type: Array,
  },

  movie_photos: {
    type: Array,
  },

  movie_cast: {
    type: Array,
  },

  directed_by: {
    type: Array,
  },

  produced_by: {
    type: Array,
  },

  production_companies: {
    type: Array,
  },

  budget: {
    type: Number,
  },

  box_office: {
    type: Number,
  },

  thumbnail_url: {
    type: String,
    required: true,
  },
});

const Movies = mongoose.model("movies", moviesSchema);

module.exports = Movies;
