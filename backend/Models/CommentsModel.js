const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    movie_id: {
      type: String,
      required: true,
    },

    comment: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Comments = mongoose.model("comments", CommentsSchema);

module.exports = Comments;
