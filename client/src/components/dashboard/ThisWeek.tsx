import React from 'react';
import { CircularProgress, CircularProgressProps, Typography } from '@material-ui/core';

type MyCircularProgressProps = {
  value: number; // Progress value from 0 to 100
} & CircularProgressProps;

const ThisWeek: React.FC<MyCircularProgressProps> = ({ value, ...props }) => {
  const progress = value / 72;

  return (
    <div style={{ textAlign: 'center', paddingTop: '1em' }}>
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <CircularProgress
          variant="determinate"
          value={progress * 100}
          {...props}
          style={{ transform: 'rotate(90deg)' }}
          thickness={3}
          size={140}
        />
        <Typography
          variant="h6"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }}
        >
          <span style={{ color: 'green', fontWeight: '600' }}>{value}h</span> <br />
          <span style={{ color: 'orange', fontWeight: '600' }}>of</span> <br />
          <span style={{ color: 'black', fontWeight: '600' }}>72hrs</span>
        </Typography>
      </div>
    </div>
  );
};

export default ThisWeek;
