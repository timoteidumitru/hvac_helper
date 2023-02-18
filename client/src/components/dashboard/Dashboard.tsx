import './dashboard.scss';
import { useEffect, useContext, useState } from 'react';
import { ProfileContext } from '../../contexts/ProfileContext';
import { LoginContext } from '../../contexts/LoginContext';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { blue, lightBlue } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: blue[500]
    },
    secondary: {
      main: lightBlue[500]
    }
  }
});

interface Profile {
  user: string;
  name: string;
  location: string;
}

export default function Dashboard() {
  const { setProfileData } = useContext(ProfileContext);
  const { loginData } = useContext(LoginContext);
  const [profile, setProfile] = useState<Profile | null>(null);
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
        setProfile(data.profile);
        setProfileData(data.profile);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Stack direction="row" sx={{ display: 'flex', justifyContent: 'space-around', backgroundColor: 'secondary' }}>
        <Avatar alt="User Avatar" sx={{ width: 100, height: 100 }} />
      </Stack>
    </ThemeProvider>
  );
}
