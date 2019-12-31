import { Reducer, useReducer, useEffect, useCallback, useState } from 'react';
import { createContainer, useContainer } from 'unstated-next';
import { action } from 'utils/hooks/actions';
import { stringify } from 'qs';
import { snakeCase, Method } from 'utils/fetch';
import { useFlexgetAPI } from 'core/api';
import { Episode, GetEpisodeOptions } from '../types/episodes';

export const enum Constants {
  GET_EPISODES = '@flexget/series/GET_EPISODES',
  REMOVE_EPISODE = '@flexget/series/REMOVE_EPISODE',
  REMOVE_EPISODES = '@flexget/series/REMOVE_EPISODES',
}

export const actions = {
  getEpisodes: (episodes: Episode[], totalCount: number) =>
    action(Constants.GET_EPISODES, { episodes, totalCount }),
  removeEpisode: (id: number) => action(Constants.REMOVE_EPISODE, id),
  removeEpisodes: () => action(Constants.REMOVE_EPISODES),
};

type Actions = PropReturnType<typeof actions>;

interface State {
  episodes: Episode[];
  totalCount: number;
}

const episodeReducer: Reducer<State, Actions> = (state, act) => {
  switch (act.type) {
    case Constants.GET_EPISODES:
      return {
        ...act.payload,
      };
    case Constants.REMOVE_EPISODE:
      return {
        totalCount: state.totalCount - 1,
        episodes: state.episodes.filter(episode => episode.id !== act.payload),
      };
    case Constants.REMOVE_EPISODES:
      return {
        totalCount: 0,
        episodes: [],
      };
    default:
      return state;
  }
};

export const EpisodeContainer = createContainer(() => {
  return useReducer(episodeReducer, { episodes: [], totalCount: 0 });
});

export const useGetEpisodes = (showId: number, options: GetEpisodeOptions) => {
  const [, dispatch] = useContainer(EpisodeContainer);
  // NOTE: Material-UI Table Pagination uses 0 based indexing for pages, so we add
  // one here to account for that
  const query = stringify(snakeCase({ ...options, page: options.page + 1 }));

  const [state, request] = useFlexgetAPI<Episode[]>(`/series/${showId}/episodes?${query}`);

  useEffect(() => {
    const fn = async () => {
      const resp = await request();
      if (resp.ok) {
        dispatch(
          actions.getEpisodes(resp.data, parseInt(resp.headers.get('total-count') ?? '0', 10)),
        );
      }
    };
    fn();
  }, [dispatch, request]);

  return state;
};

export const useRemoveEpisode = (showId: number, episodeId: number) => {
  const [, dispatch] = useContainer(EpisodeContainer);
  const [state, request] = useFlexgetAPI<Episode>(
    `/series/${showId}/episodes/${episodeId}`,
    Method.Delete,
  );

  const addEntry = useCallback(async () => {
    const resp = await request();
    if (resp.ok) {
      dispatch(actions.removeEpisode(episodeId));
    }
    return resp;
  }, [dispatch, episodeId, request]);

  return [state, addEntry] as const;
};

export const useRemoveEpisodes = (showId: number) => {
  const [, dispatch] = useContainer(EpisodeContainer);
  const [state, request] = useFlexgetAPI<Episode>(`/series/${showId}/episodes`, Method.Delete);

  const addEntry = useCallback(async () => {
    const resp = await request();
    if (resp.ok) {
      dispatch(actions.removeEpisodes());
    }
    return resp;
  }, [dispatch, request]);

  return [state, addEntry] as const;
};

export const useGetEpisodeDetail = (showId: number, episodeId: number) => {
  const [state, request] = useFlexgetAPI<Episode>(`/series/${showId}/episodes/${episodeId}`);
  const [episode, setEpisode] = useState<Episode>();

  useEffect(() => {
    const fn = async () => {
      const resp = await request();
      if (resp.ok) {
        setEpisode(resp.data);
      }
    };
    fn();
  }, [request]);

  return { ...state, show: episode };
};
