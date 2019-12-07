import { SortOrder } from 'utils/sort';

export const enum SortBy {
  Added = 'added',
  Title = 'title',
  URL = 'original_url',
  Approved = 'appoved',
}

export interface Options {
  perPage: number;
  sortBy: SortBy;
  sortOrder: SortOrder;
}

export interface List {
  id: number;
  name: string;
  addedOn: string;
}

export interface ListReq {
  name: string;
}

export type SelectedListID = number | 'add';
