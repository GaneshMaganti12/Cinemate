import React from "react";
import "./LandingPage.css";
import Header from "../Header/Header";

function LandingPage() {
  return (
    <>
      <Header />
      <div className="cinemate-landing-page">
        <div className="landing-page-content-card">
          <h1 className="landing-page-title">
            Find the movie that you want to watch.
          </h1>
          <p className="landing-page-para">
            Welcome to Cinemate, where you can easily find the perfect movie to
            watch with all the details you need! Explore comprehensive reviews,
            ratings, and curated lists to help you decide. Stay updated on the
            latest releases and discover hidden gems across top streaming
            platforms.
          </p>
        </div>
        <img
          className="landing-page-image"
          src="https://res.cloudinary.com/ganeshmaganti/image/upload/v1715881087/3D_glasses-amico_sgumv4.png"
        />
      </div>
    </>
  );
}

export default LandingPage;
