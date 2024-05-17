const express = require("express");
const { isAuthorized } = require("../Middlewares/Auth");
const {
  createComment,
  getComments,
} = require("../Controllers/CommentsController");
const router = express.Router();

router.post("/comments", isAuthorized, createComment);

router.get("/comments/:movie_id", isAuthorized, getComments);

module.exports = router;
