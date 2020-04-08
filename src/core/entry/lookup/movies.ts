import { stringify } from 'qs';
import { snakeCase } from 'utils/fetch';
import { useFlexgetAPI } from 'core/api';
import { useState, useEffect, useMemo } from 'react';
import { TMDBFields, RawMovieFields, IMDBFields, TraktFields, MovieEntry } from '../fields/movies';
import { toMovieEntry } from '../utils';

export interface TMDBOptions {
  title?: string;
  imdbId?: string | number;
  tmdbId?: string | number;
  language?: string;
  year?: number;
  includePosters?: boolean;
  includeBackdrops?: boolean;
}

interface TMDBImageURL extends Record<string, string> {
  original: string;
}
interface TMDBImage {
  height: number;
  width: number;
  urls: TMDBImageURL;
}

interface TMDBMovie {
  id: number;
  homepage: string;
  imdbId: string;
  name: string;
  year: number;
  runtime: number;
  overview: string;
  genres: string[];
  rating: number;
  votes: number;
  posters?: TMDBImage[];
  backdrops?: TMDBImage[];
}

const tmdbToFields = (movie: TMDBMovie): RawMovieFields => ({
  movieName: movie.name,
  movieYear: movie.year,
  [TMDBFields.Genres]: movie.genres,
  [TMDBFields.Posters]: movie.posters?.map(({ urls }) => urls.original),
  [TMDBFields.Backdrops]: movie.backdrops?.map(({ urls }) => urls.original),
  [TMDBFields.Rating]: movie.rating,
  [TMDBFields.Votes]: movie.votes,
  [TMDBFields.Url]: movie.homepage,
  [TMDBFields.Runtime]: movie.runtime,
  [TMDBFields.ID]: movie.id,
  [TMDBFields.Description]: movie.overview,
  [IMDBFields.ID]: movie.imdbId,
});

export const useTMDBLookup = (options: TMDBOptions) => {
  const query = stringify(snakeCase(options));
  const [entry, setEntry] = useState<RawMovieFields>();

  const [state, request] = useFlexgetAPI<TMDBMovie>(`/tmdb/movies?${query}`);

  useEffect(() => {
    const fn = async () => {
      const resp = await request();
      if (resp.ok) {
        setEntry(tmdbToFields(resp.data));
      }
      return resp;
    };
    fn();
  }, [request]);

  return { ...state, entry };
};

// interface IMDBMovie {
// imdbId: string;
// name: string;
// year: number;
// url: string;
// }

// const imdbToFields = (movie: IMDBMovie): RawMovieFields => ({
// movieName: movie.name,
// movieYear: movie.year,
// [IMDBFields.Url]: movie.url,
// [IMDBFields.ID]: movie.imdbId,
// });

// export const useIMDBLookup = (titleOrId?: string | number) => {
// const [entry, setEntry] = useState<RawMovieFields>();

// const [state, request] = useFlexgetAPI<IMDBMovie[]>(`/imdb/search/${titleOrId}`);

// useEffect(() => {
// const fn = async () => {
// const resp = await request();
// if (resp.ok) {
// setEntry(imdbToFields(resp.data[0]));
// }
// return resp;
// };
// fn();
// }, [request]);

// return { ...state, entry };
// };

interface TraktOptions {
  title?: string;
  traktId?: string | number;
  traktSlug?: string;
  tmdbId?: string;
  imdbId?: string;
  year?: number;
  includeActors?: boolean;
  includeTranslations?: boolean;
}

interface TraktMovie {
  id: number;
  homepage: string;
  imdbId: string;
  tmdbId: string;
  name: string;
  year: number;
  runtime: number;
  overview: string;
  genres: string[];
  rating: number;
  votes: number;
}

const traktToFields = (movie: TraktMovie): RawMovieFields => ({
  movieName: movie.name,
  movieYear: movie.year,
  [TraktFields.Genres]: movie.genres,
  [TraktFields.Rating]: movie.rating,
  [TraktFields.Votes]: movie.votes,
  [TraktFields.Url]: movie.homepage,
  [TraktFields.Runtime]: movie.runtime,
  [TraktFields.ID]: movie.id,
  [TraktFields.Description]: movie.overview,
  [IMDBFields.ID]: movie.imdbId,
  [TraktFields.ID]: movie.tmdbId,
});

export const useTraktLookup = (options: TraktOptions) => {
  const query = stringify(snakeCase(options));
  const [entry, setEntry] = useState<RawMovieFields>();

  const [state, request] = useFlexgetAPI<TraktMovie>(`/tmdb/movies?${query}`);

  useEffect(() => {
    const fn = async () => {
      const resp = await request();
      if (resp.ok) {
        setEntry(traktToFields(resp.data));
      }
      return resp;
    };
    fn();
  }, [request]);

  return { ...state, entry };
};

export const useMovieLookup = (movie: MovieEntry) => {
  const { loading: tmdbLoading, entry: tmdbEntry } = useTMDBLookup({
    title: movie.movieName,
    imdbId: movie[IMDBFields.ID],
    tmdbId: movie[TMDBFields.ID],
    includePosters: true,
    includeBackdrops: true,
  });
  const { loading: traktLoading, entry: traktEntry } = useTraktLookup({
    title: movie.movieName,
    traktId: movie[TraktFields.ID],
  });
  // const { loading: imdbLoading, entry: imdbEntry } = useIMDBLookup(entry.movieName || entry[IMDBFields.ID]);

  const entry = useMemo(
    () =>
      toMovieEntry({
        ...movie,
        ...(traktEntry ?? {}),
        ...(tmdbEntry ?? {}),
        // ...(imdbEntry ?? {}),
      }),
    [movie, tmdbEntry, traktEntry],
  );

  // const loading = tmdbLoading || traktLoading || imdbLoading;
  const loading = tmdbLoading || traktLoading;

  return { loading, entry };
};
