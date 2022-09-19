import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

import logo from "../dog-api-logo.svg";

import "./Navbar.css";

const Navbar = ({ isLoggedIn, onLogout }) => {
  const navigate = useNavigate();

  const logoutHandler = () => {
    onLogout();
    navigate("/", { replace: true });
  };

  return (
    <div className="App-header">
      <Link to="/" className="Logo-container">
        <img src={logo} className="App-logo" alt="Logo" />
        <h1>Woof</h1>
      </Link>
      <div className="navbar">
        <nav className="nav">
          <Link to="/">Browse All Breeds</Link>
          <Link to="/random-dogs">Random Dogs</Link>
          {isLoggedIn && <Link to="/favourites">My Favourites</Link>}
          <Link to="/rated">Rated Dogs</Link>
        </nav>
        <div className="btn-container">
          {isLoggedIn && (
            <Button onClick={logoutHandler} variant="contained">
              Logout
            </Button>
          )}
          {!isLoggedIn && (
            <>
              <Button
                onClick={() => {
                  navigate("/login");
                }}
                variant="outlined"
              >
                Login
              </Button>
              <Button
                onClick={() => {
                  navigate("/signup");
                }}
                variant="contained"
              >
                Signup
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
