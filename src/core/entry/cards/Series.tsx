import React, { FC } from 'react';
import { Typography, Theme } from '@material-ui/core';
import { css } from '@emotion/core';
import BaseCard from 'core/entry/cards/BaseCard';
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

const SeriesCard: FC<Props> = ({
  entry: { posters, seriesName, genres = [], description = '', contentRating = '' },
  className,
}) => {
  return (
    <BaseCard css={className} images={posters} isPoster label={`${seriesName} Image`}>
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
    </BaseCard>
  );
};

export default SeriesCard;
