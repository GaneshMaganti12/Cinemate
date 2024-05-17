import { createSlice } from "@reduxjs/toolkit";

const MoviesReducer = createSlice({
  name: "movies",
  initialState: {
    isLoading: false,
    isSuccess: false,
    search: "",
    totalPages: 0,
    moviesArray: [],
    searchArray: [],
    genresArray: [],
    movieDetailsObject: {},
    watchlistData: [],
    isMovieLoading: false,
    isWatchlistLoading: false,
    commentsData: [],
    error: "",
  },
  reducers: {
    moviesStarted: (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    },

    moviesSuccess: (state, action) => {
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        moviesArray: action.payload,
      };
    },

    nextPageMovies: (state, action) => {
      return {
        ...state,
        moviesArray: [...state.moviesArray, ...action.payload],
      };
    },

    moviesFailed: (state, action) => {
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        moviesArray: [],
      };
    },

    totalPagesOfMovies: (state, action) => {
      return {
        ...state,
        totalPages: action.payload,
      };
    },

    genresStarted: (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    },

    genresSuccess: (state, action) => {
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        genresArray: action.payload,
      };
    },

    genresFailed: (state, action) => {
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        genresArray: [],
      };
    },

    searchTheValue: (state, action) => {
      return {
        ...state,
        search: action.payload,
      };
    },

    movieStarted: (state, action) => {
      return {
        ...state,
        isMovieLoading: true,
      };
    },

    movieSuccess: (state, action) => {
      return {
        ...state,
        isMovieLoading: false,
        isSuccess: true,
        movieDetailsObject: action.payload,
      };
    },

    movieFailed: (state, action) => {
      return {
        ...state,
        isMovieLoading: false,
        isSuccess: false,
        movieDetailsObject: {},
      };
    },

    watchlistStarted: (state, action) => {
      return {
        ...state,
        isWatchlistLoading: true,
      };
    },

    watchlistSuccess: (state, action) => {
      return {
        ...state,
        isWatchlistLoading: false,
        isSuccess: true,
        watchlistData: action.payload,
      };
    },

    watchlistFailed: (state, action) => {
      return {
        ...state,
        isWatchlistLoading: false,
        watchlistData: [],
        error: action.payload,
        isSuccess: false,
      };
    },

    searchResultStarted: (state, action) => {
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
      };
    },

    searchResultSuccess: (state, action) => {
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        searchArray: action.payload,
      };
    },

    searchResultFailed: (state, action) => {
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        searchArray: [],
      };
    },

    clearMovieDetailData: (state, action) => {
      return {
        ...state,
        movieDetailsObject: {},
      };
    },

    commentsSuccess: (state, action) => {
      return {
        ...state,
        commentsData: action.payload,
      };
    },

    commentsFailed: (state, action) => {
      return {
        ...state,
        commentsData: [],
      };
    },
  },
});

export const {
  moviesStarted,
  moviesSuccess,
  nextPageMovies,
  totalPagesOfMovies,
  moviesFailed,
  searchTheValue,
  genresSuccess,
  genresStarted,
  genresFailed,
  movieStarted,
  movieSuccess,
  movieFailed,
  watchlistStarted,
  watchlistSuccess,
  watchlistFailed,
  searchResultStarted,
  searchResultSuccess,
  searchResultFailed,
  clearMovieDetailData,
  commentsSuccess,
  commentsFailed,
} = MoviesReducer.actions;

export default MoviesReducer.reducer;
