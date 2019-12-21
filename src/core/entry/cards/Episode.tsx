import React, { FC } from 'react';
import { Typography, Theme } from '@material-ui/core';
import { css } from '@emotion/core';
import LinkDropdown from 'core/entry/cards/LinkDropdown';
import { EpisodeEntry, TVMazeFields, TVDBFields, TraktFields } from '../fields/episodes';
import { Bullet, titleArea } from './styles';
import BaseCard from './BaseCard';

interface Props {
  entry: EpisodeEntry;
  className?: string;
}

const summary = (theme: Theme) => css`
  font-size: 1.5rem;
  font-weight: 500;
  margin-top: ${theme.typography.pxToRem(theme.spacing(0.5))};
`;

const EpisodeCard: FC<Props> = ({
  entry: {
    seriesSeason,
    seriesEpisode,
    seriesName,
    genres = [],
    description = '',
    image = '',
    episodeName,
    contentRating,
    seriesId,
    quality,
    ...entry
  },
  className,
}) => {
  const traktUrl = entry[TraktFields.Url]
    ? `${entry[TraktFields.Url]}/seasons/${seriesSeason}/episodes/${seriesEpisode}`
    : undefined;
  const options = [
    { url: entry[TVMazeFields.Url], label: 'TVMaze' },
    { url: entry[TVDBFields.Url], label: 'TVDB' },
    { url: traktUrl, label: 'Trakt' },
  ];

  return (
    <BaseCard className={className} images={image} label={`${episodeName} Image`}>
      <div css={titleArea}>
        <Typography gutterBottom variant="h5" component="h2" color="textPrimary">
          {seriesName} - {episodeName} - {seriesId}
        </Typography>
        <LinkDropdown options={options} />
      </div>
      <Typography variant="overline" color="textSecondary">
        {quality}
        {!!quality && <Bullet />}
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

export default EpisodeCard;
