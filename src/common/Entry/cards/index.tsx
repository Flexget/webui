import React, { FC } from 'react';
import { RawEntry, CardType } from '../types';
import { toEntry } from '../utils';
import MovieCard from './Movie';
import SeriesCard from './Series';
import EpisodeCard from './Episode';
import DefaultCard from './Default';

interface Props {
  entry: RawEntry;
}

const EntryCard: FC<Props> = ({ entry: rawEntry }) => {
  const entry = toEntry(rawEntry);

  switch (entry.type) {
    case CardType.Movie:
      return <MovieCard entry={entry} />;
    case CardType.Series:
      return <SeriesCard entry={entry} />;
    case CardType.Episode:
      return <EpisodeCard entry={entry} />;
    default:
      return <DefaultCard entry={entry} />;
  }
};

export default EntryCard;
