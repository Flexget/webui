import React, { FC } from 'react';
import { Typography, Theme } from '@material-ui/core';
import { normalizeMinutes } from 'utils/time';
import { css } from '@emotion/core';
import { StarRate } from '@material-ui/icons';
import { MovieEntry, IMDBFields, TMDBFields, TraktFields } from '../fields/movies';
import { Bullet, titleArea, ratingLine, selectableType } from './styles';
import BaseCard from './BaseCard';
import LinkDropdown from './LinkDropdown';
import { useMovieLookup } from '../lookup/movies';

interface Props {
  entry: MovieEntry;
  className?: string;
}

const summary = (theme: Theme) => css`
  font-size: 1.5rem;
  font-weight: 500;
  margin-top: ${theme.typography.pxToRem(theme.spacing(0.5))};
`;

const originalTitle = (theme: Theme) => css`
  font-size: 2.2rem;
  font-weight: 400;
  font-style: oblique;
  margin-bottom: ${theme.typography.pxToRem(theme.spacing(0.5))};
`;

const MovieCard: FC<Props> = ({ entry, className, children }) => {
  const {
    loading,
    entry: {
      backdrops,
      posters,
      movieName,
      movieYear,
      runtime = 0,
      genres = [],
      description = '',
      originalName,
      quality,
      rating,
      votes,
      ...hydratedEntry
    },
  } = useMovieLookup(entry);

  const isPoster = !backdrops?.length;
  const images = isPoster ? posters : backdrops;
  const options = [
    { url: hydratedEntry[IMDBFields.Url], label: 'IMDB' },
    { url: hydratedEntry[TMDBFields.Url], label: 'TMDB' },
    { url: hydratedEntry[TraktFields.Url], label: 'Trakt' },
  ];

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
          <Typography css={selectableType} variant="h5" component="h2" color="textPrimary">
            {movieName} ({movieYear})
          </Typography>
          <LinkDropdown options={options} />
        </div>
       {originalName && originalName !== movieName &&
        <Typography css={originalTitle} variant="h5" component="h2" color="textPrimary">
          {originalName}
        </Typography>
        }
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
        {children}
      </BaseCard>
    </>
  );
};

export default MovieCard;
