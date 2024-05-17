const asyncHandler = require("express-async-handler");
const Movies = require("../Models/MoviesModel");
const { ObjectId } = require("mongodb");

exports.createMovie = asyncHandler(async (req, res) => {
  try {
    const movies = await Movies.create(req.body);
    res.status(201).json({ success: true, data: movies });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

exports.getMovies = asyncHandler(async (req, res) => {
  try {
    let query = {};

    if (req.query.genre) {
      query.genre = req.query.genre;
    }

    const page = req.query.page || 1;

    const limit = 20;

    const skip = (page - 1) * limit;

    const movies = await Movies.find(query).skip(skip).limit(limit);

    const totalDocuments = await Movies.countDocuments(query);
    const totalPages = Math.ceil(totalDocuments / limit);

    res
      .status(200)
      .json({ success: true, data: movies, total_pages: totalPages });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

exports.getSearchMovies = asyncHandler(async (req, res) => {
  try {
    let query = {};
    let sortMode;

    if (req.query.search) {
      query.title = { $regex: new RegExp(req.query.search, "i") };
      sortMode = { year: 1 };

      const movies = await Movies.find(query).sort(sortMode);

      res.status(200).json({ success: true, data: movies });
    } else {
      res.status(200).json({ success: true, data: [] });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

exports.getGenres = asyncHandler(async (req, res) => {
  try {
    const genres = await Movies.find().select("genre");
    res.status(200).json({ success: true, data: genres });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

exports.updateMovie = asyncHandler(async (req, res) => {
  try {
    const movie = await Movies.findByIdAndUpdate(
      { _id: req.params.id },
      req.body
    );
    res.status(200).status({ success: false, data: movie });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

exports.getMovieDetails = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;

    const movieDetails = await Movies.aggregate([
      {
        $match: { _id: new ObjectId(id) },
      },

      {
        $lookup: {
          from: "movies",
          localField: "production_companies",
          foreignField: "production_companies",
          as: "similar_movies",
        },
      },

      {
        $unwind: "$similar_movies",
      },

      {
        $match: { "similar_movies._id": { $ne: new ObjectId(id) } },
      },

      {
        $group: {
          _id: {
            id: "$_id",
            title: "$title",
            year: "$year",
            rating: "$rating",
            genre: "$genre",
            running_time: "$running_time",
            plot: "$plot",
            full_plot: "$full_plot",
            certificate: "$certificate",
            movie_trailer_url: "$movie_trailer_url",
            movie_cast: "$movie_cast",
            movie_image_url: "$movie_image_url",
            movie_photos: "$movie_photos",
            movie_videos: "$movie_videos",
            streaming_urls: "$movie_streaming_urls",
            directed_by: "$directed_by",
            produced_by: "$produced_by",
            production_companies: "$production_companies",
            budget: "$budget",
            box_office: "$box_office",
          },

          similar_movies: {
            $push: {
              id: "$similar_movies._id",
              title: "$similar_movies.title",
              year: "$similar_movies.year",
              rating: "$similar_movies.rating",
              genre: "$similar_movies.genre",
              movie_image_url: "$similar_movies.movie_image_url",
            },
          },
        },
      },

      {
        $project: {
          movie_details: "$_id",
          similar_movies: 1,
          _id: 0,
        },
      },
    ]);

    res.status(200).json({ success: true, data: movieDetails });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});
