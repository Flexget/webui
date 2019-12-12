import React, { FC } from 'react';
import { CardContent, Typography, CardMedia } from '@material-ui/core';
import { getCachedUrl } from 'utils/image';
import { normalizeMinutes } from 'utils/time';
import { css } from '@emotion/core';
import theme from 'theme';
import { MovieEntry } from '../fields/movies';
import { Bullet } from './styles';

interface Props {
  entry: MovieEntry;
  className?: string;
}

const summary = css`
  font-size: 1.5rem;
  font-weight: 500;
  margin-top: ${theme.typography.pxToRem(theme.spacing(0.5))};
`;

const image = css`
  height: 30rem;
`;

const MovieCard: FC<Props> = ({
  entry: { backdrops, movieName, movieYear, runtime = 0, genres = [], description = '' },
  className,
}) => {
  return (
    <div className={className}>
      {backdrops?.length && (
        <CardMedia
          css={image}
          role="img"
          aria-label={`${movieName} backdrop`}
          image={getCachedUrl(Array.isArray(backdrops) ? backdrops[0] : backdrops)}
          title={`${movieName} Backdrop`}
        />
      )}
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2" color="textPrimary">
          {movieName} ({movieYear})
        </Typography>
        <Typography variant="overline" color="textSecondary">
          {!!runtime && normalizeMinutes(runtime)}
          {!!runtime && <Bullet />}
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

export default MovieCard;
