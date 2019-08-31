import { action, ActionsUnion } from 'utils/actions';
import FlexGetEntry from 'common/FlexGetEntry';
import { StatusError } from 'utils/fetch';
import { Direction } from 'utils/query';
import statusActions, { Constants as sConstants, TypeMeta } from 'core/status/state/actions';
import { RequestsOfType as ROT } from 'core/status/state/types';

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
    request: () => statusActions.load(Constants.GET_LISTS),
    success: (lists: List[]) => action(Constants.GET_LISTS, { lists }),
    failure: (err: StatusError) => statusActions.error(Constants.GET_LISTS, err),
  },
  addList: {
    request: (data: AddListRequest) => statusActions.load(Constants.ADD_LIST, { data }),
    success: (list: List) => action(Constants.ADD_LIST, { list }),
    failure: (err: StatusError) => statusActions.error(Constants.ADD_LIST, err),
  },
  removeList: {
    request: (id: number) => statusActions.load(Constants.REMOVE_LIST, { id }),
    success: (id: number) => action(Constants.REMOVE_LIST, { id }),
    failure: (err: StatusError) => statusActions.error(Constants.REMOVE_LIST, err),
  },
  getEntries: {
    request: (listId: number, params: GetEntriesOptions) =>
      statusActions.load(Constants.GET_ENTRIES, { listId, params }),
    success: (entries: FlexGetEntry[], page: number, headers: Headers) =>
      action(Constants.GET_ENTRIES, { entries, page, headers }),
    failure: (err: StatusError) => statusActions.error(Constants.GET_ENTRIES, err),
  },
  addEntry: {
    request: (data: AddEntryRequest) => statusActions.load(Constants.ADD_ENTRY, data),
    success: () => action(Constants.ADD_ENTRY),
    failure: (err: StatusError) => statusActions.error(Constants.ADD_ENTRY, err),
  },
  removeEntry: {
    request: (entry: FlexGetEntry) => statusActions.load(Constants.REMOVE_ENTRY, { entry }),
    success: (entry: FlexGetEntry) => action(Constants.REMOVE_ENTRY, { entry }),
    failure: (err: StatusError) => statusActions.error(Constants.REMOVE_ENTRY, err),
  },
  injectEntry: {
    request: (entry: FlexGetEntry, taskName: string) =>
      statusActions.load(Constants.INJECT_ENTRY, { entry, task: { name: taskName } }),
    success: (entry: FlexGetEntry) => action(Constants.INJECT_ENTRY, { entry }),
    failure: (err: StatusError) => statusActions.error(Constants.INJECT_ENTRY, err),
  },
  approveEntry: {
    request: (entry: EntryRequest) => statusActions.load(Constants.APPROVE_ENTRY, { entry }),
    success: (entry: FlexGetEntry) => action(Constants.APPROVE_ENTRY, { entry }),
    failure: (err: StatusError) => statusActions.error(Constants.APPROVE_ENTRY, err),
  },
  rejectEntry: {
    request: (entry: EntryRequest) => statusActions.load(Constants.REJECT_ENTRY, { entry }),
    success: (entry: FlexGetEntry) => action(Constants.REJECT_ENTRY, { entry }),
    failure: (err: StatusError) => statusActions.error(Constants.REJECT_ENTRY, err),
  },
  selectList: (selected: number) => action(Constants.SELECT_LIST, { selected }),
};

export type ActionTypes = ActionsUnion<typeof actions>;
export type RequestsOfType<T extends Constants> = ROT<ActionTypes, T>;

export default actions;
