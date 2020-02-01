import { Reducer, useReducer, useEffect, useCallback, useState } from 'react';
import { createContainer, useContainer } from 'unstated-next';
import { action } from 'utils/hooks/actions';
import { stringify } from 'qs';
import { snakeCase, Method } from 'utils/fetch';
import { useFlexgetAPI } from 'core/api';
import { Show, GetShowOptions, ShowRequest } from '../types';

export const enum Constants {
  GET_SHOWS = '@flexget/series/GET_SHOWS',
  ADD_SHOW = '@flexget/series/ADD_SHOW',
  REMOVE_SHOW = '@flexget/series/REMOVE_SHOW',
}

export const actions = {
  getShows: (shows: Show[], totalCount: number) =>
    action(Constants.GET_SHOWS, { shows, totalCount }),
  addShow: (show: Show) => action(Constants.ADD_SHOW, show),
  removeShow: (id: number) => action(Constants.REMOVE_SHOW, id),
};

type Actions = PropReturnType<typeof actions>;

interface State {
  shows: Show[];
  totalCount: number;
}

const showReducer: Reducer<State, Actions> = (state, act) => {
  switch (act.type) {
    case Constants.GET_SHOWS:
      return {
        ...act.payload,
      };
    case Constants.ADD_SHOW:
      return {
        ...state,
        shows: [act.payload, ...state.shows],
        totalCount: state.totalCount + 1,
      };
    case Constants.REMOVE_SHOW:
      return {
        ...state,
        totalCount: state.totalCount - 1,
        shows: state.shows.filter(show => show.id !== act.payload),
      };
    default:
      return state;
  }
};

export const ShowContainer = createContainer(() => {
  return useReducer(showReducer, { shows: [], totalCount: 0 });
});

export const useGetShows = (options: GetShowOptions) => {
  const [, dispatch] = useContainer(ShowContainer);
  // NOTE: Material-UI Table Pagination uses 0 based indexing for pages, so we add
  // one here to account for that
  const query = stringify(snakeCase({ ...options, page: options.page + 1 }));

  const [state, request] = useFlexgetAPI<Show[]>(`/series?${query}`);

  useEffect(() => {
    const fn = async () => {
      const resp = await request();
      if (resp.ok) {
        dispatch(actions.getShows(resp.data, parseInt(resp.headers.get('total-count') ?? '0', 10)));
      }
    };
    fn();
  }, [dispatch, request]);

  return state;
};

export const useAddShow = () => {
  const [, dispatch] = useContainer(ShowContainer);
  const [state, request] = useFlexgetAPI<Show>('/series', Method.Post);

  const addShow = useCallback(
    async (req: ShowRequest) => {
      const resp = await request(req);
      if (resp.ok) {
        dispatch(actions.addShow(resp.data));
      }
      return resp;
    },
    [dispatch, request],
  );

  return [state, addShow] as const;
};

export const useUpdateShow = (showId: number) => {
  const [, dispatch] = useContainer(ShowContainer);
  const [state, request] = useFlexgetAPI<Show>(`/series/${showId}`, Method.Put);

  const updateShow = useCallback(
    async (req: ShowRequest) => {
      const resp = await request(req);
      if (resp.ok) {
        dispatch(actions.updateShow(resp.data));
      }
      return resp;
    },
    [dispatch, request],
  );

  return [state, updateShow] as const;
};

export const useGetShowDetail = (showId: number) => {
  const [state, request] = useFlexgetAPI<Show>(`/series/${showId}`);
  const [show, setShow] = useState<Show>();

  useEffect(() => {
    const fn = async () => {
      const resp = await request();
      if (resp.ok) {
        setShow(resp.data);
      }
    };
    fn();
  }, [request]);

  return { ...state, show };
};
