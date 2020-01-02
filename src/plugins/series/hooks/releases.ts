import { Reducer, useReducer, useEffect, useCallback } from 'react';
import { createContainer, useContainer } from 'unstated-next';
import { action } from 'utils/hooks/actions';
import { stringify } from 'qs';
import { snakeCase, Method } from 'utils/fetch';
import { useFlexgetAPI } from 'core/api';
import { Release, GetReleaseOptions } from '../types';

export const enum Constants {
  GET_RELEASES = '@flexget/series/GET_RELEASES',
  UPDATE_RELEASE = '@flexget/series/UPDATE_RELEASE',
  UPDATE_RELEASES = '@flexget/series/UPDATE_RELEASES',
  REMOVE_RELEASE = '@flexget/series/REMOVE_RELEASE',
  REMOVE_RELEASES = '@flexget/series/REMOVE_RELEASES',
}

export const actions = {
  getReleases: (releases: Release[], totalCount: number) =>
    action(Constants.GET_RELEASES, { releases, totalCount }),
  updateRelease: (release: Release) => action(Constants.UPDATE_RELEASE, release),
  updateReleases: () => action(Constants.UPDATE_RELEASES),
  removeRelease: (id: number) => action(Constants.REMOVE_RELEASE, id),
  removeReleases: () => action(Constants.REMOVE_RELEASES),
};

type Actions = PropReturnType<typeof actions>;

interface State {
  releases: Release[];
  totalCount: number;
}

const releaseReducer: Reducer<State, Actions> = (state, act) => {
  switch (act.type) {
    case Constants.GET_RELEASES:
      return {
        ...act.payload,
      };
    case Constants.UPDATE_RELEASE:
      return {
        ...state,
        releases: state.releases.map(release => {
          if (release.id === act.payload.id) {
            return act.payload;
          }
          return release;
        }),
      };
    case Constants.UPDATE_RELEASES:
      return {
        ...state,
        releases: state.releases.map(release => ({
          ...release,
          downloaded: false,
        })),
      };
    case Constants.REMOVE_RELEASE:
      return {
        totalCount: state.totalCount - 1,
        releases: state.releases.filter(release => release.id !== act.payload),
      };
    case Constants.REMOVE_RELEASES:
      return {
        totalCount: 0,
        releases: [],
      };
    default:
      return state;
  }
};

export const ReleaseContainer = createContainer(() => {
  return useReducer(releaseReducer, { releases: [], totalCount: 0 });
});

export const useGetReleases = (showId: number, episodeId: number, options: GetReleaseOptions) => {
  const [, dispatch] = useContainer(ReleaseContainer);
  // NOTE: Material-UI Table Pagination uses 0 based indexing for pages, so we add
  // one here to account for that
  const query = stringify(snakeCase({ ...options, page: options.page + 1 }));

  const [state, request] = useFlexgetAPI<Release[]>(
    `/series/${showId}/episodes/${episodeId}/releases?${query}`,
  );

  useEffect(() => {
    const fn = async () => {
      const resp = await request();
      if (resp.ok) {
        dispatch(
          actions.getReleases(resp.data, parseInt(resp.headers.get('total-count') ?? '0', 10)),
        );
      }
    };
    fn();
  }, [dispatch, request]);

  return state;
};

export const useUpdateSingleRelease = (showId: number, episodeId: number, releaseId?: number) => {
  const [, dispatch] = useContainer(ReleaseContainer);
  const [state, request] = useFlexgetAPI<Release>(
    `/series/${showId}/episodes/${episodeId}/releases/${releaseId}`,
    Method.Put,
  );

  const updateRelease = useCallback(async () => {
    const resp = await request();
    if (resp.ok) {
      dispatch(actions.updateRelease(resp.data));
    }
    return resp;
  }, [dispatch, request]);

  return [state, updateRelease] as const;
};

export const useUpdateReleases = (showId: number, episodeId: number) => {
  const [, dispatch] = useContainer(ReleaseContainer);
  const [state, request] = useFlexgetAPI<Release>(
    `/series/${showId}/episodes/${episodeId}/releases`,
    Method.Put,
  );

  const updateReleases = useCallback(async () => {
    const resp = await request();
    if (resp.ok) {
      dispatch(actions.updateReleases());
    }
    return resp;
  }, [dispatch, request]);

  return [state, updateReleases] as const;
};

export const useUpdateRelease = (showId: number, episodeId: number, releaseId?: number) => {
  const singleState = useUpdateSingleRelease(showId, episodeId, releaseId);
  const bulkState = useUpdateReleases(showId, episodeId);

  return releaseId ? singleState : bulkState;
};

export const useRemoveSingleRelease = (showId: number, episodeId: number, releaseId?: number) => {
  const [, dispatch] = useContainer(ReleaseContainer);
  const [state, request] = useFlexgetAPI<Release>(
    `/series/${showId}/episodes/${episodeId}/releases/${releaseId}`,
    Method.Delete,
  );

  const removeRelease = useCallback(async () => {
    const resp = await request();
    if (resp.ok && releaseId) {
      dispatch(actions.removeRelease(releaseId));
    }
    return resp;
  }, [dispatch, releaseId, request]);

  return [state, removeRelease] as const;
};

export const useRemoveReleases = (showId: number, episodeId: number) => {
  const [, dispatch] = useContainer(ReleaseContainer);
  const [state, request] = useFlexgetAPI<Release>(
    `/series/${showId}/episodes/${episodeId}/releases`,
    Method.Delete,
  );

  const removeReleases = useCallback(async () => {
    const resp = await request();
    if (resp.ok) {
      dispatch(actions.removeReleases());
    }
    return resp;
  }, [dispatch, request]);

  return [state, removeReleases] as const;
};

export const useRemoveRelease = (showId: number, episodeId: number, releaseId?: number) => {
  const singleState = useRemoveSingleRelease(showId, episodeId, releaseId);
  const bulkState = useRemoveReleases(showId, episodeId);

  return releaseId ? singleState : bulkState;
};
