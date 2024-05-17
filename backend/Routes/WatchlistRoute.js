const express = require("express");
const {
  createWatchlist,
  getWatchlist,
  deleteWatchlist,
} = require("../Controllers/WatchlistController");
const { isAuthorized } = require("../Middlewares/Auth");
const router = express.Router();

router.post("/watchlist", isAuthorized, createWatchlist);

router.get("/watchlist", isAuthorized, getWatchlist);

router.delete("/watchlist/:id", isAuthorized, deleteWatchlist);

module.exports = router;
