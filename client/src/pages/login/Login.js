import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  FormControlLabel,
  Checkbox,
  Box,
} from "@mui/material";
import { useNavigate, NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // Import the useAuth hook

const LoginForm = () => {
  const { login, user } = useAuth(); // Access the login function and user data
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(email, password); // Use the login function from the context

      // After successful login, the user state in the context will be updated
      // Check if the user is authenticated and navigate to /dashboard immediately

      navigate("/dashboard");
    } catch (error) {
      console.error("Error on login: ", error.message);
    }
  };

  return (
    <Container
      maxWidth="xs"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Typography variant="h4" align="center" style={{ margin: "16px 0" }}>
        Login
      </Typography>
      <form onSubmit={handleSubmit} style={{ width: "100%" }}>
        <TextField
          label="Email"
          type="email"
          fullWidth
          variant="outlined"
          margin="normal"
          value={email}
          onChange={handleEmailChange}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          variant="outlined"
          margin="normal"
          autoComplete="off"
          value={password}
          onChange={handlePasswordChange}
        />
        <FormControlLabel
          control={
            <Checkbox
              color="primary"
              checked={rememberMe}
              onChange={handleRememberMeChange}
            />
          }
          label="Remember Me"
          style={{ marginTop: "8px" }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: "16px" }}
          onClick={handleSubmit}
        >
          Login
        </Button>
      </form>
      <Box mt={2}>
        <Typography>
          Don't have an account? <NavLink to="/register">Sign Up!</NavLink>
        </Typography>
      </Box>
    </Container>
  );
};

export default LoginForm;
