import axios from "axios";
import {
  clearMovieDetailData,
  commentsSuccess,
  genresFailed,
  genresStarted,
  genresSuccess,
  movieFailed,
  movieStarted,
  movieSuccess,
  moviesFailed,
  moviesStarted,
  moviesSuccess,
  nextPageMovies,
  searchResultFailed,
  searchResultStarted,
  searchResultSuccess,
  searchTheValue,
  totalPagesOfMovies,
  watchlistFailed,
  watchlistStarted,
  watchlistSuccess,
} from "../Reducers/MoviesReducer";
import {
  abbrevationGenres,
  transformCommentsData,
  transformMovieData,
  transformMoviesData,
  transformWatchlistData,
} from "../../Utils/Utils";

const apiUrl = "https://cinemate-od8b.onrender.com";

export const dispatchMovies = (genre, token, pageNum) => {
  return async (dispatch) => {
    try {
      const options = {
        headers: {
          authorization: `Bearer ${token}`,
        },
      };
      dispatch(moviesStarted());

      const res = await axios.get(
        `${apiUrl}/movies?genre=${genre}&page=${pageNum}`,
        options
      );

      if (res.data.success) {
        dispatch(moviesSuccess(transformMoviesData(res.data.data)));
        dispatch(totalPagesOfMovies(res.data.total_pages));
      }
    } catch (error) {
      dispatch(moviesFailed(error.response.data.message));
    }
  };
};

export const dispatchNextMovies = (genre, token, pageNum) => {
  return async (dispatch) => {
    try {
      const options = {
        headers: {
          authorization: `Bearer ${token}`,
        },
      };

      const res = await axios.get(
        `${apiUrl}/movies?genre=${genre}&page=${pageNum}`,
        options
      );

      if (res.data.success) {
        dispatch(nextPageMovies(transformMoviesData(res.data.data)));
      }
    } catch (error) {
      dispatch(moviesFailed(error.response.data.message));
    }
  };
};

export const dispatchSearchResultMovies = (search, token) => {
  return async (dispatch) => {
    try {
      const options = {
        headers: {
          authorization: `Bearer ${token}`,
        },
      };
      dispatch(searchResultStarted());

      const res = await axios.get(
        `${apiUrl}/movies/results?search=${search}`,
        options
      );

      if (res.data.success) {
        dispatch(searchResultSuccess(transformMoviesData(res.data.data)));
        dispatch(totalPagesOfMovies(res.data.total_pages));
      }
    } catch (error) {
      dispatch(searchResultFailed(error.response.data.message));
    }
  };
};

export const dispatchAllGenres = (token) => {
  return async (dispatch) => {
    try {
      const options = {
        headers: {
          authorization: `Bearer ${token}`,
        },
      };
      dispatch(genresStarted());

      const res = await axios.get(`${apiUrl}/genres`, options);
      if (res.data.success) {
        dispatch(genresSuccess(abbrevationGenres(res.data.data)));
      }
    } catch (error) {
      dispatch(genresFailed(error.response.data.message));
    }
  };
};

export const dispatchMovieDetails = (id, token) => {
  return async (dispatch) => {
    try {
      const options = {
        headers: {
          authorization: `Bearer ${token}`,
        },
      };
      dispatch(movieStarted());
      const res = await axios.get(`${apiUrl}/movie/${id}`, options);
      if (res.data.success) {
        dispatch(movieSuccess(transformMovieData(res.data.data[0])));
      }
    } catch (error) {
      dispatch(movieFailed(error.response.data.message));
    }
  };
};

export const dispatchPostWatchlist = (data, token) => {
  return async (dispatch) => {
    try {
      const options = {
        headers: {
          authorization: `Bearer ${token}`,
        },
      };
      await axios.post(`${apiUrl}/watchlist`, data, options);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
};

export const dispatchGetWatchlist = (token) => {
  return async (dispatch) => {
    try {
      dispatch(watchlistStarted());
      const options = {
        headers: {
          authorization: `Bearer ${token}`,
        },
      };

      const res = await axios.get(`${apiUrl}/watchlist`, options);
      if (res.data.success) {
        dispatch(watchlistSuccess(transformWatchlistData(res.data.data)));
      }
    } catch (error) {
      dispatch(watchlistFailed(error.response.data.message));
    }
  };
};

export const dispatchDeleteWatchlist = (id, token) => {
  return async (dispatch) => {
    try {
      const options = {
        headers: {
          authorization: `Bearer ${token}`,
        },
      };
      await axios.delete(`${apiUrl}/watchlist/${id}`, options);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
};

export const dispatchPostComments = (object, token) => {
  return async (dispatch) => {
    try {
      const options = {
        headers: {
          authorization: `Bearer ${token}`,
        },
      };

      await axios.post(`${apiUrl}/comments`, object, options);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
};

export const dispatchGetComments = (movieId, token) => {
  return async (dispatch) => {
    try {
      const options = {
        headers: {
          authorization: `Bearer ${token}`,
        },
      };

      const res = await axios.get(`${apiUrl}/comments/${movieId}`, options);
      dispatch(commentsSuccess(transformCommentsData(res.data.data)));
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
};

export const dispatchSearchValue = (value) => {
  return (dispatch) => {
    dispatch(searchTheValue(value));
  };
};

export const dispatchClearMovieDetailData = () => {
  return (dispatch) => {
    dispatch(clearMovieDetailData());
  };
};
