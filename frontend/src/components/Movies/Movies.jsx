import React, { useEffect, useState } from "react";
import "./Movies.css";
import Header from "../Header/Header";
import { useDispatch, useSelector } from "react-redux";
import {
  dispatchAllGenres,
  dispatchClearMovieDetailData,
  dispatchMovies,
  dispatchNextMovies,
} from "../Store/Actions/MoviesActions";
import MovieItem from "./MovieItem/MovieItem";
import GenreArray from "./GenreArray/GenreArray";
import Loader from "../Loader/Loader";
import InfiniteScroll from "react-infinite-scroll-component";
import { LineWave } from "react-loader-spinner";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { dispatchLogout } from "../Store/Actions/AuthActions";

function Movies() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, moviesArray, isSuccess, totalPages, genresArray } =
    useSelector((state) => state.movies);
  const token =
    useSelector((state) => state.auth.loginData.token) ||
    localStorage.getItem("jwtToken");
  const [genreArray, setGenreArray] = useState([]);
  const [activeGenre, setActiveGenre] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [noOfPages, setNofPages] = useState(0);

  const currentToken = Date.now() / 1000;
  const decodeToken = jwtDecode(token);

  useEffect(() => {
    document.title =
      window.location.pathname === "/home" ? "Cinemate | Home" : "Cinemate";

    getMovies();
    dispatch(dispatchAllGenres(token));
    dispatch(dispatchClearMovieDetailData());
  }, []);

  useEffect(() => {
    setGenreArray(genresArray);
  }, [genresArray]);

  useEffect(() => {
    getMovies();
  }, [activeGenre]);

  useEffect(() => {
    setNofPages(totalPages);
  }, [totalPages]);

  const getMovies = () => {
    dispatch(dispatchMovies(activeGenre, token, currentPage));
    setCurrentPage(2);
  };

  const getNextMovies = () => {
    dispatch(dispatchNextMovies(activeGenre, token, currentPage));
    setCurrentPage((currentPage) => currentPage + 1);
  };

  const handleClickGenre = ({ genre, active }) => {
    const updatedGenre = genreArray.map((item) => {
      if (genre === item.genre) {
        return { ...item, isActive: !active };
      }
      return { ...item, isActive: false };
    });

    setActiveGenre(
      updatedGenre.reduce((str, item) => {
        if (item.isActive && item.genre !== "All") {
          str = item.genre;
        }
        return str;
      }, "")
    );

    setGenreArray(updatedGenre);
    setCurrentPage(1);
  };

  useEffect(() => {
    const expireToken = decodeToken.exp;

    if (currentToken > expireToken) {
      navigate("/login");
      dispatch(dispatchLogout());
    }
  }, [decodeToken.exp, navigate]);

  return (
    <>
      <Header />
      <div className="movies-container">
        {isLoading && !isSuccess && <Loader />}
        {isSuccess && (
          <div className="movies-card">
            {Array.isArray(genreArray) && genreArray.length && (
              <div className="movies-genre-card">
                <GenreArray data={genreArray} genreHandle={handleClickGenre} />
              </div>
            )}
            {isLoading && <Loader />}
            {!isLoading && moviesArray.length !== 0 && (
              <div className="movies-container-card">
                <InfiniteScroll
                  style={{ overflow: "visible" }}
                  dataLength={moviesArray.length || []}
                  next={getNextMovies}
                  hasMore={currentPage <= noOfPages}
                  loader={
                    <div className="scrollbar-loader">
                      <LineWave
                        visible={true}
                        height="100"
                        width="100"
                        color="#cd144e"
                        ariaLabel="line-wave-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                        firstLineColor=""
                        middleLineColor=""
                        lastLineColor=""
                      />
                    </div>
                  }
                >
                  <ul className="movies-list-container">
                    {moviesArray.map((item) => (
                      <MovieItem key={item.id} moviesData={item} />
                    ))}
                  </ul>
                </InfiniteScroll>
              </div>
            )}
          </div>
        )}
        {!isLoading && !isSuccess && (
          <div className="error-container">
            <img
              className="error-image"
              src="https://res.cloudinary.com/ganeshmaganti/image/upload/v1712242843/No_data-amico_dfvlef.png"
              alt="error"
            />
            <h1 className="error-title">Oops! Something Went Wrong</h1>
            <p className="error-para">
              We cannot seem to find the page you are looking for.
            </p>
            <button className="retry-button" onClick={() => getMovies()}>
              Retry
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default Movies;
