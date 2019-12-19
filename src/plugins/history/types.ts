import { Direction } from 'utils/query';

export const enum GroupByFields {
  Task = 'task',
  Time = 'time',
}

export const enum SortByFields {
  Task = 'task',
  Time = 'time',
  Url = 'url',
  Details = 'details',
  Id = 'id',
  Filename = 'filename',
  Title = 'title',
}

export interface GetHistoryOptions {
  page?: number;
  sortBy?: SortByFields;
  order?: Direction;
  task?: string;
  groupBy?: GroupByFields;
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
