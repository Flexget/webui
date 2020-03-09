import React, { FC } from 'react';
import { Typography, Theme } from '@material-ui/core';
import { css } from '@emotion/core';
import BaseCard from 'core/entry/cards/BaseCard';
import { StarRate } from '@material-ui/icons';
import { SeriesEntry, TraktFields, TVDBFields, TVMazeFields, IMDBFields } from '../fields/series';
import { Bullet, titleArea, ratingLine, selectableType } from './styles';
import LinkDropdown from './LinkDropdown';
import { useSeriesLookup } from '../lookup/series';

interface Props {
  entry: SeriesEntry;
  className?: string;
}

const summary = (theme: Theme) => css`
  font-size: 1.5rem;
  font-weight: 500;
  margin-top: ${theme.typography.pxToRem(theme.spacing(0.5))};
`;

const SeriesCard: FC<Props> = ({ entry, className, children }) => {
  const {
    loading,
    entry: {
      posters,
      seriesName,
      rating,
      network,
      genres = [],
      description = '',
      contentRating = '',
      firstAiredDate,
      votes,
      status,
      ...hydratedEntry
    },
  } = useSeriesLookup(entry);
  const options = [
    { url: hydratedEntry[IMDBFields.Url], label: 'IMDB' },
    { url: hydratedEntry[TVMazeFields.Url], label: 'TVMaze' },
    { url: hydratedEntry[TVDBFields.Url], label: 'TVDB' },
    { url: hydratedEntry[TraktFields.Url], label: 'Trakt' },
  ];

  return (
    <BaseCard
      className={className}
      images={posters}
      isPoster
      label={`${seriesName} Image`}
      loading={loading}
    >
      <div css={titleArea}>
        <Typography
          gutterBottom
          variant="h5"
          component="h2"
          color="textPrimary"
          css={selectableType}
        >
          {seriesName}
        </Typography>
        <LinkDropdown options={options} />
      </div>
      <Typography variant="h6" color="textPrimary" css={ratingLine}>
        <StarRate color="primary" /> {rating} ({votes}) - ({firstAiredDate}) - ({status})
      </Typography>
      <Typography variant="overline" color="textSecondary">
        {network}
        {!!network && <Bullet />}
        {contentRating}
        {!!contentRating && <Bullet />}
        {genres.join(' ')}
      </Typography>
      {children}
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
