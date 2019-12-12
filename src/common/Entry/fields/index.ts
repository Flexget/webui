import { CardType, BaseEntry } from 'common/Entry/types';
import { MovieEntry } from './movies';
import { EpisodeEntry } from './episodes';
import { SeriesEntry } from './series';

export interface DefaultEntry extends BaseEntry {
  type: CardType.Default;
}

export type Entry = DefaultEntry | MovieEntry | SeriesEntry | EpisodeEntry;
