import React, { useEffect, useState } from "react";
import "../styles/SelectSeats.css";
import SeatsList from "../components/SeatsList";
import api from '../api'
import { useLocation, useNavigate } from "react-router-dom";

export default function SelectSeats() {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const location = useLocation();
  const movieData = location.state;
  const rowLetters = "ABCDEFGHI";
  const [bookedSeats, setBookedSeats] = useState([]);
  const navigate = useNavigate();

  const handleSeatClick = (seatNumber) => {
    if (bookedSeats.includes(seatNumber)) {
      return;
    }

    setSelectedSeats((prevSelectedSeats) =>
      prevSelectedSeats.includes(seatNumber)
        ? prevSelectedSeats.filter((seat) => seat !== seatNumber)
        : [...prevSelectedSeats, seatNumber]
    );
  };

  const getSeatLabel = (seatNumber) => {
    const seatLetter =
      seatNumber % 18 === 0
        ? rowLetters[Math.floor(seatNumber / 18) - 1]
        : rowLetters[Math.floor(seatNumber / 18)];
    const seatIndex = seatNumber % 18 === 0 ? 18 : seatNumber % 18;
    return ` ${seatLetter}${seatIndex}`;
  };

  const handleSubmit = async (seatNumbers) => {
    try {
      const response = await api.post(`/movies/${movieData.uid}/seats/`, {
        seat_numbers : seatNumbers,
        movie_uid: movieData.uid
      })
      alert("Seats Booked!")
      navigate("/")
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const getSeats = async () => {
      try {
        const response = await api.get(`/movies/${movieData.uid}/seats/`, {
          movie_uid: movieData.uid,
        });
        setBookedSeats(response.data.map(seat => seat.seat_number))
        console.log(bookedSeats)
      } catch (error) {
        console.log(error);
      }
    };

    getSeats();
  }, []);

  return (
    <div className="main-container">
      <div className="movie-details">
        <img
          src={`https://image.tmdb.org/t/p/original${movieData.poster_path}`}
          alt={movieData.title}
        />
        <div>
        <h1 className="movie-title">{movieData.title}</h1>
        <h2 className="selected-seats-list">
          Selected Seats:
          {selectedSeats
            .map((seatNumber) => getSeatLabel(seatNumber))
            .join(", ")}
        </h2>
        <button onClick={() => handleSubmit(selectedSeats)}>Book Seats</button>
        </div>
      </div>
      <div className="preview-container">
        <div className="screen">SCREEN</div>
        <SeatsList
          selectedSeats={selectedSeats}
          movie_uid={movieData.uid}
          onSeatClick={handleSeatClick}
          rowLetters={rowLetters}
          bookedSeats={bookedSeats}
        />
      </div>
    </div>
  );
}
