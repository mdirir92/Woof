import { useEffect, useState } from "react";
import { Container } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import Home from "./pages/Home";
import RandomDogs from "./pages/RandomDogs";
import BreedImages from "./pages/BreedImages";

import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Favourites from "./pages/Favourites";
import RatedDogs from "./pages/RatedDogs";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  //state for logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //function to set login state
  const loginHandler = () => {
    setIsLoggedIn(true);
    toast.success("Logged in successfully!");
  };

  //checking if user data is saved in local storage then automatically login
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (storedData && storedData.email) {
      setIsLoggedIn(true);
      toast.success("Logged in successfully!");
    }
  }, []);

  //function to logout
  const logoutHandler = () => {
    localStorage.removeItem("userData");
    setIsLoggedIn(false);
    toast.success("Logged out successfully!");
  };

  return (
    <Container sx={{ display: "flex", flexDirection: "column" }}>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar
        closeOnClick
      />
      <Navbar isLoggedIn={isLoggedIn} onLogout={logoutHandler} />
      <div>
        {/* routes for different page */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/random-dogs" element={<RandomDogs />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/rated" element={<RatedDogs />} />
          <Route path="/breed/:name" element={<BreedImages />} />
          <Route path="/login" element={<Login onLogin={loginHandler} />} />
          <Route path="/signup" element={<Signup onLogin={loginHandler} />} />
        </Routes>
      </div>
    </Container>
  );
}

export default App;
