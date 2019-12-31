import { Direction } from 'utils/query';
import { Episode } from './episodes';

export interface Show {
  name: string;
  alternateNames: string[];
  beginEpisode?: Episode;
  id: 23;
  inTasks: string[];
  latestEntity?: Episode;
}

export const enum SortBy {
  ShowName = 'show_name',
  LastDownloadDate = 'last_download_date',
}

export interface GetShowOptions {
  page: number;
  perPage: number;
  order: Direction;
  sortBy: SortBy;
}

export interface ShowRequest {
  name: string;
  alternateNames?: string[];
  beginEpisode?: string;
}
