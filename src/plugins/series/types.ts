import { Direction } from 'utils/query';

export interface GetShowOptions {
  perPage?: number;
  order?: Direction;
  sortBy?: string;
}

export const enum IdentifiedBy {
  Ep = 'ep',
  Sequence = 'sequence',
  Date = 'date',
}

interface Release {
  downloaded: boolean;
  episodeId: number;
  firstSeen: string;
  id: number;
  properCount: number;
  quality: string;
  title: string;
}

export interface Episode {
  firstSeen: string;
  id: number;
  identifiedBy: IdentifiedBy;
  idetifier: string;
  season: number;
  number: number;
  numberOfReleases: number;
  premieer: string | false;
  seiresId: number;
  latestRelease: Release;
}

export interface Show {
  name: string;
  alternateNames: string[];
  beginEpisode: Episode;
  id: 23;
  inTasks: string[];
  latest_entity: Episode;
}
