import { useReducer, Reducer, useEffect, useCallback } from 'react';
import { action } from 'utils/hooks/actions';
import { createContainer, useContainer } from 'unstated-next';
import { usePluginContainer } from './api';
import { List, AddListRequest } from '../types';

export const enum Constants {
  GET_LISTS = '@flexget/pedingList/GET_LISTS',
  ADD_LIST = '@flexget/pedingList/ADD_LIST',
  REMOVE_LIST = '@flexget/pedingList/REMOVE_LIST',
  SELECT_LIST = '@flexget/pedingList/SELECT_LIST',
}

export const actions = {
  getLists: (lists: List[]) => action(Constants.GET_LISTS, lists),
  addList: (list: List) => action(Constants.ADD_LIST, list),
  removeList: (id: number) => action(Constants.REMOVE_LIST, id),
  selectList: (id: number) => action(Constants.SELECT_LIST, id),
};

type Actions = PropReturnType<typeof actions>;

interface State {
  lists: List[];
  listId?: number;
}

const listReducer: Reducer<State, Actions> = (state, act) => {
  switch (act.type) {
    case Constants.GET_LISTS:
      return {
        lists: act.payload,
        listId: act.payload.length && act.payload[0].id,
      };
    case Constants.ADD_LIST:
      return {
        lists: [...state.lists, act.payload],
        listId: act.payload.id,
      };
    case Constants.REMOVE_LIST:
      return {
        lists: state.lists.filter(item => item.id !== act.payload),
        listId:
          state.listId === act.payload ? state.lists.length && state.lists[0].id : state.listId,
      };
    case Constants.SELECT_LIST:
      return {
        ...state,
        listId: act.payload,
      };
    default:
      return state;
  }
};

const useLists = () => useReducer(listReducer, { lists: [] });

export const ListContainer = createContainer(useLists);

export const useGetLists = () => {
  const [, dispatch] = useContainer(ListContainer);

  const {
    api: {
      list: { useGet },
    },
  } = usePluginContainer();

  const [state, request] = useGet();
  // Fetch Lists
  useEffect(() => {
    const fn = async () => {
      const resp = await request();

      if (resp.ok) {
        dispatch(actions.getLists(resp.data));
      }
    };
    fn();
  }, [dispatch, request]);

  return state;
};

export const useAddList = () => {
  const [, dispatch] = useContainer(ListContainer);

  const {
    api: {
      list: { useAdd },
    },
  } = usePluginContainer();

  const [state, request] = useAdd();

  const addList = useCallback(
    async (req: AddListRequest) => {
      const resp = await request(req);
      if (resp.ok) {
        dispatch(actions.addList(resp.data));
      }
      return resp;
    },
    [dispatch, request],
  );

  return [state, addList] as const;
};

export const useRemoveList = () => {
  const [{ listId }, dispatch] = useContainer(ListContainer);

  const {
    api: {
      list: { useRemove },
    },
  } = usePluginContainer();

  const [state, request] = useRemove(listId);

  const removeList = useCallback(async () => {
    const resp = await request();
    if (resp.ok && listId) {
      dispatch(actions.removeList(listId));
    }
    return resp;
  }, [dispatch, listId, request]);

  return [state, removeList] as const;
};
