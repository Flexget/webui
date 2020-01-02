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
import ShowCard from './Series';
import EpisodeCard from './Episode';
import DefaultCard from './Default';

interface Props {
  entry: RawEntry;
  className?: string;
}

const EntryCard: FC<Props> = ({ entry, className }) => {
  if (isMovie(entry)) {
    return <MovieCard entry={toMovieEntry(entry)} className={className} />;
  }

  if (isSeries(entry)) {
    return <ShowCard entry={toSeriesEntry(entry)} className={className} />;
  }

  if (isEpisode(entry)) {
    return (
      <EpisodeCard
        series={toSeriesEntry(entry)}
        entry={toEpisodeEntry(entry)}
        className={className}
      />
    );
  }

  return <DefaultCard entry={entry} className={className} />;
};

export default EntryCard;
