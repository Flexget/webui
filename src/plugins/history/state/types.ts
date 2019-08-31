import { Direction } from 'utils/query';

export interface GetHistoryOptions {
  page?: number;
  sortBy?: string;
  order?: Direction.Desc;
}

export interface History {
  task: string;
  title: string;
  url: string;
  filename: string;
  details: string;
  time: string;
  id: number;
}
