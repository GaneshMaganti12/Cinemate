const express = require("express");
const router = express.Router();
const {
  userChangePassword,
  userResetPassword,
  userNewPassword,
  userLogin,
  userRegister,
} = require("../Controllers/UserController");
const { isAuthenticated, isAuthorized } = require("../Middlewares/Auth");

router.post("/register", userRegister);

router.post("/login", isAuthenticated, userLogin);

router.patch("/change-password", isAuthorized, userChangePassword);

router.post("/reset-password", userResetPassword);

router.post("/reset-password/:user_id/:token", userNewPassword);

module.exports = router;
