import React, { FC } from 'react';
import { Typography, Theme } from '@material-ui/core';
import { normalizeMinutes } from 'utils/time';
import { css } from '@emotion/core';
import { MovieEntry, IMDBFields, TMDBFields, TraktFields } from '../fields/movies';
import { Bullet } from './styles';
import BaseCard from './BaseCard';
import EntryCardHeader from './EntryCardHeader';

interface Props {
  entry: MovieEntry;
  className?: string;
}

const summary = (theme: Theme) => css`
  font-size: 1.5rem;
  font-weight: 500;
  margin-top: ${theme.typography.pxToRem(theme.spacing(0.5))};
`;

const MovieCard: FC<Props> = ({
  entry: { backdrops, posters, movieName, movieYear, runtime = 0, genres = [], description = '' },
  className,
}) => {
  const isPoster = !backdrops?.length;
  const images = isPoster ? posters : backdrops;
  return (
    <>
      <BaseCard
        className={className}
        images={images}
        label={`${movieName} Image`}
        isPoster={isPoster}
      >
        <Typography variant="h5" component="h2" color="textPrimary">
          {movieName} - ({movieYear})
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
      </BaseCard>
    </>
  );
};

export default MovieCard;

export const MovieCardHeader: FC<Props> = ({
  entry: { movieName, movieYear, quality, ...entry },
}) => {
  const options = [
    { url: entry[IMDBFields.Url], label: 'IMDB' },
    { url: entry[TMDBFields.Url], label: 'TMDB' },
    { url: entry[TraktFields.Url], label: 'Trakt' },
  ];

  return (
    <EntryCardHeader title={`${movieName} (${movieYear})`} subheader={quality} options={options} />
  );
};
