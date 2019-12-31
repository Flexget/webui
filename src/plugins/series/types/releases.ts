import { Direction } from 'utils/query';

export interface Release {
  downloaded: boolean;
  episodeId: number;
  firstSeen: string;
  id: number;
  properCount: number;
  quality: string;
  title: string;
}

export const enum SortBy {
  FirstSeen = 'first_seen',
  Downoaded = 'downloaded',
  ProperCount = 'proper_count',
  Title = 'title',
}

export interface GetReleaseOptions {
  page: number;
  perPage: number;
  order: Direction;
  sortBy: SortBy;
}
