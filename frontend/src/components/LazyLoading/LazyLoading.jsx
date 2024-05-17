import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

function LazyLoading(props) {
  const { src, alt, className } = props;

  return (
    <LazyLoadImage
      src={src}
      alt={alt ? alt : "/"}
      className={className}
      effect="blur"
    />
  );
}

export default LazyLoading;
