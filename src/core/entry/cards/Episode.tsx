import React, { FC } from 'react';
import { Typography, Theme } from '@material-ui/core';
import { css } from '@emotion/core';
import { EpisodeEntry } from '../fields/episodes';
import { Bullet } from './styles';
import BaseCard from './BaseCard';

interface Props {
  entry: EpisodeEntry;
  className?: string;
}

const summary = (theme: Theme) => css`
  font-size: 1.5rem;
  font-weight: 500;
  margin-top: ${theme.typography.pxToRem(theme.spacing(0.5))};
`;

const EpisodeCard: FC<Props> = ({
  entry: {
    seriesName,
    genres = [],
    description = '',
    image = '',
    episodeName,
    contentRating,
    seriesId,
  },
  className,
}) => {
  return (
    <BaseCard className={className} images={image} label={`${episodeName} Image`}>
      <Typography gutterBottom variant="h5" component="h2" color="textPrimary">
        {seriesName} - {episodeName} - {seriesId}
      </Typography>
      <Typography variant="overline" color="textSecondary">
        {contentRating}
        {contentRating && <Bullet />}
        {genres.join(' ')}
      </Typography>
      <Typography css={summary} variant="body1" component="h3">
        Summary
      </Typography>
      <Typography color="textSecondary" variant="body2">
        {description}
      </Typography>
    </BaseCard>
  );
};

export default EpisodeCard;
