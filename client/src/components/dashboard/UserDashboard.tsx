import * as React from 'react';
import { styled, Theme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import TwoWeeks from './TwoWeeks';
import ThisWeek from './ThisWeek';
import LastMount from './LastMonth';
import LastYear from './LastYear';

const StyledTab = styled(Tab)(({ theme }: { theme: Theme }) => ({
  textTransform: 'capitalize',
  marginRight: theme.spacing(1),
  fontWeight: 500,
  padding: '0.2em',
  minHeight: '10px',
  color: 'white',
  '&.Mui-selected': {
    borderBottom: '3px solid #00ff1f',
    borderRight: '3px solid #00ff1f',
    color: 'greenyellow'
  }
}));

export default function UserDashboard(): JSX.Element {
  const [value, setValue] = React.useState<string>('0');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
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
          <TabList onChange={handleChange} sx={{ display: 'flex', justifyContent: 'center' }}>
            <StyledTab label="This Week" value="0" />
            <StyledTab label="Two Weeks" value="1" />
            <StyledTab label="One Month" value="2" />
            <StyledTab label="Last Year" value="3" />
          </TabList>
        </Box>
        <TabPanel sx={{ padding: 0, minHeight: '60vh', backgroundColor: 'white' }} value="0">
          <ThisWeek value={57} />
        </TabPanel>
        <TabPanel sx={{ padding: 0, minHeight: '60vh', backgroundColor: 'white' }} value="1">
          <TwoWeeks startDate={new Date('02/13/2023')} />
        </TabPanel>
        <TabPanel sx={{ padding: 0, minHeight: '60vh', backgroundColor: 'white' }} value="2">
          <LastMount value={57} color={'primary'} />
        </TabPanel>
        <TabPanel sx={{ padding: 0, minHeight: '60vh', backgroundColor: 'white' }} value="3">
          <LastYear value={57} color={'primary'} />
        </TabPanel>
      </TabContext>
    </Box>
  );
}
