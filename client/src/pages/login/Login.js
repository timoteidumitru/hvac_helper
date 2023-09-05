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
import axios from "../../api/axios";

const LoginForm = () => {
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
      const response = await axios.post("/user/auth", { email, password });
      console.log(response.data);

      // Delay the redirection to /dashboard by 1 second (1000 milliseconds)
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (error) {
      if (error) console.log("Error on login: ", error.message);
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
