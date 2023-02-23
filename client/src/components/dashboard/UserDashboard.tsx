import * as React from 'react';
import { styled, Theme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import TwoWeeks from './TwoWeeks';

const StyledTab = styled(Tab)(({ theme }: { theme: Theme }) => ({
  textTransform: 'capitalize',
  minWidth: 0,
  marginRight: theme.spacing(1),
  fontWeight: 500,
  padding: '0.1em',
  borderRight: '3px solid black',
  minHeight: '10px',
  paddingRight: '0.4em',
  '&:last-child': {
    borderRight: 'none'
  },
  color: 'white',
  '&.Mui-selected': {
    borderBottom: '4px solid #00ff1f',
    color: 'greenyellow'
  }
}));

export default function UserDashboard(): JSX.Element {
  const [value, setValue] = React.useState<string>('0');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            justifyContent: 'space-around',
            margin: '0 auto',
            alignItems: 'center',
            display: 'flex',
            width: '100%'
          }}
        >
          <TabList onChange={handleChange} sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <StyledTab label="This Week" value="0" />
            <StyledTab label="2 Weeks" value="1" />
            <StyledTab label="One Month" value="2" />
            <StyledTab label="Last Year" value="3" />
          </TabList>
        </Box>
        <TabPanel sx={{ padding: 0 }} value="0">
          This Week
        </TabPanel>
        <TabPanel sx={{ padding: 0 }} value="1">
          <TwoWeeks startDate={new Date('02/13/2023')} />
        </TabPanel>
        <TabPanel sx={{ padding: 0 }} value="2">
          Last Month Pannel
        </TabPanel>
        <TabPanel sx={{ padding: 0 }} value="3">
          Last Year Pannel
        </TabPanel>
      </TabContext>
    </Box>
  );
}
