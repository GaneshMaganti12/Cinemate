const asyncHandler = require("express-async-handler");
const Comments = require("../Models/CommentsModel");

exports.createComment = asyncHandler(async (req, res) => {
  try {
    await Comments.create(req.body);
    res
      .status(201)
      .json({ success: true, message: "You have created a comment" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

exports.getComments = asyncHandler(async (req, res) => {
  try {
    const movieId = req.params.movie_id;
    const comments = await Comments.find({ movie_id: movieId }).sort({
      createdAt: -1,
    });
    res.status(201).json({ success: true, data: comments });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});
