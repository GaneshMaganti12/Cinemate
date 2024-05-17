import React, { useEffect } from "react";
import Header from "../../Header/Header";
import "./SearchMovies.css";
import { useDispatch, useSelector } from "react-redux";
import { dispatchSearchResultMovies } from "../../Store/Actions/MoviesActions";
import MovieItem from "../MovieItem/MovieItem";
import Loader from "../../Loader/Loader";
import { useNavigate } from "react-router-dom";
import { dispatchLogout } from "../../Store/Actions/AuthActions";
import { jwtDecode } from "jwt-decode";

function SearchMovies() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, isSuccess, search, searchArray } = useSelector(
    (state) => state.movies
  );
  const token =
    useSelector((state) => state.auth.token) ||
    localStorage.getItem("jwtToken");

  const decodeToken = jwtDecode(token);
  const currentToken = Date.now() / 1000;

  useEffect(() => {
    document.title =
      window.location.pathname === "/results"
        ? "Cinemate | Results"
        : "Cinemate";

    getSearchMovies();

    if (!search && !searchArray.length) {
      navigate("/home");
    }
  }, [search]);

  const getSearchMovies = () => {
    dispatch(dispatchSearchResultMovies(search, token));
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
      <div className="search-movies-container">
        {isLoading && <Loader />}
        {!isLoading &&
          isSuccess &&
          (searchArray.length !== 0 ? (
            <div className="search-movies-card">
              <div className="search-result-title-card">
                <h1 className="search-result-title">
                  Search results of {`'${search}'`}
                </h1>
              </div>

              <div className="search-movies-list-container">
                {searchArray.map((item) => (
                  <MovieItem key={item.id} moviesData={item} title="results" />
                ))}
              </div>
            </div>
          ) : (
            <div className="no-search-card">
              <img
                src="https://res.cloudinary.com/ganeshmaganti/image/upload/v1712160403/SEO-pana_uqst5w.png"
                alt="no search"
                className="no-search"
              />
              <h1 className="no-search-title">Oops...! no results found</h1>
              <p className="no-search-para">Please try another search</p>
            </div>
          ))}
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

export default SearchMovies;
