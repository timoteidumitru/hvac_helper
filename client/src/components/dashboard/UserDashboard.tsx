import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

const StyledTab = styled(Tab)(({ theme }) => ({
  textTransform: 'capitalize',
  minWidth: 0,
  marginRight: theme.spacing(1),
  fontWeight: 600,
  color: 'rgba(0, 0, 0, 0.6)',
  '&.Mui-selected': {
    color: 'khaki'
  }
}));

export default function UserDashboard() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <StyledTab label="Last 2 Weeks" value="1" />
            <StyledTab label="Last Month" value="2" />
            <StyledTab label="Last Year" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">Item One</TabPanel>
        <TabPanel value="2">Item Two</TabPanel>
        <TabPanel value="3">Item Three</TabPanel>
      </TabContext>
    </Box>
  );
}
