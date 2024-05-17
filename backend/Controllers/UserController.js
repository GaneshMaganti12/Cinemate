const asyncHandler = require("express-async-handler");
const User = require("../Models/UserModel");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const Token = require("../Models/Token");
const { sendToUserMail } = require("../Utils/Utils");
require("dotenv").config();

exports.userRegister = asyncHandler(async (req, res) => {
  try {
    const user = await User.create(req.body);

    let mailDetails = {
      from: "cinemate.app@gmail.com",
      to: user.email,
      subject: "Cinemate Registeration",
      text: "Your successfully registered in Cinemate Website",
    };

    sendToUserMail(mailDetails);

    res
      .status(201)
      .json({ success: true, message: "You are successfully registered" });
  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      res.status(403).json({ success: false, message: "User already exists." });
    } else {
      console.log(error);
      res.status(500).json({
        success: false,
        message: error.name,
      });
    }
  }
});

exports.userLogin = asyncHandler(async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(404).json({ success: false, message: "User does not exist" });
    } else {
      const token = await user.generateJwtToken();
      res.status(200).json({ success: true, jwtToken: token });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.name,
    });
  }
});

exports.userResetPassword = asyncHandler(async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    const clientHost = req.headers["client-host"];
    const clientProtocal = req.headers["client-protocal"];

    if (!user) {
      res.status(404).json({ success: false, message: "User does not exist" });
    } else {
      let token = await Token.findOne({ user_id: user._id });
      if (!token) {
        token = await Token({
          user_id: user._id,
          token: crypto.randomBytes(32).toString("hex"),
        }).save();
      }

      const resetURL = `${clientProtocal}//${clientHost}/reset/${token.user_id}/${token.token}`;

      let mailDetails = {
        from: "cinemate.app@gmail.com",
        to: user.email,
        subject: "Cinemate Password Reset",
        html: `
             <p>You requested for password reset</p>
             <h5>click in this <a href="${resetURL}">link</a> to reset password</h5>
             `,
      };

      sendToUserMail(mailDetails);

      res
        .status(200)
        .json({ success: true, message: "Please check your mail" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.name,
    });
  }
});

exports.userNewPassword = asyncHandler(async (req, res) => {
  try {
    const userId = req.params.user_id;

    let user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ success: false, message: "User does not exist" });
    } else {
      const token = await Token.findOne({
        user_id: userId,
        token: req.params.token,
      });
      if (!token) {
        res.status(403).json({
          success: false,
          message: "The link has been invalid or expired.",
        });
      } else {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        await User.updateOne(
          {
            _id: user._id,
          },
          { $set: { password: hashedPassword } }
        );

        await token.deleteOne();

        res.status(201).json({
          success: true,
          message: "Your password has been reset successfully",
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.name,
    });
  }
});

exports.userChangePassword = asyncHandler(async (req, res) => {
  try {
    const userId = req.id;
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ success: false, message: "User does not exist" });
    } else {
      const isPasswordMatched = await user.isPasswordMatch(req.body.password);
      if (!isPasswordMatched) {
        res
          .status(403)
          .json({ success: false, message: "You're entered wrong password" });
      } else {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.newPassword, salt);

        await User.findOneAndUpdate(
          { _id: userId },
          { password: hashedPassword }
        );

        res.status(201).json({
          success: true,
          message: "Your Password has been successfully changed",
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.name,
    });
  }
});
