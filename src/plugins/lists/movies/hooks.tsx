import { useMemo } from 'react';
import { useFlexgetAPI } from 'core/api';
import { Method } from 'utils/fetch';
import { SortBy, Movie } from './types';
import { createPluginContainer } from '../base/hooks/api';

// const useMovieApi = (urlCreator: URLCreator, method?: Method) => {
// const [state, makeRequest] = useFlexgetAPI<Movie | Movie[]>(urlCreator, method);

// const request = useCallback(
// async (...args: Parameters<typeof urlCreator>) => {
// const r = makeRequest(args);
// },
// [makeRequest, urlCreator],
// );

// return [state, request];
// };

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
        useGet: () => useFlexgetAPI('/movie_list'),
        useAdd: () => useFlexgetAPI('/movie_list', Method.Post),
        useRemove: (listId?: number) => useFlexgetAPI(`/movie_list/${listId}`, Method.Delete),
      },
      entry: {
        useGet: (listId: number, query: string) =>
          useFlexgetAPI(`/movie_list/${listId}/movies?${query}`),
        useAdd: (listId?: number) => useFlexgetAPI(`/movie_list/${listId}/movies`, Method.Post),
        useRemove: (listId: number, entryId: number) =>
          useFlexgetAPI(`/movie_list/${listId}/movies/${entryId}`, Method.Delete),
        useRemoveBulk: (listId: number) =>
          useFlexgetAPI(`/movie_list/${listId}/movies/batch`, Method.Delete),
      },
    },
  };
});
