const asyncHandler = require("express-async-handler");
const User = require("../Models/UserModel");
const jwt = require("jsonwebtoken");

const secretKey = process.env.SECRET_KEY;

exports.isAuthenticated = asyncHandler(async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(404).json({ success: false, message: "User does not exist" });
    } else {
      const isPasswordMatched = await user.isPasswordMatch(req.body.password);
      if (!isPasswordMatched) {
        res
          .status(403)
          .json({ success: false, message: "You're entered wrong password" });
      } else {
        next();
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Somenthing went wrong, please try again",
    });
  }
});

exports.isAuthorized = asyncHandler(async (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    if (!token) {
      res
        .status(403)
        .json({ success: false, message: "You are not authorized" });
    } else {
      const jwtToken = token.split(" ");
      const decodeToken = jwt.verify(jwtToken[1], secretKey);
      if (!decodeToken) {
        res
          .status(403)
          .json({ success: false, message: "You are not authorized" });
      } else {
        req.id = decodeToken.id;
        req.role = decodeToken.role;
        next();
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Somenthing went wrong, please try again",
    });
  }
});

exports.authorizedRole = (role) => {
  return (req, res, next) => {
    if (role === req.role) {
      next();
    } else {
      res.status(403).json({
        success: false,
        message: "You are not authorize to access the data",
      });
    }
  };
};
