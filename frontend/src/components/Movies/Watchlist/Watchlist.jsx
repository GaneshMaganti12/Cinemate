import React, { useEffect, useState } from "react";
import Header from "../../Header/Header";
import { useDispatch, useSelector } from "react-redux";
import "./Watchlist.css";
import WatchlistItem from "./WatchlistItem/WatchlistItem";
import {
  dispatchDeleteWatchlist,
  dispatchGetWatchlist,
} from "../../Store/Actions/MoviesActions";
import Loader from "../../Loader/Loader";
import { dispatchLogout } from "../../Store/Actions/AuthActions";
import { clearMovieDetailData } from "../../Store/Reducers/MoviesReducer";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

function Watchlist() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isWatchlistLoading, watchlistData, isSuccess } = useSelector(
    (state) => state.movies
  );
  const [watchlistArray, setWatchlistArray] = useState(watchlistData);
  const token =
    useSelector((state) => state.auth.token) ||
    localStorage.getItem("jwtToken");

  const decodeToken = jwtDecode(token);
  const currentToken = Date.now() / 1000;

  useEffect(() => {
    setWatchlistArray(watchlistData);
  }, [watchlistData]);

  useEffect(() => {
    document.title =
      window.location.pathname === "/watchlist"
        ? "Cinemate | Watchlist"
        : "Cinemate";

    getWatchListData();

    dispatch(clearMovieDetailData());
  }, []);

  const getWatchListData = () => {
    dispatch(dispatchGetWatchlist(token));
  };

  const handleOnClickDelete = (id) => {
    const updatedArray = watchlistArray.filter((item) => {
      if (item.id !== id) {
        return item;
      }
    });

    setWatchlistArray(updatedArray);
    dispatch(dispatchDeleteWatchlist(id, token));
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
      <div className="watchlist-container">
        {isWatchlistLoading && <Loader />}
        {!isWatchlistLoading && watchlistArray.length && (
          <div className="watchlist-card">
            <ul className="watchlist-list-container">
              {watchlistArray.map((item) => (
                <WatchlistItem
                  key={item.id}
                  data={item}
                  handleDeleteItem={handleOnClickDelete}
                />
              ))}
            </ul>
          </div>
        )}
        {!isWatchlistLoading && !watchlistArray.length && (
          <div className="watchlist-no-movies-card">
            <h1>There is no movies in watchlist.</h1>
          </div>
        )}
        {!isWatchlistLoading && !watchlistArray.length && !isSuccess && (
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
            <button className="retry-button" onClick={() => getWatchListData()}>
              Retry
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default Watchlist;
