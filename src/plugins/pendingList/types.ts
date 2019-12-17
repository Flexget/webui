import { Direction } from 'utils/query';
import { RawEntry } from 'core/entry/types';
import { Inject } from 'core/tasks/types';

export const enum SortBy {
  Added = 'added',
  Title = 'title',
  URL = 'original_url',
  Approved = 'approved',
}

export interface PendingListEntry {
  id: number;
  listId: number;
  title: string;
  addedOn: string;
  originalUrl: string;
  approved: boolean;
  entry: RawEntry;
}

export interface Options {
  page: number;
  perPage: number;
  sortBy: SortBy;
  order: Direction;
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
  title: string;
  originalUrl: string;
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

export interface SingleInjectRequest {
  task: string;
  entry: Inject;
}

export type SelectedListID = number | 'add';
