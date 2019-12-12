import React, { FC } from 'react';
import { CardContent, Typography } from '@material-ui/core';
import { EpisodeEntry } from '../fields/episodes';

interface Props {
  entry: EpisodeEntry;
  className?: string;
}

const EpisodeCard: FC<Props> = ({ entry, className }) => {
  return (
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
};

export default EpisodeCard;
