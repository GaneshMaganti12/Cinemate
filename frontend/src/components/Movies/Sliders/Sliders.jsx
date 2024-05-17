import React, { useRef, useState } from "react";
import "./Sliders.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

function Sliders(props) {
  const { title, children } = props;

  const sliderContainer = useRef();

  const navigation = (direction) => {
    const container = sliderContainer.current;

    const scrollAmount =
      direction === "left"
        ? container.scrollLeft - (container.offsetWidth + 20)
        : container.scrollLeft + (container.offsetWidth + 20);

    container.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="slider-card">
      <div className="button-card">
        <IoIosArrowBack
          className={
            title === "genre" ? "arrow-button genre-left" : "arrow-button left"
          }
          onClick={() => navigation("left")}
        />
      </div>
      <div className="button-card">
        <IoIosArrowForward
          className={
            title === "genre"
              ? "arrow-button genre-right"
              : "arrow-button right"
          }
          onClick={() => navigation("right")}
        />
      </div>
      <div className="slider-items" ref={sliderContainer}>
        {children}
      </div>
    </div>
  );
}

export default Sliders;
