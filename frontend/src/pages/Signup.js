import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Card } from "@mui/material";

export default function Signup({ onLogin }) {
  const [errorMessage, setErrorMessage] = React.useState("");

  const navigate = useNavigate();

  //function to handle signup
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const response = await fetch("/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.get("name"),
        email: data.get("email"),
        password: data.get("password"),
      }),
    });
    const responseData = await response.json();
    if (responseData.message) {
      setErrorMessage(responseData.message);
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
      return;
    }
    console.log(responseData);
    localStorage.setItem("userData", JSON.stringify(responseData));
    onLogin();
    navigate("/", { replace: true });
  };

  //if user is already logged in then redirect to home page
  React.useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (storedData && storedData.email) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  return (
    <Container component="main" maxWidth="xs">
      <Card sx={{ padding: "2rem", marginTop: 8 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            {errorMessage !== "" && (
              <Typography color="error" sx={{ margin: "10px 0" }}>
                {errorMessage}
              </Typography>
            )}
            <Link to="/login" variant="body2">
              {"Already have an account? Login instead"}
            </Link>
          </Box>
        </Box>
      </Card>
    </Container>
  );
}
