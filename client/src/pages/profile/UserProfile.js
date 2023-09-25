import React, { useState } from "react";
import {
  Grid,
  Paper,
  TextField,
  Typography,
  Divider,
  Button,
} from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import NavBar from "../../components/navbar/Navbar";
import axios from "../../api/axios";

const UserProfileField = ({ label, value, onChange, isEditing }) => (
  <Grid item xs={12} sm={6}>
    {isEditing ? (
      <TextField
        label={label}
        variant="outlined"
        fullWidth
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    ) : (
      <Typography>{value}</Typography>
    )}
  </Grid>
);

const UserProfileSection = ({
  label,
  data,
  isEditing,
  onChange,
  onSave,
  onEditToggle,
}) => (
  <>
    <Typography variant="h6" gutterBottom>
      {label}
    </Typography>
    <Grid container spacing={2}>
      {Object.entries(data).map(([field, value]) => (
        <UserProfileField
          key={field}
          label={field}
          value={value}
          onChange={(newValue) => onChange(field, newValue)}
          isEditing={isEditing}
        />
      ))}
    </Grid>
    {isEditing ? (
      <Button variant="contained" color="primary" onClick={onSave}>
        Save
      </Button>
    ) : (
      <Button variant="outlined" color="primary" onClick={onEditToggle}>
        Edit
      </Button>
    )}
    <Divider style={{ margin: "20px 0" }} />
  </>
);

const UserProfile = () => {
  const { user } = useAuth();

  // Initialize edited data states with empty values if user is null
  const initialEditedPersonal = user
    ? user.personal
    : {
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        address: "",
      };
  const initialEditedNextOfKin = user
    ? user.nextOfKin
    : {
        name: "",
        phone: "",
      };
  const initialEditedBankDetails = user
    ? user.bankDetails
    : {
        institute: "",
        sortCode: "",
        account: "",
      };
  const initialEditedPosition = user
    ? user.position
    : {
        role: "",
        dateStart: "",
      };

  // State variables for edited values
  const [editedPersonal, setEditedPersonal] = useState(initialEditedPersonal);
  const [editedNextOfKin, setEditedNextOfKin] = useState(
    initialEditedNextOfKin
  );
  const [editedBankDetails, setEditedBankDetails] = useState(
    initialEditedBankDetails
  );
  const [editedPosition, setEditedPosition] = useState(initialEditedPosition);

  // State variables to track edit mode
  const [isEditingPersonal, setIsEditingPersonal] = useState(false);
  const [isEditingNextOfKin, setIsEditingNextOfKin] = useState(false);
  const [isEditingBankDetails, setIsEditingBankDetails] = useState(false);
  const [isEditingPosition, setIsEditingPosition] = useState(false);

  const handleSave = () => {
    // Construct the data object to send in the PUT request
    const updatedData = {
      email: user?.personal?.email || "",
      profileData: {
        personal: editedPersonal,
        nextOfKin: editedNextOfKin,
        bankDetails: editedBankDetails,
        position: editedPosition,
      },
    };

    // Send a PUT request to update the profile
    axios
      .put("/profile/update", updatedData)
      .then((response) => {
        // Handle successful response
        // You can add a success message or perform any other actions here
        console.log(response.data);
      })
      .catch((error) => {
        // Handle error
        // You can show an error message or perform any other error handling here
        console.log(error);
      });

    // Disable editing mode
    setIsEditingPersonal(false);
    setIsEditingNextOfKin(false);
    setIsEditingBankDetails(false);
    setIsEditingPosition(false);
  };

  return (
    <>
      <NavBar />
      <Paper elevation={3} style={{ padding: "20px", marginBottom: "20px" }}>
        <Typography variant="h5" gutterBottom>
          User Profile
        </Typography>

        <UserProfileSection
          label="Personal Information"
          data={editedPersonal}
          isEditing={isEditingPersonal}
          onChange={(field, newValue) =>
            setEditedPersonal({ ...editedPersonal, [field]: newValue })
          }
          onSave={handleSave}
          onEditToggle={() => setIsEditingPersonal(!isEditingPersonal)}
        />

        <UserProfileSection
          label="Next of Kin"
          data={editedNextOfKin}
          isEditing={isEditingNextOfKin}
          onChange={(field, newValue) =>
            setEditedNextOfKin({ ...editedNextOfKin, [field]: newValue })
          }
          onSave={handleSave}
          onEditToggle={() => setIsEditingNextOfKin(!isEditingNextOfKin)}
        />

        <UserProfileSection
          label="Bank Details"
          data={editedBankDetails}
          isEditing={isEditingBankDetails}
          onChange={(field, newValue) =>
            setEditedBankDetails({ ...editedBankDetails, [field]: newValue })
          }
          onSave={handleSave}
          onEditToggle={() => setIsEditingBankDetails(!isEditingBankDetails)}
        />

        <UserProfileSection
          label="Position"
          data={editedPosition}
          isEditing={isEditingPosition}
          onChange={(field, newValue) =>
            setEditedPosition({ ...editedPosition, [field]: newValue })
          }
          onSave={handleSave}
          onEditToggle={() => setIsEditingPosition(!isEditingPosition)}
        />
      </Paper>
    </>
  );
};

export default UserProfile;
