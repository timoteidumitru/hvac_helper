import './dashboard.scss';
import { useEffect, useContext, useState } from 'react';
import { ProfileContext } from '../../contexts/ProfileContext';
import { LoginContext } from '../../contexts/LoginContext';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { Box, Container, InputAdornment, TextField, Typography } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';
import BusinessIcon from '@mui/icons-material/Business';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import PaidIcon from '@mui/icons-material/Paid';

export default function Dashboard() {
  const { profileData, setProfileData } = useContext(ProfileContext);
  const { loginData } = useContext(LoginContext);
  const [updateData, setUpdateData] = useState(profileData);
  const userId = { userId: loginData._id };

  useEffect(() => {
    fetch('http://localhost:7079/profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userId)
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        setProfileData(data.profile);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('Clicked:', event.target.value);
    const { name, value } = event.target;
    setUpdateData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setProfileData(updateData);
  };
  console.log(profileData.address);
  return (
    <form onSubmit={handleSubmit}>
      <Container sx={{ backgroundColor: '#1976d2', color: 'white', minHeight: '100vh', padding: '0' }}>
        <Stack direction="row" sx={{ display: 'flex', justifyContent: 'space-around', padding: '1em' }}>
          <Avatar alt="User Avatar" sx={{ width: 100, height: 100 }} />
        </Stack>
        <Stack direction="row" sx={{ display: 'flex', justifyContent: 'space-around' }}>
          <Typography>{profileData.name}</Typography>
        </Stack>
        <Stack direction="row" sx={{ display: 'flex', justifyContent: 'space-around', paddingBottom: '1em' }}>
          <Typography sx={{ textTransform: 'capitalize' }}>{profileData.role}</Typography>
        </Stack>
        <Stack
          sx={{ backgroundColor: 'white', color: 'black', paddingBottom: '1em', marginBottom: '1em', width: '100%' }}
        >
          <Box sx={{ '& > :not(style)': { m: 1 } }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-end', width: '100%' }}>
              <BusinessIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
              <TextField
                value={profileData?.address}
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end" style={{ backgroundColor: 'transparent' }}>
                      <CheckIcon style={{ cursor: 'pointer' }} />
                    </InputAdornment>
                  )
                }}
                label="Address: "
                variant="standard"
                sx={{ width: '85%' }}
              />
            </Box>
          </Box>
          <Box sx={{ '& > :not(style)': { m: 1 } }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <ContactPhoneIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
              <TextField
                value={profileData?.phone}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end" style={{ backgroundColor: 'transparent' }}>
                      <CheckIcon style={{ cursor: 'pointer' }} />
                    </InputAdornment>
                  )
                }}
                label="Phone: "
                variant="standard"
                sx={{ width: '90%' }}
              />
            </Box>
          </Box>
          <Box sx={{ '& > :not(style)': { m: 1 } }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <AlternateEmailIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
              <TextField
                value={profileData?.email}
                label="Email: "
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end" style={{ backgroundColor: 'transparent' }}>
                      <CheckIcon style={{ cursor: 'pointer' }} />
                    </InputAdornment>
                  )
                }}
                variant="standard"
                sx={{ width: '90%' }}
              />
            </Box>
          </Box>
          <Box sx={{ '& > :not(style)': { m: 1 } }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <PeopleOutlineIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
              <TextField
                value={profileData?.nextOfKin?.name}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end" style={{ backgroundColor: 'transparent' }}>
                      <CheckIcon style={{ cursor: 'pointer' }} />
                    </InputAdornment>
                  )
                }}
                style={{ width: '10em' }}
                label="NextOfKin: "
                variant="standard"
              />
              <TextField
                value={profileData?.nextOfKin?.phone}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end" style={{ backgroundColor: 'transparent' }}>
                      <CheckIcon style={{ cursor: 'pointer' }} />
                    </InputAdornment>
                  )
                }}
                label="Phone: "
                variant="standard"
              />
            </Box>
          </Box>
          <Box sx={{ '& > :not(style)': { m: 1 } }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <AccountBalanceIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
              <TextField
                value={profileData?.bankAcc?.sort}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end" style={{ backgroundColor: 'transparent' }}>
                      <CheckIcon style={{ cursor: 'pointer' }} />
                    </InputAdornment>
                  )
                }}
                style={{ width: '10em' }}
                label="Sort Code: "
                variant="standard"
              />
              <TextField
                value={profileData?.bankAcc?.account}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end" style={{ backgroundColor: 'transparent' }}>
                      <CheckIcon style={{ cursor: 'pointer' }} />
                    </InputAdornment>
                  )
                }}
                label="BankAccount: "
                variant="standard"
              />
            </Box>
          </Box>
          <Box sx={{ '& > :not(style)': { m: 1 } }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <AssuredWorkloadIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
              <TextField
                value={profileData?.utr}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end" style={{ backgroundColor: 'transparent' }}>
                      <CheckIcon style={{ cursor: 'pointer' }} />
                    </InputAdornment>
                  )
                }}
                label="UTR: "
                variant="standard"
                sx={{ width: '90%' }}
              />
            </Box>
          </Box>
          <Box sx={{ '& > :not(style)': { m: 1 } }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <PaidIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
              <TextField
                value={profileData?.rate}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end" style={{ backgroundColor: 'transparent' }}>
                      <CheckIcon style={{ cursor: 'pointer' }} />
                    </InputAdornment>
                  )
                }}
                label="Rate: "
                variant="standard"
                sx={{ width: '90%' }}
              />
            </Box>
          </Box>
        </Stack>
      </Container>
    </form>
  );
}
