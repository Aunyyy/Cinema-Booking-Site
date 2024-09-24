import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import "../styles/MovieList.css";
import api from '../api'

export default function MovieList() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await api.get("/api/fetch-movies/");
        setMovies(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="movie-list">
      {movies.map((movie) => (
        <MovieCard
          uid={movie.uid}
          id={movie.id}
          title={movie.title}
          poster_path={movie.poster_path}
          backdrop_path={movie.backdrop_path}
          overview={movie.overview}
          release_date={movie.release_date}
        />
      ))}
    </div>
  );
}
