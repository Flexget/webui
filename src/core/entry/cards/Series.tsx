import React, { FC } from 'react';
import { Typography, Theme } from '@material-ui/core';
import { css } from '@emotion/core';
import BaseCard from 'core/entry/cards/BaseCard';
import { StarRate } from '@material-ui/icons';
import { SeriesEntry, TraktFields, TVDBFields, TVMazeFields } from '../fields/series';
import { Bullet, titleArea, ratingLine } from './styles';
import LinkDropdown from './LinkDropdown';

interface Props {
  entry: SeriesEntry;
  className?: string;
}

const summary = (theme: Theme) => css`
  font-size: 1.5rem;
  font-weight: 500;
  margin-top: ${theme.typography.pxToRem(theme.spacing(0.5))};
`;

const SeriesCard: FC<Props> = ({
  entry: {
    posters,
    seriesName,
    quality,
    rating,
    genres = [],
    description = '',
    contentRating = '',
    ...entry
  },
  className,
}) => {
  const options = [
    { url: entry[TVMazeFields.Url], label: 'TVMaze' },
    { url: entry[TVDBFields.Url], label: 'TVDB' },
    { url: entry[TraktFields.Url], label: 'Trakt' },
  ];
  return (
    <BaseCard css={className} images={posters} isPoster label={`${seriesName} Image`}>
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
