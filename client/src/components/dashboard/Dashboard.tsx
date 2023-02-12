import './dashboard.scss';
import { useEffect, useContext, useState } from 'react';
import { ProfileContext } from '../../contexts/ProfileContext';
import { LoginContext } from '../../contexts/LoginContext';

interface Profile {
  user: string;
  name: string;
  location: string;
}

function Dashboard() {
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
    <div>
      {profile ? (
        <>
          <h2>{profile.name}</h2>
          <p>{profile.location}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Dashboard;
