const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tokenSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },

  token: {
    type: String,
    required: true,
  },

  created_at: {
    type: Date,
    default: Date.now(),
    expires: 3600,
  },
});

const Token = mongoose.model("token", tokenSchema);

module.exports = Token;
