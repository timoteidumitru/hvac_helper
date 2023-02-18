import './dashboard.scss';
import { useEffect, useContext } from 'react';
import { ProfileContext } from '../../contexts/ProfileContext';
import { LoginContext } from '../../contexts/LoginContext';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { Box, Container, TextField, Typography } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import BusinessIcon from '@mui/icons-material/Business';

export default function Dashboard() {
  const { profileData, setProfileData } = useContext(ProfileContext);
  const { loginData } = useContext(LoginContext);
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
  console.log(profileData);
  return (
    <>
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
              <TextField label="Address: " variant="standard" sx={{ width: '85%' }} />
            </Box>
          </Box>
          <Box sx={{ '& > :not(style)': { m: 1 } }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
              <TextField label="Phone: " variant="standard" sx={{ width: '90%' }} />
            </Box>
          </Box>
          <Box sx={{ '& > :not(style)': { m: 1 } }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
              <TextField label="Email: " variant="standard" sx={{ width: '90%' }} />
            </Box>
          </Box>
          <Box sx={{ '& > :not(style)': { m: 1 } }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
              <TextField label="NextOfKin: " variant="standard" />
              <TextField label="Phone: " variant="standard" />
            </Box>
          </Box>
          <Box sx={{ '& > :not(style)': { m: 1 } }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
              <TextField label="BankAccount: " variant="standard" />
              <TextField label="Sort Code: " variant="standard" />
            </Box>
          </Box>
        </Stack>
      </Container>
    </>
  );
}
