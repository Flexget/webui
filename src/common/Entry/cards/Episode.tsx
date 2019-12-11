import React, { FC } from 'react';
import { CardContent, Typography } from '@material-ui/core';
import { EpisodeEntry } from '../fields/episodes';

interface Props {
  entry: EpisodeEntry;
}

const EpisodeCard: FC<Props> = ({ entry }) => {
  return (
    <CardContent>
      <Typography gutterBottom variant="h5" component="h2" color="textPrimary">
        {entry.title}
      </Typography>
      <Typography variant="body2" color="textSecondary" component="p">
        {entry.originalUrl}
      </Typography>
    </CardContent>
  );
};

export default EpisodeCard;
