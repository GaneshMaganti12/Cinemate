import React from "react";
import "./GenreArray.css";
import Sliders from "../Sliders/Sliders";

function GenreArray(props) {
  const { data, genreHandle } = props;

  return (
    <Sliders title="genre">
      {data.map((item, index) => (
        <div
          key={index}
          className="genre-card"
          onClick={() => genreHandle(item)}
        >
          <button
            className={
              item.isActive ? "genre-button active" : "genre-button inactive"
            }
          >
            {item.genre}
          </button>
        </div>
      ))}
    </Sliders>
  );
}

export default GenreArray;
