import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/Overview.css";

export default function Overview() {
  const location = useLocation();
  const movieData = location.state;

  const navigate = useNavigate();

  const handleClick = () => {
    const data = { uid: movieData.uid, title : movieData.title, poster_path: movieData.poster_path};
    navigate("/select-seats", {state: data})
  }

  return (
    <div className="overview">
      <div className="faded-image-container">
      <div className="fade-out-top"></div>
        <div className="image-container">
          <img
            src={`https://image.tmdb.org/t/p/original${movieData.backdrop_path}`}
            alt={movieData.title}
          />
        </div>
        <div className="fade-out-bottom"></div>
      </div>
      <div className="movie-info">
        <h1 className="movie-title">{movieData.title}</h1>
        <p className="release-date">{movieData.release_date}</p>
      </div>
      <div className="poster-button-container">
          <img
          className="movie-poster"
          src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`}
          alt={movieData.title}
          />
          <button onClick={handleClick} className="tickets-button">Get Tickets</button>
        </div>
    </div>
  );
}
