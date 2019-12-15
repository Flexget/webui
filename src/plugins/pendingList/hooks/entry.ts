import { useReducer, Reducer, useEffect, useCallback } from 'react';
import { createContainer, useContainer } from 'unstated-next';
import { useFlexgetAPI } from 'core/api';
import { action } from 'utils/hooks/actions';
import { Method, snakeCase } from 'utils/fetch';
import { stringify } from 'qs';
import { useExecuteTask } from 'core/tasks/hooks';
import { ListContainer } from './list';
import { Options, AddEntryRequest, Operation, PendingListEntry, InjectRequest } from '../types';

export const enum Constants {
  GET_ENTRIES = '@flexget/pendingList/GET_ENTRIES',
  ADD_ENTRY = '@flexget/pendingList/ADD_ENTRY',
  REMOVE_ENTRY = '@flexget/pendingList/REMOVE_ENTRY',
  UPDATE_ENTRY = '@flexget/pendingList/UPDATE_ENTRY',
  SELECT_ENTRY = '@flexget/pendingList/SELECT_ENTRY',
  UNSELECT_ENTRY = '@flexget/pendingList/UNSELECT_ENTRY',
  CLEAR_SELECTED = '@flexget/pendingList/CLEAR_SELECTED',
}

const actions = {
  getEntries: (entries: PendingListEntry[], totalCount: number) =>
    action(Constants.GET_ENTRIES, { entries, totalCount }),
  addEntry: (entry: PendingListEntry) => action(Constants.ADD_ENTRY, entry),
  updateEntry: (entry: PendingListEntry) => action(Constants.UPDATE_ENTRY, entry),
  removeEntry: (id: number) => action(Constants.REMOVE_ENTRY, id),
  selectEntry: (id: number) => action(Constants.SELECT_ENTRY, id),
  unselectEntry: (id: number) => action(Constants.UNSELECT_ENTRY, id),
  clearSelected: () => action(Constants.CLEAR_SELECTED),
};

type Actions = PropReturnType<typeof actions>;

interface State {
  entries: PendingListEntry[];
  totalCount: number;
  selectedIds: Record<number, boolean>;
}

const entryReducer: Reducer<State, Actions> = (state, act) => {
  switch (act.type) {
    case Constants.GET_ENTRIES:
      return {
        ...act.payload,
        selectedIds: {},
      };
    case Constants.ADD_ENTRY:
      return {
        ...state,
        entries: [act.payload, ...state.entries],
        totalCount: state.totalCount + 1,
      };
    case Constants.REMOVE_ENTRY:
      return {
        ...state,
        totalCount: state.totalCount - 1,
        entries: state.entries.filter(entry => entry.id !== act.payload),
      };
    case Constants.UPDATE_ENTRY:
      return {
        ...state,
        entries: state.entries.map(item => {
          if (item.id === act.payload.id) {
            return act.payload;
          }
          return item;
        }),
      };
    case Constants.SELECT_ENTRY:
      return {
        ...state,
        selectedIds: {
          ...state.selectedIds,
          [act.payload]: true,
        },
      };
    case Constants.UNSELECT_ENTRY:
      return {
        ...state,
        selectedIds: {
          ...state.selectedIds,
          [act.payload]: false,
        },
      };
    case Constants.CLEAR_SELECTED:
      return {
        ...state,
        selectedIds: {},
      };
    default:
      return state;
  }
};

const useEntries = () => useReducer(entryReducer, { entries: [], totalCount: 0, selectedIds: {} });

export const EntryContainer = createContainer(useEntries);

export const useGetEntries = (options: Options) => {
  const [, dispatch] = useContainer(EntryContainer);
  // NOTE: Material-UI Table Pagination uses 0 based indexing for pages, so we add
  // one here to account for that
  const query = stringify(snakeCase({ ...options, page: options.page + 1 }));

  const [{ listId }] = useContainer(ListContainer);
  const [state, getEntries] = useFlexgetAPI<PendingListEntry[]>(
    `/pending_list/${listId}/entries?${query}`,
  );

  useEffect(() => {
    const fn = async () => {
      const resp = await getEntries();
      if (resp.ok) {
        dispatch(
          actions.getEntries(resp.data, parseInt(resp.headers.get('total-count') ?? '0', 10)),
        );
      }
    };
    if (listId !== 'add') {
      fn();
    }
  }, [dispatch, getEntries, listId]);

  return state;
};

export const useAddEntry = () => {
  const [{ listId }] = useContainer(ListContainer);
  const [, dispatch] = useContainer(EntryContainer);
  const [state, request] = useFlexgetAPI<PendingListEntry>(
    `/pending_list/${listId}/entries`,
    Method.Post,
  );

  const addEntry = useCallback(
    async (req: AddEntryRequest) => {
      const resp = await request(req);
      if (resp.ok) {
        dispatch(actions.addEntry(resp.data));
      }
      return resp;
    },
    [dispatch, request],
  );

  return [state, addEntry] as const;
};

export const useRemoveEntry = (entryId?: number) => {
  const [{ listId }] = useContainer(ListContainer);
  const [, dispatch] = useContainer(EntryContainer);
  const [state, request] = useFlexgetAPI(
    `/pending_list/${listId}/entries/${entryId}`,
    Method.Delete,
  );

  const removeEntry = useCallback(async () => {
    const resp = await request();
    if (resp.ok && entryId) {
      dispatch(actions.removeEntry(entryId));
    }

    return resp;
  }, [dispatch, entryId, request]);

  return [state, removeEntry] as const;
};

export const useInjectEntry = (entryId?: number) => {
  const [remove, removeEntry] = useRemoveEntry(entryId);
  const [execute, executeTask] = useExecuteTask();

  const injectEntry = useCallback(
    async ({ task, entry }: InjectRequest) => {
      const executeResponse = await executeTask({ tasks: [task], inject: [entry] });
      if (!executeResponse.ok) {
        return executeResponse;
      }
      return removeEntry();
    },
    [executeTask, removeEntry],
  );

  return [
    {
      error: remove.error ?? execute.error,
      loading: remove.loading || execute.loading,
    },
    injectEntry,
  ] as const;
};

export const useEntryOperation = (entryId: number) => {
  const [{ listId }] = useContainer(ListContainer);
  const [, dispatch] = useContainer(EntryContainer);
  const [state, request] = useFlexgetAPI<PendingListEntry>(
    `/pending_list/${listId}/entries/${entryId}`,
    Method.Put,
  );

  const doOperation = useCallback(
    async (operation: Operation) => {
      const resp = await request({ operation });
      if (resp.ok) {
        dispatch(actions.updateEntry(resp.data));
      }
      return resp;
    },
    [dispatch, request],
  );

  return [state, doOperation] as const;
};
