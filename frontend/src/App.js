import logo from "./dog-api-logo.svg";
import "./App.css";
import { Container, Drawer } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";

function App() {
  return (
    <Container sx={{ display: "flex", flexDirection: "column" }}>
      <div className="App-header">
        <img src={logo} className="App-logo" />
      </div>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Container>
  );
}

export default App;
