import React from "react";
import "./StreamingVideo.css";
import Sliders from "../Sliders/Sliders";
import LazyLoading from "../../LazyLoading/LazyLoading";

function StreamingVideo(props) {
  const { data } = props;

  const streamingItem = data.map((item, index) => (
    <div key={index} className="movie-detail-streaming-list">
      <a
        href={item.movieUrl}
        target="_blank"
        rel="noreferrer"
        style={{ textDecoration: "none" }}
      >
        <LazyLoading
          src={item.imageUrl}
          className="movie-detail-streaming-image"
        />
      </a>
    </div>
  ));

  return (
    <>
      <div className="movie-detail-streaming-list-container">
        {streamingItem}
      </div>
      <div className="streaming-slider-container">
        <Sliders>{streamingItem}</Sliders>
      </div>
    </>
  );
}

export default StreamingVideo;
