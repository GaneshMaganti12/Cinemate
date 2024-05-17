import React from "react";
import "./MovieItem.css";
import { Link } from "react-router-dom";
import StarRateIcon from "@mui/icons-material/StarRate";
import LazyLoading from "../../LazyLoading/LazyLoading";

function MovieItem(props) {
  const { moviesData, title } = props;

  return (
    <Link
      to={`/movie/${moviesData.id}`}
      className={title === "results" ? "result-item-link" : "movie-item-link"}
    >
      <li
        className={
          title === "results" ? "result-item-container" : "movie-item-container"
        }
      >
        <div
          className={
            title === "results" ? "result-thumbnail-card" : "thumbnail-card"
          }
        >
          <LazyLoading
            src={moviesData.thumbnailUrl}
            className="thumbnail-image"
            alt={moviesData.title}
          />
        </div>
        <div
          className={
            title === "results" ? "result-content-card" : "movie-content-card"
          }
        >
          <p className="movie-rating">
            <StarRateIcon className="movie-star-icon" />
            {moviesData.rating}
          </p>
          <h1
            className={title === "results" ? "result-title" : "movie-title"}
          >{`${moviesData.title}`}</h1>
          <p className={title === "results" ? "result-genre" : "movie-genre"}>
            {moviesData.genre}
          </p>
          <p className={title === "results" ? "result-year" : "movie-year"}>
            {moviesData.year}
          </p>
        </div>
      </li>
    </Link>
  );
}

export default MovieItem;
