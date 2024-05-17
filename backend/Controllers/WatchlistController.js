const asyncHandler = require("express-async-handler");
const Watchlist = require("../Models/WatchlistModel");
const { ObjectId } = require("mongodb");

exports.createWatchlist = asyncHandler(async (req, res) => {
  try {
    await Watchlist.create(req.body);
    res.status(201).json({
      success: true,
      message: "The movie has been added to Watchlist",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

exports.getWatchlist = asyncHandler(async (req, res) => {
  try {
    const watchlist = await Watchlist.aggregate([
      {
        $match: { user_id: new ObjectId(req.id) },
      },
      {
        $group: {
          _id: { date: "$date" },

          watchlist: {
            $push: {
              id: "$_id",
              movie_id: "$movie_id",
              title: "$title",
              genre: "$genre",
              year: "$year",
              rating: "$rating",
              image_url: "$image_url",
              createdAt: "$createdAt",
            },
          },
        },
      },
      {
        $unwind: "$watchlist",
      },
      {
        $sort: {
          "watchlist.createdAt": -1,
        },
      },
      {
        $group: {
          _id: "$_id",

          watchlist: {
            $push: "$watchlist",
          },
        },
      },
      {
        $sort: {
          _id: -1,
        },
      },
      {
        $project: {
          _id: 0,
        },
      },
    ]);
    res.status(200).json({ success: true, data: watchlist });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

exports.deleteWatchlist = asyncHandler(async (req, res) => {
  try {
    await Watchlist.deleteOne({
      user_id: req.id,
      _id: req.params.id,
    });
    res.status(200).json({
      success: true,
      message: "The movie has been deleted from Watchlist",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});
