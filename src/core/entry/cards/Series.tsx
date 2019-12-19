import React, { FC } from 'react';
import { CardContent, Typography, CardMedia, Theme } from '@material-ui/core';
import { css } from '@emotion/core';
import { getCachedUrl } from 'utils/image';
import { SeriesEntry } from '../fields/series';
import { Bullet } from './styles';

interface Props {
  entry: SeriesEntry;
  className?: string;
}

const summary = (theme: Theme) => css`
  font-size: 1.5rem;
  font-weight: 500;
  margin-top: ${theme.typography.pxToRem(theme.spacing(0.5))};
`;

const image = css`
  height: 12rem;
`;

const SeriesCard: FC<Props> = ({
  entry: { backdrops, seriesName, genres = [], description = '', contentRating = '' },
  className,
}) => {
  return (
    <div className={className}>
      {backdrops?.length && (
        <CardMedia
          css={image}
          role="img"
          aria-label={`${seriesName} backdrop`}
          image={getCachedUrl(Array.isArray(backdrops) ? backdrops[0] : backdrops)}
          title={`${seriesName} Backdrop`}
        />
      )}
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2" color="textPrimary">
          {seriesName}
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
      </CardContent>
    </div>
  );
};

export default SeriesCard;
