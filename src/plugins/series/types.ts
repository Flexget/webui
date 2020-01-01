import { Direction } from 'utils/query';

export interface Show {
  name: string;
  alternateNames: string[];
  beginEpisode?: Episode;
  id: 23;
  inTasks: string[];
  latestEntity?: Episode;
}

export const enum SortByShow {
  ShowName = 'show_name',
  LastDownloadDate = 'last_download_date',
}

export const enum ConfigState {
  Configured = 'configured',
  Unconfigured = 'unconfigured',
  All = 'all',
}

export interface GetShowOptions {
  page: number;
  perPage: number;
  order: Direction;
  sortBy: SortByShow;
  inConfig?: ConfigState;
}

export interface ShowRequest {
  name: string;
  alternateNames?: string[];
  beginEpisode?: string;
}

export interface Release {
  downloaded: boolean;
  episodeId: number;
  firstSeen: string;
  id: number;
  properCount: number;
  quality: string;
  title: string;
}

export const enum SortByRelease {
  FirstSeen = 'first_seen',
  Downoaded = 'downloaded',
  ProperCount = 'proper_count',
  Title = 'title',
}

export interface GetReleaseOptions {
  page: number;
  perPage: number;
  order: Direction;
  sortBy: SortByRelease;
}

export const enum IdentifiedBy {
  Ep = 'ep',
  Sequence = 'sequence',
  Date = 'date',
}

export interface Episode {
  firstSeen: string;
  id: number;
  identifiedBy: IdentifiedBy;
  identifier: string;
  season: number;
  number: number;
  numberOfReleases: number;
  premier: string | false;
  seriesId: number;
  latestRelease?: Release;
}

export interface GetEpisodeOptions {
  page: number;
  perPage: number;
  order: Direction;
}
