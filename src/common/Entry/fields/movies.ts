import { Fields, CardType, BaseEntry } from '../types';

export enum MovieFieldNames {
  Genres = 'genres',
  Posters = 'posters',
  Rating = 'rating',
  Votes = 'votes',
  Description = 'description',
  Url = 'url',
  ID = 'movieId',
}

export const enum IMDBFields {
  Genres = 'imdbGenres',
  Posters = 'imdbPhoto',
  Rating = 'imdbScore',
  Votes = 'imdbVotes',
  Description = 'imdbPlotOutline',
  Url = 'imdbUrl',
  ID = 'imdbId',
}

export const enum TraktFields {
  Genres = 'traktGenres',
  Rating = 'traktRating',
  Votes = 'traktVotes',
  Description = 'traktOverview',
  Url = 'traktHomepage',
  ID = 'traktMovieId',
}

export const enum TMDBFields {
  Genres = 'tmdbGenres',
  Posters = 'tmdbPosters',
  Rating = 'tmdbRating',
  Votes = 'tmdbVotes',
  Description = 'tmdbTagline',
  Url = 'tmdbHomepage',
  ID = 'tmdbId',
}

export const enum BluerayFields {
  Genres = 'bluerayGenres',
  Rating = 'bluerayRating',
  Url = 'bluerayUrl',
}

export const movieFieldList = [
  // IMDB
  {
    [MovieFieldNames.Genres]: IMDBFields.Genres,
    [MovieFieldNames.Posters]: IMDBFields.Posters,
    [MovieFieldNames.Rating]: IMDBFields.Rating,
    [MovieFieldNames.Votes]: IMDBFields.Votes,
    [MovieFieldNames.Description]: IMDBFields.Description,
    [MovieFieldNames.Url]: IMDBFields.Url,
    [MovieFieldNames.ID]: IMDBFields.ID,
  },
  // Trakt
  {
    [MovieFieldNames.Genres]: TraktFields.Genres,
    [MovieFieldNames.Rating]: TraktFields.Rating,
    [MovieFieldNames.Votes]: TraktFields.Votes,
    [MovieFieldNames.Description]: TraktFields.Description,
    [MovieFieldNames.Url]: TraktFields.Url,
    [MovieFieldNames.ID]: TraktFields.ID,
  },
  // TMDB
  {
    [MovieFieldNames.Genres]: TMDBFields.Genres,
    [MovieFieldNames.Posters]: TMDBFields.Posters,
    [MovieFieldNames.Rating]: TMDBFields.Rating,
    [MovieFieldNames.Votes]: TMDBFields.Votes,
    [MovieFieldNames.Description]: TMDBFields.Description,
    [MovieFieldNames.Url]: TMDBFields.Url,
    [MovieFieldNames.ID]: TMDBFields.ID,
  },
  // Blue-ray
  {
    [MovieFieldNames.Genres]: BluerayFields.Genres,
    [MovieFieldNames.Rating]: BluerayFields.Rating,
    [MovieFieldNames.Url]: BluerayFields.Url,
  },
] as const;

interface MovieGetters {
  [MovieFieldNames.Genres]: string[];
  [MovieFieldNames.Posters]: string | string[];
  [MovieFieldNames.Rating]: number;
  [MovieFieldNames.Votes]: number;
  [MovieFieldNames.Description]: string;
  [MovieFieldNames.Url]: string;
  [MovieFieldNames.ID]: string;
}

export type MovieFields = Fields<MovieFieldNames, typeof movieFieldList, MovieGetters>;

export interface RawMovieEntry extends BaseEntry, MovieFields {
  movieName: string;
  movieYear: number;
}

export interface MovieEntry extends RawMovieEntry, Partial<MovieGetters> {
  type: CardType.Movie;
}
