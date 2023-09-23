import React from "react";
import { Grid, Paper, TextField, Typography } from "@mui/material";

import { useAuth } from "../../context/AuthContext";
import NavBar from "../../components/navbar/Navbar";

const UserProfile = () => {
  const { user } = useAuth();
  const { personal, nextOfKin, bankDetails, position } = user;

  return (
    <>
      <NavBar />
      <Paper elevation={3} style={{ padding: "20px", marginBottom: "20px" }}>
        <Typography variant="h5" gutterBottom>
          User Profile
        </Typography>

        <Typography variant="h6" gutterBottom>
          Personal Information
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="First Name"
              variant="outlined"
              fullWidth
              value={personal.firstName}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Last Name"
              variant="outlined"
              fullWidth
              value={personal.lastName}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Phone"
              variant="outlined"
              fullWidth
              value={personal.phone}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              value={personal.email}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Address"
              variant="outlined"
              fullWidth
              value={personal.address}
            />
          </Grid>
        </Grid>

        <Typography variant="h6" gutterBottom>
          Next of Kin
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              value={nextOfKin.name}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Phone"
              variant="outlined"
              fullWidth
              value={nextOfKin.phone}
            />
          </Grid>
        </Grid>

        <Typography variant="h6" gutterBottom>
          Bank Details
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Institute"
              variant="outlined"
              fullWidth
              value={bankDetails.institute}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Sort Code"
              variant="outlined"
              fullWidth
              value={bankDetails.sortCode}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Account"
              variant="outlined"
              fullWidth
              value={bankDetails.account}
            />
          </Grid>
        </Grid>

        <Typography variant="h6" gutterBottom>
          Position
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Role"
              variant="outlined"
              fullWidth
              value={position.role}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Start Date"
              variant="outlined"
              fullWidth
              value={position.dateStart}
            />
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default UserProfile;
