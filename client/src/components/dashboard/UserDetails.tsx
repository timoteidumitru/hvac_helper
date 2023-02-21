import { useContext } from 'react';
import { ProfileContext } from '../../contexts/ProfileContext';
import { Box, InputAdornment, TextField } from '@mui/material';
import Stack from '@mui/material/Stack';
import CheckIcon from '@mui/icons-material/Check';
import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';
import BusinessIcon from '@mui/icons-material/Business';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import PaidIcon from '@mui/icons-material/Paid';

export default function UserDetails() {
  const { profileData } = useContext(ProfileContext);
  console.log(profileData);

  return (
    <Stack sx={{ backgroundColor: 'white', color: 'black', paddingBottom: '1em', marginBottom: '1em', width: '100%' }}>
      <Box sx={{ '& > :not(style)': { m: 1 } }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-end', width: '100%' }}>
          <BusinessIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
          <TextField
            value={profileData?.address}
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
  );
}
