import { useReducer, Reducer, useEffect } from 'react';
import { useFlexgetAPI } from 'core/api';
import { action } from 'utils/hooks/actions';
import { Method } from 'utils/fetch';
import { createContainer, useContainer } from 'unstated-next';
import { List, AddListRequest, SelectedListID } from '../types';

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
  listId: SelectedListID;
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

const useLists = () => useReducer(listReducer, { lists: [], listId: 'add' });
export const ListContainer = createContainer(useLists);

export const useGetLists = () => {
  const [, dispatch] = useContainer(ListContainer);

  const [state, getLists] = useFlexgetAPI<List[]>('/pending_list');

  // Fetch Lists
  useEffect(() => {
    const fn = async () => {
      const resp = await getLists();

      if (resp.ok) {
        dispatch(actions.getLists(resp.data));
      }
    };
    fn();
  }, [dispatch, getLists]);

  return state;
};

export const useAddList = () => {
  const [, dispatch] = useContainer(ListContainer);

  const [state, request] = useFlexgetAPI<List>('/pending_list', Method.Post);

  const addList = async (req: AddListRequest) => {
    const resp = await request(req);
    if (resp.ok) {
      dispatch(actions.addList(resp.data));
    }
    return resp;
  };

  return [state, addList] as const;
};

export const useRemoveList = () => {
  const [{ listId }, dispatch] = useContainer(ListContainer);

  const [state, request] = useFlexgetAPI(`/pending_list/${listId}`, Method.Delete);

  const removeList = async () => {
    const resp = await request();
    if (resp.ok && listId !== 'add') {
      dispatch(actions.removeList(listId));
    }
    return resp;
  };

  return [state, removeList] as const;
};
