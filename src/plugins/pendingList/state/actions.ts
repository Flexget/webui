import { asyncAction, action, ActionsUnion, RequestsOfType as ROT } from 'core/request/state/util';
import FlexGetEntry from 'common/FlexGetEntry';
import { StatusError } from 'utils/fetch';
import { Direction } from 'utils/query';

import { List } from './types';

export const enum Constants {
  GET_LISTS = '@flexget/pendingList/GET_LISTS',
  ADD_LIST = '@flexget/pendingList/ADD_LISTS',
  REMOVE_LIST = '@flexget/pendingList/REMOVE_LIST',
  GET_ENTRIES = '@flexget/pendingList/GET_ENTRIES',
  ADD_ENTRY = '@flexget/pendingList/ADD_ENTRY',
  REMOVE_ENTRY = '@flexget/pendingList/REMOVE_ENTRY',
  INJECT_ENTRY = '@flexget/pendingList/INJECT_ENTRY',
  APPROVE_ENTRY = '@flexget/pendingList/APPROVE_ENTRY',
  REJECT_ENTRY = '@flexget/pendingList/REJECT_ENTRY',
  SELECT_LIST = '@flexget/pendingList/SELECT_LIST',
}

export const enum SortBy {
  Added = 'added',
  Title = 'title',
  OriginalUrl = 'original_url',
  Approved = 'approved',
}

interface AddListRequest {
  name: string;
}

interface AddEntryRequest {
  listId: number;
  entry: FlexGetEntry;
}

interface GetEntriesOptions {
  page?: number;
  sortBy?: SortBy;
  order?: Direction;
}

interface EntryRequest {
  id: number;
  listId: number;
}

const actions = {
  getLists: {
    request: () => asyncAction.request(Constants.GET_LISTS),
    success: (lists: List[]) => asyncAction.success(Constants.GET_LISTS, { lists }),
    failure: (err: StatusError) => asyncAction.failure(Constants.GET_LISTS, err),
  },
  addList: {
    request: (data: AddListRequest) => asyncAction.request(Constants.ADD_LIST, { data }),
    success: (list: List) => asyncAction.success(Constants.ADD_LIST, { list }),
    failure: (err: StatusError) => asyncAction.failure(Constants.ADD_LIST, err),
  },
  removeList: {
    request: (id: number) => asyncAction.request(Constants.REMOVE_LIST, { id }),
    success: (id: number) => asyncAction.success(Constants.REMOVE_LIST, { id }),
    failure: (err: StatusError) => asyncAction.failure(Constants.REMOVE_LIST, err),
  },
  getEntries: {
    request: (listId: number, params: GetEntriesOptions) =>
      asyncAction.request(Constants.GET_ENTRIES, { listId, params }),
    success: (entries: FlexGetEntry[], page: number, headers: Headers) =>
      asyncAction.success(Constants.GET_ENTRIES, { entries, page, headers }),
    failure: (err: StatusError) => asyncAction.failure(Constants.GET_ENTRIES, err),
  },
  addEntry: {
    request: (data: AddEntryRequest) => asyncAction.request(Constants.ADD_ENTRY, data),
    success: () => asyncAction.success(Constants.ADD_ENTRY),
    failure: (err: StatusError) => asyncAction.failure(Constants.ADD_ENTRY, err),
  },
  removeEntry: {
    request: (entry: FlexGetEntry) => asyncAction.request(Constants.REMOVE_ENTRY, { entry }),
    success: (entry: FlexGetEntry) => asyncAction.success(Constants.REMOVE_ENTRY, { entry }),
    failure: (err: StatusError) => asyncAction.failure(Constants.REMOVE_ENTRY, err),
  },
  injectEntry: {
    request: (entry: FlexGetEntry, taskName: string) =>
      asyncAction.request(Constants.INJECT_ENTRY, { entry, task: { name: taskName } }),
    success: (entry: FlexGetEntry) => asyncAction.success(Constants.INJECT_ENTRY, { entry }),
    failure: (err: StatusError) => asyncAction.failure(Constants.INJECT_ENTRY, err),
  },
  approveEntry: {
    request: (entry: EntryRequest) => asyncAction.request(Constants.APPROVE_ENTRY, { entry }),
    success: (entry: FlexGetEntry) => asyncAction.success(Constants.APPROVE_ENTRY, { entry }),
    failure: (err: StatusError) => asyncAction.failure(Constants.APPROVE_ENTRY, err),
  },
  rejectEntry: {
    request: (entry: EntryRequest) => asyncAction.request(Constants.REJECT_ENTRY, { entry }),
    success: (entry: FlexGetEntry) => asyncAction.success(Constants.REJECT_ENTRY, { entry }),
    failure: (err: StatusError) => asyncAction.failure(Constants.REJECT_ENTRY, err),
  },
  selectList: (selected: number) => action(Constants.SELECT_LIST, { selected }),
};

export type ActionTypes = ActionsUnion<typeof actions>;
export type RequestsOfType<T extends Constants> = ROT<ActionTypes, T>;

export default actions;
