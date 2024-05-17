const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const watchlistSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },

    movie_id: {
      type: String,
      required: true,
      unique: true,
    },

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

    rating: {
      type: Number,
      required: true,
    },

    image_url: {
      type: String,
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Watchlist = mongoose.model("watchlist", watchlistSchema);

module.exports = Watchlist;
