import React from "react";
import Header from "../Header/Header";
import "./NotFound.css";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <div className="not-found-container">
        <img
          alt="not found"
          className="not-found-image"
          src="https://res.cloudinary.com/ganeshmaganti/image/upload/v1712156239/Oops_404_Error_with_a_broken_robot-cuate_dzblps.png"
        />
        <h1 className="not-found-title">Page Not Found</h1>
        <p className="not-found-para">
          We are sorry, the page you requested could not be found
        </p>
        <button className="not-found-button" onClick={() => navigate("/home")}>
          Back to Home
        </button>
      </div>
    </>
  );
}

export default NotFound;
