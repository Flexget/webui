import { Entry } from '../base/types';

export const enum SortBy {
  Added = 'added',
  Title = 'title',
  URL = 'original_url',
}

export interface Movie extends Entry {
  year: number;
  moviesListIds: MovieListId[];
}

export const enum MovieIds {
  Trakt = 'trakt_movie_id',
  TMDB = 'tmdb_id',
  IMDB = 'imdb_id',
}

export interface MovieListId {
  addedOn: string;
  id: number;
  idName: MovieIds;
  idValue: string;
  movieId: number;
}
