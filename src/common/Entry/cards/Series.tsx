import React, { FC } from 'react';
import { CardContent, Typography, CardMedia } from '@material-ui/core';
import theme from 'theme';
import { css } from '@emotion/core';
import { getCachedUrl } from 'utils/image';
import { SeriesEntry } from '../fields/series';

interface Props {
  entry: SeriesEntry;
  className?: string;
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

const wrapper = css`
  display: flex;
`;

const image = css`
  background-size: contain;
  background-position: top left;
  width: 30%;
`;

const content = css`
  flex: 1 0 auto;
  max-width: 70%;
  display: flex;
  flex-direction: column;
`;

const SeriesCard: FC<Props> = ({
  entry: { posters, seriesName, genres = [], description = '', contentRating = '' },
  className,
}) => {
  return (
    <div css={wrapper} className={className}>
      {posters?.length && (
        <CardMedia
          aria-label={`${seriesName} poster`}
          image={getCachedUrl(Array.isArray(posters) ? posters[0] : posters)}
          title={`${seriesName} Poster`}
          css={image}
        />
      )}
      <CardContent css={content}>
        <Typography gutterBottom variant="h5" component="h2" color="textPrimary">
          {seriesName}
        </Typography>
        <Typography variant="overline" color="textSecondary">
          {contentRating}
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
    </div>
  );
};

export default SeriesCard;
