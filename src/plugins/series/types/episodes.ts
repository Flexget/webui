import { Direction } from 'utils/query';
import { Release } from './releases';

export const enum IdentifiedBy {
  Ep = 'ep',
  Sequence = 'sequence',
  Date = 'date',
}

export interface Episode {
  firstSeen: string;
  id: number;
  identifiedBy: IdentifiedBy;
  idetifier: string;
  season: number;
  number: number;
  numberOfReleases: number;
  premier: string | false;
  seiresId: number;
  latestRelease?: Release;
}

export interface GetEpisodeOptions {
  page: number;
  perPage: number;
  order: Direction;
}
