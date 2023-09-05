import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "../../api/axios";

const RegistrationForm = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const navigate = useNavigate();

  const handleFullNameChange = (e) => {
    setFullName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRepeatPasswordChange = (e) => {
    setRepeatPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== repeatPassword) {
      console.log("Passwords do not match.");
      return;
    }

    // Create an object to send in the POST request
    const userData = {
      fullName,
      email,
      password,
    };

    try {
      // Send the POST request with user data
      const response = await axios.post("/user/register", userData);
      console.log(response.data);

      // Optionally, you can reset the form fields here
      setFullName("");
      setEmail("");
      setPassword("");
      setRepeatPassword("");

      // Delay the redirection by 0.7 seconds (700 milliseconds)
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      if (error) console.log("Error on registration: ", error.message);
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
        Register
      </Typography>
      <form onSubmit={handleSubmit} style={{ width: "100%" }}>
        <TextField
          label="Full Name"
          type="text"
          fullWidth
          variant="outlined"
          margin="normal"
          value={fullName}
          onChange={handleFullNameChange}
        />
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
        <TextField
          label="Repeat Password"
          type="password"
          fullWidth
          variant="outlined"
          margin="normal"
          autoComplete="off"
          value={repeatPassword}
          onChange={handleRepeatPasswordChange}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: "16px" }}
        >
          Register
        </Button>
      </form>
      <Box mt={2}>
        <Typography>
          Already have an account? <NavLink to="/login">Login!</NavLink>
        </Typography>
      </Box>
    </Container>
  );
};

export default RegistrationForm;
