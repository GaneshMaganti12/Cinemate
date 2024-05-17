const express = require("express");
const {
  createMovie,
  getMovies,
  getGenres,
  updateMovie,
  getMovieDetails,
  getSearchMovies,
} = require("../Controllers/MoviesController");
const { isAuthorized, authorizedRole } = require("../Middlewares/Auth");
const router = express.Router();

router.post("/movies", [isAuthorized, authorizedRole("admin")], createMovie);

router.get("/movies", isAuthorized, getMovies);

router.get("/movies/results", isAuthorized, getSearchMovies);

router.get("/movie/:id", isAuthorized, getMovieDetails);

router.get("/genres", isAuthorized, getGenres);

router.patch(
  "/movie/:id",
  [isAuthorized, authorizedRole("admin")],
  updateMovie
);

module.exports = router;
