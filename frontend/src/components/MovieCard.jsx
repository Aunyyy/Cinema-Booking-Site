import React from "react";
import { useNavigate } from 'react-router-dom';
import "../styles/MovieCard.css";

export default function MovieCard({
  uid,
  id,
  title,
  poster_path,
  backdrop_path,
  release_date,
  overview,
}) {

  const navigate = useNavigate();

  const handleClick = () => {
    const movieData = { uid: uid, id : id, title: title, release_date: release_date, overview: overview, poster_path: poster_path, backdrop_path: backdrop_path};
    navigate("/overview", {state: movieData})
  }

  return (
    <div onClick={handleClick} className="movie-card" key={id}>
      <img
        src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
        alt={title}
      />
      <p>{title}</p>
    </div>
  );
}
