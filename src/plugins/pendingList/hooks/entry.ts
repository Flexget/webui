import { useReducer, Reducer, useEffect } from 'react';
import { createContainer } from 'unstated-next';
import { useFlexgetAPI } from 'core/api';
import { action } from 'utils/hooks/actions';
import { Method } from 'utils/fetch';
import { stringify } from 'qs';
import { ListContiner } from 'plugins/pendingList/hooks/list';
import { Options, AddEntryRequest, Operation, PendingListEntry } from '../types';

export const enum Constants {
  GET_ENTRIES = '@flexget/pendingList/GET_ENTRIES',
  REMOVE_ENTRY = '@flexget/pendingList/REMOVE_ENTRY',
  UPDATE_ENTRY = '@flexget/pendingList/UPDATE_ENTRY',
  SELECT_ENTRY = '@flexget/pendingList/SELECT_ENTRY',
  UNSELECT_ENTRY = '@flexget/pendingList/UNSELECT_ENTRY',
  CLEAR_SELECTED = '@flexget/pendingList/CLEAR_SELECTED',
}

const actions = {
  getEntries: (entries: PendingListEntry[], totalCount: number) =>
    action(Constants.GET_ENTRIES, { entries, totalCount }),
  removeEntry: (id: number) => action(Constants.REMOVE_ENTRY, id),
  updateEntry: (entry: PendingListEntry) => action(Constants.UPDATE_ENTRY, entry),
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

export const useGetEntries = (options: Options, page: number) => {
  const [, dispatch] = EntryContainer.useContainer();
  const query = stringify({ ...options, page });

  const [{ listId }] = ListContiner.useContainer();
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

export const useAddEntry = (setPage: SetState<number>) => {
  const [{ listId }] = ListContiner.useContainer();
  const [state, request] = useFlexgetAPI(`/pending_list/${listId}/entries`, Method.Post);

  const addEntry = async (req: AddEntryRequest) => {
    const resp = await request(req);
    if (resp.ok) {
      setPage(1);
    }
    return resp;
  };

  return [state, addEntry] as const;
};

export const useRemoveEntry = (entryId: number) => {
  const [{ listId }] = ListContiner.useContainer();
  const [, dispatch] = EntryContainer.useContainer();
  const [state, request] = useFlexgetAPI(
    `/pending_list/${listId}/entries/${entryId}`,
    Method.Delete,
  );

  const removeEntry = async () => {
    const resp = await request();
    if (resp.ok) {
      dispatch(actions.removeEntry(entryId));
    }

    return resp;
  };

  return [state, removeEntry] as const;
};

export const useInjectEntry = () => useFlexgetAPI('/tasks/execute');

export const useEntryOperation = (entryId: number) => {
  const [{ listId }] = ListContiner.useContainer();
  const [, dispatch] = EntryContainer.useContainer();
  const [state, request] = useFlexgetAPI<PendingListEntry>(
    `/pending_list/${listId}/entries/${entryId}`,
    Method.Put,
  );

  const doOperation = async (operation: Operation) => {
    const resp = await request({ operation });
    if (resp.ok) {
      dispatch(actions.updateEntry(resp.data));
    }
    return resp;
  };

  return [state, doOperation] as const;
};
