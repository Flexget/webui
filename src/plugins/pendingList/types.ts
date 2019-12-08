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

export interface GetEntriesOptions extends Partial<Options> {
  page?: number;
}

export interface EntryRequest {
  id: number;
  listId: number;
}

export const enum Operation {
  Approve = 'approve',
  Reject = 'reject',
}

export type SelectedListID = number | 'add';
