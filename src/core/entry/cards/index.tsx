import React, { FC } from 'react';
import { RawEntry } from '../types';
import {
  isMovie,
  isEpisode,
  isSeries,
  toMovieEntry,
  toSeriesEntry,
  toEpisodeEntry,
} from '../utils';
import MovieCard from './Movie';
import SeriesCard from './Series';
import EpisodeCard from './Episode';
import DefaultCard from './Default';

interface Props {
  entry: RawEntry;
  className?: string;
}

const EntryCard: FC<Props> = ({ entry, className, children }) => {
  if (isMovie(entry)) {
    return (
      <MovieCard entry={toMovieEntry(entry)} className={className}>
        {children}
      </MovieCard>
    );
  }

  if (isSeries(entry)) {
    return (
      <SeriesCard entry={toSeriesEntry(entry)} className={className}>
        {children}
      </SeriesCard>
    );
  }

  if (isEpisode(entry)) {
    return (
      <EpisodeCard
        series={toSeriesEntry(entry)}
        entry={toEpisodeEntry(entry)}
        className={className}
      >
        {children}
      </EpisodeCard>
    );
  }

  return <DefaultCard entry={entry} className={className} />;
};

export default EntryCard;
