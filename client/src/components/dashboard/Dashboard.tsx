import './dashboard.scss';
import { useEffect, useContext } from 'react';
import { ProfileContext } from '../../contexts/ProfileContext';
import { LoginContext } from '../../contexts/LoginContext';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { Container, Typography } from '@mui/material';
import UserDetails from './UserDetails';
import UserDashboard from './UserDashboard';

export default function Dashboard() {
  const { profileData, showProfile, setProfileData } = useContext(ProfileContext);
  const { loginData } = useContext(LoginContext);
  const userId = { userId: loginData._id };

  useEffect(() => {
    fetch('http://localhost:7079/profile/user', {
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

  return (
    <Container sx={{ backgroundColor: '#1976d2', color: 'white', minHeight: '100vh', padding: '0' }}>
      <Stack direction="row" sx={{ display: 'flex', justifyContent: 'space-around', padding: '1em' }}>
        <Avatar alt="User Avatar" sx={{ width: 100, height: 100 }} />
      </Stack>
      <Stack direction="row" sx={{ display: 'flex', justifyContent: 'space-around' }}>
        <Typography>{profileData?.name}</Typography>
      </Stack>
      <Stack direction="row" sx={{ display: 'flex', justifyContent: 'space-around', paddingBottom: '1em' }}>
        <Typography sx={{ textTransform: 'capitalize' }}>{profileData?.role}</Typography>
      </Stack>
      {showProfile ? <UserDetails /> : <UserDashboard />}
    </Container>
  );
}
