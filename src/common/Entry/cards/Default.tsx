import React, { FC } from 'react';
import { CardContent, Typography } from '@material-ui/core';
import { DefaultEntry } from '../fields';

interface Props {
  entry: DefaultEntry;
}

const DefaultCard: FC<Props> = ({ entry }) => (
  <CardContent>
    <Typography gutterBottom variant="h5" component="h2" color="textPrimary">
      {entry.title}
    </Typography>
    <Typography variant="body2" color="textSecondary" component="p">
      {entry.originalUrl}
    </Typography>
  </CardContent>
);

export default DefaultCard;
