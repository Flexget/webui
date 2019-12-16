import React, { FC } from 'react';
import { CardContent, Typography, CardMedia } from '@material-ui/core';
import { css } from '@emotion/core';
import theme from 'core/theme';
import { getCachedUrl } from 'utils/image';
import { EpisodeEntry } from '../fields/episodes';
import { Bullet } from './styles';

interface Props {
  entry: EpisodeEntry;
  className?: string;
}

const summary = css`
  font-size: 1.5rem;
  font-weight: 500;
  margin-top: ${theme.typography.pxToRem(theme.spacing(0.5))};
`;

const imageCss = css`
  height: 30rem;
`;

const EpisodeCard: FC<Props> = ({
  entry: {
    seriesName,
    genres = [],
    description = '',
    image = '',
    episodeName,
    contentRating,
    seriesId,
  },
  className,
}) => {
  return (
    <div className={className}>
      {image?.length && (
        <CardMedia
          css={imageCss}
          role="img"
          aria-label={`${seriesName} backdrop`}
          image={getCachedUrl(Array.isArray(image) ? image[0] : image)}
          title={`${seriesName} Backdrop`}
        />
      )}
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2" color="textPrimary">
          {seriesName} - {episodeName} - {seriesId}
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
      </CardContent>
    </div>
  );
};

export default EpisodeCard;
