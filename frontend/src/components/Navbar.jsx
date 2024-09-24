import React, { useEffect, useState } from "react";
import "../styles/Navbar.css";
import { ACCESS_TOKEN } from "../constants";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const token = localStorage.getItem(ACCESS_TOKEN);
  const navigate = useNavigate();

  useEffect(() => {
    auth().catch(() => setIsAuthorized(false));
  }, [isAuthorized, token]);

  const auth = async () => {
    if (token) {
      setIsAuthorized(true);
    } else {
      setIsAuthorized(false);
    }
  };

  const handleClick = () => {
    navigate("/cart")
  };

  return (
    <nav className="nav">
      <a href="/" className="site-title">
        Cinema
      </a>
      {isAuthorized ? (
        <ul>
          <li>
            <a href="/cart" />
            <ShoppingCartRoundedIcon onClick={handleClick} />
          </li>
          <li>
            <a href="/logout">Logout</a>
          </li>
        </ul>
      ) : (
        <ul>
          <li>
            <a href="/login">Login</a>
          </li>
          <li>
            <a href="/register">Register</a>
          </li>
        </ul>
      )}
    </nav>
  );
}
