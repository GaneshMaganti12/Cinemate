import React from "react";
import "./SimilarMovies.css";
import StarRateIcon from "@mui/icons-material/StarRate";
import Sliders from "../Sliders/Sliders";
import { Link } from "react-router-dom";
import LazyLoading from "../../LazyLoading/LazyLoading";

function SimilarMovies(props) {
  const { data } = props;

  const similarMoviesItems = data.map((item) => (
    <Link
      key={item.id}
      to={`/movie/${item.id}`}
      className="similar-movie-list-card"
    >
      <div className="similar-movie-list-item">
        <LazyLoading src={item.imageUrl} className="similar-movie-poster" />
        <div className="similar-movie-content-card">
          <p className="similar-movie-rating">
            <StarRateIcon className="star-icon" /> {item.rating}
          </p>
          <h1 className="similar-movie-title">{item.title}</h1>
          <p className="similar-movie-genre">{item.genre}</p>
          <p className="similar-movie-year">{item.year}</p>
        </div>
      </div>
    </Link>
  ));

  return (
    <>
      {data.length < 6 ? (
        <>
          <div className="similar-movies-list-container">
            {similarMoviesItems}
          </div>
          <div className="similar-movies-list-slider">
            <Sliders>{similarMoviesItems}</Sliders>
          </div>
        </>
      ) : (
        <Sliders>{similarMoviesItems}</Sliders>
      )}
    </>
  );
}

export default SimilarMovies;
