import React from "react";
import "./MovieCast.css";
import Sliders from "../Sliders/Sliders";
import LazyLoading from "../../LazyLoading/LazyLoading";

function MovieCast(props) {
  const { data } = props;

  const movieCast = data.map((item, index) => (
    <div key={index} className="top-cast-list">
      {item.castBioUrl ? (
        <a
          href={item.castBioUrl}
          target="_blank"
          rel="noreferer"
          className="top-cast-card"
        >
          <div className="top-cast-image-card">
            <LazyLoading className="top-cast-image" src={item.imageUrl} />
          </div>
          <div className="top-cast-content">
            <p className="top-cast-name">{item.castName}</p>
            <p className="top-cast-character">{item.characterName}</p>
          </div>
        </a>
      ) : (
        <div className="top-cast-card">
          <LazyLoading className="top-cast-image" src={item.imageUrl} />
          <div className="top-cast-content">
            <p className="top-cast-name">{item.castName}</p>
            <p className="top-cast-character">{item.characterName}</p>
          </div>
        </div>
      )}
    </div>
  ));

  return (
    <>
      <div className="top-cast-list-container">{movieCast}</div>
      <div className="top-cast-slider-container">
        <Sliders>{movieCast}</Sliders>
      </div>
    </>
  );
}

export default MovieCast;
