import React, { useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: theme.spacing(14),
      width: '100%',
      backgroundColor: theme.palette.grey[200]
    },
    paper: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      width: theme.spacing(20),
      backgroundColor: theme.palette.background.default
    },
    date: {
      fontSize: theme.typography.h5.fontSize,
      fontWeight: theme.typography.h5.fontWeight
    },
    button: {
      padding: theme.spacing(1)
    }
  })
);

const datesOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const Carousel: React.FC = () => {
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleBack = () => {
    setSelectedIndex((selectedIndex + datesOfWeek.length - 1) % datesOfWeek.length);
  };

  const handleNext = () => {
    setSelectedIndex((selectedIndex + 1) % datesOfWeek.length);
  };

  return (
    <div className={classes.root}>
      <IconButton className={classes.button} onClick={handleBack}>
        <KeyboardArrowLeft />
      </IconButton>
      <Paper className={classes.paper}>
        <div className={classes.date}>{datesOfWeek[selectedIndex]}</div>
      </Paper>
      <IconButton className={classes.button} onClick={handleNext}>
        <KeyboardArrowRight />
      </IconButton>
    </div>
  );
};

export default Carousel;
