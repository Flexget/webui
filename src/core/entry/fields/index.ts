import { CardType, BaseEntry } from 'core/entry/types';
import { MovieEntry } from './movies';
import { EpisodeEntry } from './episodes';
import { SeriesEntry } from './series';

export interface DefaultEntry extends BaseEntry {
  type: CardType.Default;
}

export type Entry = DefaultEntry | MovieEntry | SeriesEntry | EpisodeEntry;
