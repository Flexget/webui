import { useReducer, Reducer, useEffect } from 'react';
import { createContainer } from 'unstated-next';
import { useFlexgetAPI } from 'core/api';
import { action } from 'utils/hooks/actions';
import { Method } from 'utils/fetch';
import FlexGetEntry from 'common/FlexGetEntry';
import { stringify } from 'qs';
import { Options, AddEntryRequest, Operation, InjectRequest } from '../types';

export const enum Constants {
  GET_ENTRIES = '@flexget/pendingList/GET_ENTRIES',
  REMOVE_ENTRY = '@flexget/pendingList/REMOVE_ENTRY',
  UPDATE_ENTRY = '@flexget/pendingList/UPDATE_ENTRY',
}

const actions = {
  getEntries: (entries: FlexGetEntry[], totalCount: number) =>
    action(Constants.GET_ENTRIES, { entries, totalCount }),
  removeEntry: (id: number) => action(Constants.REMOVE_ENTRY, id),
  updateEntry: (entry: FlexGetEntry) => action(Constants.UPDATE_ENTRY, entry),
};

type Actions = PropReturnType<typeof actions>;

interface State {
  entries: FlexGetEntry[];
  totalCount: number;
}

const entryReducer: Reducer<State, Actions> = (state, act) => {
  switch (act.type) {
    case Constants.GET_ENTRIES:
      return {
        ...act.payload,
      };
    case Constants.REMOVE_ENTRY:
      return {
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
    default:
      return state;
  }
};

const useEntries = () => {
  return useReducer(entryReducer, { entries: [], totalCount: 0 });
};

export const EntryContainter = createContainer(useEntries);

export const useGetEntries = (listId: number | undefined, options: Options, page: number) => {
  const [, dispatch] = EntryContainter.useContainer();
  const query = stringify({ ...options, page });

  const [state, getEntries] = useFlexgetAPI<FlexGetEntry[]>(
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
    if (listId) {
      fn();
    }
  }, [dispatch, getEntries, listId]);

  return state;
};

export const useAddEntry = (listId: number | undefined, setPage: SetState<number>) => {
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

export const useInjectEntry = (listId: number, entryId: number) => {
  const [, dispatch] = EntryContainter.useContainer();
  const [state, request] = useFlexgetAPI(
    `/pending_list/${listId}/entries/${entryId}`,
    Method.Delete,
  );

  const [inejectState, inject] = useFlexgetAPI('/tasks/execute');

  const removeEntry = async (req: InjectRequest) => {
    const injectResp = await inject(req);
    if (!injectResp.ok) {
      return [injectResp];
    }
    const resp = await request(req);
    if (resp.ok) {
      dispatch(actions.removeEntry(entryId));
    }

    return [injectResp, resp];
  };

  return [[inejectState, state], removeEntry] as const;
};

export const useEntryOperation = (listId: number, entryId: number) => {
  const [, dispatch] = EntryContainter.useContainer();
  const [state, request] = useFlexgetAPI<FlexGetEntry>(
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
