import React from "react";
import "../styles/Seat.css";

export default function Seat({ seatNumber, isSelected, isBooked, handleClick }) {
  return (
    <div
      className={`seat ${isSelected ? "selected" : ""} ${isBooked ? "booked" : ""}`}
      onClick={handleClick}
    >
      {seatNumber%18 === 0 ? 18 : seatNumber%18}
    </div>
  );
}
