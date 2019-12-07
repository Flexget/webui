import FlexGetEntry from 'common/FlexGetEntry';
import { Direction } from 'utils/query';

export const enum SortBy {
  Added = 'added',
  Title = 'title',
  URL = 'original_url',
  Approved = 'appoved',
}

export interface Options {
  perPage: number;
  sortBy: SortBy;
  sortOrder: Direction;
}

export interface List {
  id: number;
  name: string;
  addedOn: string;
}

export interface AddListRequest {
  name: string;
}

export interface AddEntryRequest {
  listId: number;
  entry: FlexGetEntry;
}

export interface GetEntriesOptions {
  page?: number;
  sortBy?: SortBy;
}

export interface EntryRequest {
  id: number;
  listId: number;
}

export type SelectedListID = number | 'add';
