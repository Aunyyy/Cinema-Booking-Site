import { useEffect, useState } from "react";
import "../styles/SeatsList.css";
import api from '../api'
import Seat from "./Seat";

const createSeatingLayout = (numRows, numSeatsPerRow) => {
  const seatingPlan = [];
  let seatNumber = 1;

  for (let i = 0; i < numRows; i++) {
    const row = [];
    for (let j = 0; j < numSeatsPerRow; j++) {
      row.push(seatNumber);
      seatNumber++;
    }
    seatingPlan.push(row);
  }

  return seatingPlan;
};

const seatLayout = createSeatingLayout(9, 18);

export default function SeatsList({
  movie_uid,
  selectedSeats,
  onSeatClick,
  rowLetters,
  bookedSeats,
}) {

  return (
    <div className="seating-plan">
      {seatLayout.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          <span className="row-letter">{rowLetters[rowIndex]}</span>
          {row.map((seatNumber) => (
            <Seat
              key={seatNumber}
              seatNumber={seatNumber}
              isSelected={selectedSeats.includes(seatNumber)}
              isBooked={bookedSeats.includes(seatNumber)}
              handleClick={() => onSeatClick(seatNumber)}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
