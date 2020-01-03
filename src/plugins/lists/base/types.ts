import { Direction } from 'utils/query';
import { RawEntry } from 'core/entry/types';
import { Inject } from 'plugins/tasks/types';

export interface Options<T extends string = string> {
  page: number;
  perPage: number;
  sortBy: T;
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

export interface Entry {
  id: number;
  listId: number;
  title: string;
  addedOn: string;
  originalUrl: string;
  entry: RawEntry;
}

export interface AddEntryRequest {
  title: string;
  originalUrl: string;
}

export interface GetEntriesOptions<T extends string = string> extends Partial<Options<T>> {
  page?: number;
}

export interface EntryRequest {
  id: number;
  listId: number;
}

export interface SingleInjectRequest {
  task: string;
  entry: Inject;
}
