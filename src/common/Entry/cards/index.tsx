import React, { FC } from 'react';
import { RawEntry, CardType } from '../types';
import { toEntry } from '../utils';
import MovieCard from './Movie';
import SeriesCard from './Series';
import EpisodeCard from './Episode';
import DefaultCard from './Default';

interface Props {
  entry: RawEntry;
  className?: string;
}

const EntryCard: FC<Props> = ({ entry: rawEntry, className }) => {
  const entry = toEntry(rawEntry);

  switch (entry.type) {
    case CardType.Movie:
      return <MovieCard entry={entry} className={className} />;
    case CardType.Series:
      return <SeriesCard entry={entry} className={className} />;
    case CardType.Episode:
      return <EpisodeCard entry={entry} className={className} />;
    default:
      return <DefaultCard entry={entry} className={className} />;
  }
};

export default EntryCard;
