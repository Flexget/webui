import React, { FC, useMemo } from 'react';
import { Typography, Theme } from '@material-ui/core';
import { css } from '@emotion/core';
import BaseCard from 'core/entry/cards/BaseCard';
import { StarRate } from '@material-ui/icons';
import { SeriesEntry, TraktFields, TVDBFields, TVMazeFields } from '../fields/series';
import { Bullet, titleArea, ratingLine } from './styles';
import LinkDropdown from './LinkDropdown';
import { toSeriesEntry } from '../utils';
import { useTraktLookup, useTVDBLookup, useTVMazeLookup } from '../lookup/series';

interface Props {
  entry: SeriesEntry;
  className?: string;
}

const summary = (theme: Theme) => css`
  font-size: 1.5rem;
  font-weight: 500;
  margin-top: ${theme.typography.pxToRem(theme.spacing(0.5))};
`;

const SeriesCard: FC<Props> = ({ entry, className }) => {
  const { loading: tvdbLoading, entry: tvdbEntry } = useTVDBLookup(
    entry[TVDBFields.ID] ?? entry.seriesName,
    {},
  );
  const { loading: traktLoading, entry: traktEntry } = useTraktLookup({
    title: entry.seriesName,
    traktId: entry[TraktFields.ID],
  });
  const { loading: tvMazeLoading, entry: tvMazeEntry } = useTVMazeLookup(
    entry[TVMazeFields.ID] ?? entry.seriesName,
  );

  const {
    posters,
    seriesName,
    quality,
    rating,
    genres = [],
    description = '',
    contentRating = '',
    ...hydratedEntry
  } = useMemo(
    () =>
      toSeriesEntry({
        ...entry,
        ...(traktEntry ?? {}),
        ...(tvdbEntry ?? {}),
        ...(tvMazeEntry ?? {}),
      }),
    [entry, traktEntry, tvdbEntry, tvMazeEntry],
  );
  const options = [
    { url: hydratedEntry[TVMazeFields.Url], label: 'TVMaze' },
    { url: hydratedEntry[TVDBFields.Url], label: 'TVDB' },
    { url: hydratedEntry[TraktFields.Url], label: 'Trakt' },
  ];

  const loading = tvdbLoading || traktLoading || tvMazeLoading;
  return (
    <BaseCard
      className={className}
      images={posters}
      isPoster
      label={`${seriesName} Image`}
      loading={loading}
    >
      <div css={titleArea}>
        <Typography gutterBottom variant="h5" component="h2" color="textPrimary">
          {seriesName}
        </Typography>
        <LinkDropdown options={options} />
      </div>
      <Typography variant="h6" color="textPrimary" css={ratingLine}>
        <StarRate color="primary" /> {rating}
      </Typography>
      <Typography variant="overline" color="textSecondary">
        {quality}
        {!!quality && <Bullet />}
        {contentRating}
        {!!contentRating && <Bullet />}
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

export default SeriesCard;
