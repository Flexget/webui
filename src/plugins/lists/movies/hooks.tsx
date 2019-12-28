import { useCallback, useMemo } from 'react';
import { useFlexgetAPI } from 'core/api';
import { Method } from 'utils/fetch';
import { SortBy } from './types';
import { createPluginContainer } from '../base/hooks/api';

export const MovieListContainer = createPluginContainer(() => {
  return {
    sortByOptions: useMemo(
      () => [
        {
          value: SortBy.Added,
          label: 'Date Added',
        },
        {
          value: SortBy.Title,
          label: 'Title',
        },
        {
          value: SortBy.URL,
          label: 'URL',
        },
      ],
      [],
    ),
    api: {
      list: {
        get: useFlexgetAPI('/movie_list'),
        add: useFlexgetAPI('/movie_list', Method.Post),
        remove: useFlexgetAPI(
          useCallback((listId?: number) => `/movie_list/${listId}`, []),
          Method.Delete,
        ),
      },
      entry: {
        get: useFlexgetAPI(
          useCallback(
            (listId: number, query: string) => `/movie_list/${listId}/movies?${query}`,
            [],
          ),
        ),
        add: useFlexgetAPI(
          useCallback((listId: number) => `/movie_list/${listId}/movies`, []),
          Method.Post,
        ),
        remove: useFlexgetAPI(
          useCallback(
            (listId: number, entryId: number) => `/movie_list/${listId}/movies/${entryId}`,
            [],
          ),
          Method.Delete,
        ),
        removeBulk: useFlexgetAPI(
          useCallback((listId: number) => `/movie_list/${listId}/movies/batch`, []),
          Method.Delete,
        ),
      },
    },
  };
});


