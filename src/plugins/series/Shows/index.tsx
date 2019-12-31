import React, { FC } from 'react';
import { Grid } from '@material-ui/core';

const List: FC = () => {
  return (
    <Grid container spacing={2}>
      {entries.ma(entry => (
        <Grid item key={entry.id} xs={12} md={6} lg={4} />
      ))}
    </Grid>
  );
};

export default List;
