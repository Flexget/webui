import React, { FC } from 'react';
import { Typography, Theme } from '@material-ui/core';
import { css } from '@emotion/core';
import LinkDropdown from 'core/entry/cards/LinkDropdown';
import { useEpisodeLookup } from 'core/entry/lookup/episodes';
import { EpisodeEntry, TVMazeFields, TVDBFields } from '../fields/episodes';
import { SeriesEntry, TraktFields } from '../fields/series';
import { Bullet, titleArea, selectableType } from './styles';
import BaseCard from './BaseCard';

interface Props {
  series: SeriesEntry;
  entry: EpisodeEntry;
  className?: string;
}

const summary = (theme: Theme) => css`
  font-size: 1.5rem;
  font-weight: 500;
  margin-top: ${theme.typography.pxToRem(theme.spacing(0.5))};
`;

const EpisodeCard: FC<Props> = ({ series: rawSeries, entry: rawEpisode, className, children }) => {
  const {
    loading,
    seriesEntry: { seriesName, genres = [], contentRating, network, ...series },
    entry: {
      seriesSeason,
      seriesEpisode,
      description = '',
      image = '',
      episodeName,
      seriesId,
      quality,
      ...entry
    },
  } = useEpisodeLookup(rawSeries, rawEpisode);
  const traktUrl = series[TraktFields.Url]
    ? `${entry[TraktFields.Url]}/seasons/${seriesSeason}/episodes/${seriesEpisode}`
    : undefined;
  const options = [
    { url: entry[TVMazeFields.Url], label: 'TVMaze' },
    { url: entry[TVDBFields.Url], label: 'TVDB' },
    { url: traktUrl, label: 'Trakt' },
  ];

  return (
    <BaseCard className={className} images={image} label={`${episodeName} Image`} loading={loading}>
      <div css={titleArea}>
        <Typography
          gutterBottom
          variant="h5"
          component="h2"
          color="textPrimary"
          css={selectableType}
        >
          {seriesName} - {episodeName} - {seriesId}
        </Typography>
        <LinkDropdown options={options} />
      </div>
      <Typography variant="overline" color="textSecondary">
        {quality}
        {!!quality && <Bullet />}
        {network}
        {!!network && <Bullet />}
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
      {children}
    </BaseCard>
  );
};

export default EpisodeCard;
