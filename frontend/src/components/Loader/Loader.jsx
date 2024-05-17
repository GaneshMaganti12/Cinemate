import React from "react";
import { LineWave } from "react-loader-spinner";
import "./Loader.css";

function Loader() {
  return (
    <div className="movie-loader-card">
      <LineWave
        visible={true}
        height="130"
        width="130"
        color="#cd144e"
        ariaLabel="line-wave-loading"
        wrapperStyle={{}}
        wrapperClass=""
        firstLineColor=""
        middleLineColor=""
        lastLineColor=""
      />
    </div>
  );
}

export default Loader;
