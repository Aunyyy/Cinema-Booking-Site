import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import api from '../api'

export default function Cart() {
  const location = useLocation();
  const movieData = location.state;
  const [bookedSeats, setBookedSeats] = useState([]);

  useEffect(() => {
    const getSeats = async () => {
      try {
        const response = await api.get(`/user/seats/`);
        setBookedSeats(response.data.map((seat) => seat.seat_number));
        console.log(bookedSeats)
      } catch (error) {
        console.log(error);
      }
    };

    getSeats();
  }, []);

  return <div>Cart</div>;
}
