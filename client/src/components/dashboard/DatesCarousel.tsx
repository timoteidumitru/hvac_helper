import { useState } from 'react';
import { Tabs, Tab, makeStyles } from '@material-ui/core';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing(2),
    borderRadius: 10,
    boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
    overflow: 'hidden'
  },
  tabs: {
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  indicator: {
    backgroundColor: theme.palette.primary.main,
    height: 4,
    borderRadius: 4
  },
  tab: {
    textTransform: 'none',
    minWidth: 0,
    [theme.breakpoints.up('sm')]: {
      minWidth: 0
    }
  },
  arrow: {
    color: theme.palette.primary.main,
    height: 20,
    width: 20
  }
}));

function DatesCarousel() {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="on"
        classes={{ root: classes.tabs, indicator: classes.indicator }}
      >
        <Tab label="Sun" className={classes.tab} />
        <Tab label="Mon" className={classes.tab} />
        <Tab label="Tue" className={classes.tab} />
        <Tab label="Wed" className={classes.tab} />
        <Tab label="Thu" className={classes.tab} />
        <Tab label="Fri" className={classes.tab} />
        <Tab label="Sat" className={classes.tab} />
      </Tabs>
      <KeyboardArrowLeftIcon className={classes.arrow} />
      <KeyboardArrowRightIcon className={classes.arrow} />
    </div>
  );
}

export default DatesCarousel;
