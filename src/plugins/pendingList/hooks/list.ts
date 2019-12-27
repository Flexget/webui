import { useEffect } from 'react';
import { useFlexgetAPI } from 'core/api';
import { Method } from 'utils/fetch';
import { useContainer } from 'unstated-next';
import { AddListRequest } from '../AddListRequest';
import { List } from '../../managedList/types';
import { ListContainer, actions } from '../../managedList/hooks/list';

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

  const [state, request] = useFlexgetAPI((id: number) => `/pending_list/${id}`, Method.Delete);

  const removeList = async () => {
    const resp = await request();
    if (resp.ok && listId) {
      dispatch(actions.removeList(listId));
    }
    return resp;
  };

  return [state, removeList] as const;
};
