import { useMemo, useCallback } from 'react';
import { useFlexgetAPI, APIRequest, RequestState } from 'core/api';
import { Method, camelize } from 'utils/fetch';
import { SortBy, Movie } from './types';
import { createPluginContainer } from '../base/hooks/api';

const movieToEntry = (movie: Movie): Movie => ({
  ...movie,
  entry: camelize(
    movie.moviesListIds?.reduce(
      (obj, { idName, idValue }) => ({
        ...obj,
        [idName]: idValue,
      }),
      {
        movieName: movie.title,
        movieYear: movie.year,
      },
    ),
  ),
});

function useMovieAPI<T extends Movie>(
  url: string,
  method?: Method,
): [RequestState, APIRequest<Movie>];
function useMovieAPI<T extends Movie[]>(
  url: string,
  method?: Method,
): [RequestState, APIRequest<Movie[]>];
function useMovieAPI(url: string, method?: Method) {
  const [state, makeRequest] = useFlexgetAPI<Movie | Movie[]>(url, method);

  const request = useCallback(
    async (...args) => {
      const resp = await makeRequest(...args);

      if (resp.ok) {
        resp.data = Array.isArray(resp.data)
          ? resp.data.map(movieToEntry)
          : movieToEntry(resp.data);
      }
      return resp;
    },
    [makeRequest],
  );

  return [state, request];
}

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
          useMovieAPI<Movie[]>(`/movie_list/${listId}/movies?${query}`),
        useAdd: (listId?: number) =>
          useMovieAPI<Movie>(`/movie_list/${listId}/movies`, Method.Post),
        useRemove: (listId: number, entryId: number) =>
          useFlexgetAPI(`/movie_list/${listId}/movies/${entryId}`, Method.Delete),
        useRemoveBulk: (listId: number) =>
          useFlexgetAPI(`/movie_list/${listId}/movies/batch`, Method.Delete),
      },
    },
  };
});
