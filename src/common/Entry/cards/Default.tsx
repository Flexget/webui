import React, { FC } from 'react';
import { CardContent, Typography } from '@material-ui/core';
import { DefaultEntry } from '../fields';

interface Props {
  entry: DefaultEntry;
  className?: string;
}

const DefaultCard: FC<Props> = ({ entry, className }) => (
  <div className={className}>
    <CardContent>
      <Typography gutterBottom variant="h5" component="h2" color="textPrimary">
        {entry.title}
      </Typography>
      <Typography variant="body2" color="textSecondary" component="p">
        {entry.originalUrl}
      </Typography>
    </CardContent>
  </div>
);

export default DefaultCard;
