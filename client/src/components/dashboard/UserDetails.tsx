import { useContext, useEffect } from 'react';
import { ProfileContext } from '../../contexts/ProfileContext';
import { Box, Button, IconButton, InputAdornment, TextField } from '@mui/material';
import Stack from '@mui/material/Stack';
import CheckIcon from '@mui/icons-material/Check';
import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';
import BusinessIcon from '@mui/icons-material/Business';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import PaidIcon from '@mui/icons-material/Paid';
import PersonIcon from '@mui/icons-material/Person';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import { LoginContext } from '../../contexts/LoginContext';

interface NestedProfileData {
  [key: string]: string | number;
}

export default function UserDetails() {
  const { profileData, setProfileData } = useContext(ProfileContext);
  const { loginData } = useContext(LoginContext);

  useEffect(() => {
    setProfileData((prev) => ({ ...prev, userId: loginData._id }));
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setProfileData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleNestedInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const [parentName, childName] = name.split('.');
    setProfileData((prevState) => ({
      ...prevState,
      [parentName]: {
        ...(prevState[parentName] as NestedProfileData),
        [childName]: value
      }
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:7079/profile', {
        method: profileData.userId ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId: loginData._id, profileData })
      });

      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error || 'An error occurred updating profile.');
      }
      const profile = await response.json();
      setProfileData(profile);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack
        sx={{ backgroundColor: 'white', color: 'black', paddingBottom: '1em', marginBottom: '1em', width: '100%' }}
      >
        <Box sx={{ '& > :not(style)': { m: 1 } }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-end', width: '100%' }}>
            <PersonIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
            <TextField
              name="name"
              onChange={handleInputChange}
              value={profileData?.name ?? ''}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end" style={{ backgroundColor: 'transparent' }}>
                    <IconButton type="submit">
                      <CheckIcon style={{ cursor: 'pointer' }} />
                    </IconButton>
                  </InputAdornment>
                )
              }}
              label="Full Name: "
              variant="standard"
              sx={{ width: '85%' }}
            />
          </Box>
        </Box>
        <Box sx={{ '& > :not(style)': { m: 1 } }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-end', width: '100%' }}>
            <BusinessIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
            <TextField
              name="address"
              onChange={handleInputChange}
              value={profileData?.address ?? ''}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end" style={{ backgroundColor: 'transparent' }}>
                    <IconButton type="submit">
                      <CheckIcon style={{ cursor: 'pointer' }} />
                    </IconButton>
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
              name="phone"
              onChange={handleInputChange}
              value={profileData?.phone ?? ''}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end" style={{ backgroundColor: 'transparent' }}>
                    <IconButton type="submit">
                      <CheckIcon style={{ cursor: 'pointer' }} />
                    </IconButton>
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
              name="email"
              onChange={handleInputChange}
              value={profileData?.email ?? ''}
              label="Email: "
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end" style={{ backgroundColor: 'transparent' }}>
                    <IconButton type="submit">
                      <CheckIcon style={{ cursor: 'pointer' }} />
                    </IconButton>
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
              name="nextOfKin.name"
              onChange={handleNestedInputChange}
              value={profileData?.nextOfKin?.name}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end" style={{ backgroundColor: 'transparent' }}>
                    <IconButton type="submit">
                      <CheckIcon style={{ cursor: 'pointer' }} />
                    </IconButton>
                  </InputAdornment>
                )
              }}
              style={{ width: '10em' }}
              label="NextOfKin: "
              variant="standard"
            />
            <TextField
              name="nextOfKin.phone"
              onChange={handleNestedInputChange}
              value={profileData?.nextOfKin?.phone}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end" style={{ backgroundColor: 'transparent' }}>
                    <IconButton type="submit">
                      <CheckIcon style={{ cursor: 'pointer' }} />
                    </IconButton>
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
              name="bankAcc.sort"
              onChange={handleNestedInputChange}
              value={profileData?.bankAcc?.sort}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end" style={{ backgroundColor: 'transparent' }}>
                    <IconButton type="submit">
                      <CheckIcon style={{ cursor: 'pointer' }} />
                    </IconButton>
                  </InputAdornment>
                )
              }}
              style={{ width: '10em' }}
              label="Sort Code: "
              variant="standard"
            />
            <TextField
              name="bankAcc.account"
              onChange={handleNestedInputChange}
              value={profileData?.bankAcc?.account}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end" style={{ backgroundColor: 'transparent' }}>
                    <IconButton type="submit">
                      <CheckIcon style={{ cursor: 'pointer' }} />
                    </IconButton>
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
              name="utr"
              onChange={handleInputChange}
              value={profileData?.utr ?? ''}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end" style={{ backgroundColor: 'transparent' }}>
                    <IconButton type="submit">
                      <CheckIcon style={{ cursor: 'pointer' }} />
                    </IconButton>
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
            <AssignmentIndIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
            <TextField
              name="role"
              onChange={handleInputChange}
              value={profileData?.role ?? ''}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end" style={{ backgroundColor: 'transparent' }}>
                    <IconButton type="submit">
                      <CheckIcon style={{ cursor: 'pointer' }} />
                    </IconButton>
                  </InputAdornment>
                )
              }}
              label="Possition: "
              variant="standard"
              sx={{ width: '90%' }}
            />
          </Box>
        </Box>
        <Box sx={{ '& > :not(style)': { m: 1 } }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <PaidIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
            <TextField
              name="rate"
              onChange={handleInputChange}
              value={profileData?.rate ?? ''}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end" style={{ backgroundColor: 'transparent' }}>
                    <IconButton type="submit">
                      <CheckIcon style={{ cursor: 'pointer' }} />
                    </IconButton>
                  </InputAdornment>
                )
              }}
              label="Rate: "
              variant="standard"
              sx={{ width: '90%' }}
            />
          </Box>
        </Box>
        {!profileData?.rate ? '' : <Button type="submit">Save</Button>}
      </Stack>
    </form>
  );
}
