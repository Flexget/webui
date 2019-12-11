import React, { FC } from 'react';
import { CardContent, Typography, CardMedia } from '@material-ui/core';
import { getCachedUrl } from 'utils/image';
import { normalizeMinutes } from 'utils/time';
import { css } from '@emotion/core';
import theme from 'theme';
import { MovieEntry } from '../fields/movies';

interface Props {
  entry: MovieEntry;
}
const bull = (
  <span
    css={css`
      display: inline-block;
      margin: 0 ${theme.typography.pxToRem(theme.spacing(1))};
    `}
  >
    •
  </span>
);

const summary = css`
  font-size: 1.5rem;
  font-weight: 500;
  margin-top: ${theme.typography.pxToRem(theme.spacing(0.5))};
`;

const MovieCard: FC<Props> = ({
  entry: { backdrops, movieName, movieYear, runtime = 0, genres = [], description = '' },
}) => {
  return (
    <>
      {backdrops && (
        <CardMedia
          component="img"
          alt={`${movieName} backdrops`}
          height="300"
          image={getCachedUrl(Array.isArray(backdrops) ? backdrops[0] : backdrops)}
          title={`${movieName} Backdrops`}
        />
      )}
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2" color="textPrimary">
          {movieName} ({movieYear})
        </Typography>
        <Typography variant="overline" color="textSecondary">
          {normalizeMinutes(runtime)}
          {bull}
          {genres.join(' ')}
        </Typography>
        <Typography css={summary} variant="body1" component="h3">
          Summary
        </Typography>
        <Typography color="textSecondary" variant="body2">
          {description}
        </Typography>
      </CardContent>
    </>
  );
};

export default MovieCard;
