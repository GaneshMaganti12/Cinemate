import React from "react";
import "./WatchlistItem.css";
import { Link } from "react-router-dom";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import StarRateIcon from "@mui/icons-material/StarRate";
import CloseIcon from "@mui/icons-material/Close";
import LazyLoading from "../../../LazyLoading/LazyLoading";

function WatchlistItem(props) {
  const { data, handleDeleteItem } = props;

  return (
    <li className="watchlist-list-item-card">
      <Link
        to={`/movie/${data.movieId}`}
        style={{
          textDecoration: "none",
          width: "100%",
        }}
      >
        <div className="watchlist-list-item">
          <div className="watchlist-image-card">
            <LazyLoading
              src={data.imageUrl}
              alt={data.title}
              className="watchlist-movie-image"
            />
          </div>
          <div className="watchlist-movie-content">
            <h1 className="watchlist-movie-title">
              {data.title} {`(${data.year})`}
            </h1>
            <p className="watchlist-movie-genre">Genre - {data.genre}</p>
            <p className="watchlist-movie-year">Year - {data.year}</p>
            <p className="watchlist-movie-rating">
              Rating - {data.rating}
              <StarRateIcon className="star-icon" />
            </p>
          </div>
        </div>
      </Link>
      <div
        className="delete-icon-card"
        onClick={() => handleDeleteItem(data.id)}
      >
        <DeleteOutlineIcon className="icon" />
        <CloseIcon className="delete-icon" />
      </div>
    </li>
  );
}

export default WatchlistItem;
