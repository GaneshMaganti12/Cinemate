const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const secretKey = process.env.SECRET_KEY;

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    default: "user",
  },

  created_at: {
    type: Date,
    default: Date.now(),
  },
});

userSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.isPasswordMatch = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.generateJwtToken = function () {
  return jwt.sign(
    { id: this._id, role: this.role, letter: this.email },
    secretKey,
    {
      expiresIn: "1h",
    }
  );
};

const User = mongoose.model("user", userSchema);

module.exports = User;
