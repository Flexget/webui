import React, { FC, useMemo } from 'react';
import { Typography, Theme } from '@material-ui/core';
import { normalizeMinutes } from 'utils/time';
import { css } from '@emotion/core';
import { StarRate } from '@material-ui/icons';
import { toMovieEntry } from 'core/entry/utils';
import { MovieEntry, IMDBFields, TMDBFields, TraktFields } from '../fields/movies';
import { Bullet, titleArea, ratingLine } from './styles';
import BaseCard from './BaseCard';
import LinkDropdown from './LinkDropdown';
import { useTraktLookup, useTMDBLookup } from '../lookup/movies';

interface Props {
  entry: MovieEntry;
  className?: string;
}

const summary = (theme: Theme) => css`
  font-size: 1.5rem;
  font-weight: 500;
  margin-top: ${theme.typography.pxToRem(theme.spacing(0.5))};
`;

const MovieCard: FC<Props> = ({ entry, className }) => {
  const { loading: tmdbLoading, entry: tmdbEntry } = useTMDBLookup({
    title: entry.movieName,
    tmdbId: entry[TMDBFields.ID],
    includePosters: true,
    includeBackdrops: true,
  });
  const { loading: traktLoading, entry: traktEntry } = useTraktLookup({
    title: entry.movieName,
    traktId: entry[TraktFields.ID],
  });
  // const { loading: imdbLoading, entry: imdbEntry } = useIMDBLookup(entry.movieName || entry[IMDBFields.ID]);

  const {
    backdrops,
    posters,
    movieName,
    movieYear,
    runtime = 0,
    genres = [],
    description = '',
    quality,
    rating,
    votes,
    ...hydratedEntry
  } = useMemo(
    () =>
      toMovieEntry({
        ...entry,
        ...(traktEntry ?? {}),
        ...(tmdbEntry ?? {}),
        // ...(imdbEntry ?? {}),
      }),
    [entry, tmdbEntry, traktEntry],
  );

  const isPoster = !backdrops?.length;
  const images = isPoster ? posters : backdrops;
  const options = [
    { url: hydratedEntry[IMDBFields.Url], label: 'IMDB' },
    { url: hydratedEntry[TMDBFields.Url], label: 'TMDB' },
    { url: hydratedEntry[TraktFields.Url], label: 'Trakt' },
  ];

  const loading = tmdbLoading || traktLoading;

  return (
    <>
      <BaseCard
        className={className}
        images={images}
        label={`${movieName} Image`}
        isPoster={isPoster && !loading}
        loading={loading}
      >
        <div css={titleArea}>
          <Typography variant="h5" component="h2" color="textPrimary">
            {movieName} ({movieYear})
          </Typography>
          <LinkDropdown options={options} />
        </div>
        <Typography variant="h6" color="textPrimary" css={ratingLine}>
          <StarRate color="primary" /> {rating} ({votes})
        </Typography>
        <Typography variant="overline" color="textSecondary">
          {quality}
          {!!quality && <Bullet />}
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
