import { Fields, BaseEntry } from '../types';

export enum MovieFieldNames {
  Genres = 'genres',
  Posters = 'posters',
  Backdrops = 'backdrops',
  Rating = 'rating',
  Votes = 'votes',
  Description = 'description',
  Url = 'url',
  Runtime = 'runtime',
  ID = 'movieId',
}

export const enum IMDBFields {
  Genres = 'imdbGenres',
  Posters = 'imdbPhoto',
  Rating = 'imdbScore',
  Votes = 'imdbVotes',
  Description = 'imdbPlotOutline',
  Url = 'imdbUrl',
  Runtime = 'imdbRuntime',
  ID = 'imdbId',
}

export const enum TraktFields {
  Genres = 'traktGenres',
  Rating = 'traktRating',
  Votes = 'traktVotes',
  Description = 'traktOverview',
  Url = 'traktHomepage',
  Runtime = 'traktRuntime',
  ID = 'traktMovieId',
}

export const enum TMDBFields {
  Genres = 'tmdbGenres',
  Posters = 'tmdbPosters',
  Backdrops = 'tmdbBackdrops',
  Rating = 'tmdbRating',
  Votes = 'tmdbVotes',
  Url = 'tmdbHomepage',
  Runtime = 'tmdbRuntime',
  ID = 'tmdbId',
  Description = 'tmdbOverview',
}

// NOTE: Thes are in order of priority so if all fields are present, the first one in
// the list will be used when rendered...possibly we can make this configurable later.
export const movieFieldList = [
  // IMDB
  {
    [MovieFieldNames.Genres]: IMDBFields.Genres,
    [MovieFieldNames.Posters]: IMDBFields.Posters,
    [MovieFieldNames.Rating]: IMDBFields.Rating,
    [MovieFieldNames.Votes]: IMDBFields.Votes,
    [MovieFieldNames.Description]: IMDBFields.Description,
    [MovieFieldNames.Url]: IMDBFields.Url,
    [MovieFieldNames.Runtime]: IMDBFields.Runtime,
    [MovieFieldNames.ID]: IMDBFields.ID,
  },
  // TMDB
  {
    [MovieFieldNames.Genres]: TMDBFields.Genres,
    [MovieFieldNames.Posters]: TMDBFields.Posters,
    [MovieFieldNames.Backdrops]: TMDBFields.Backdrops,
    [MovieFieldNames.Rating]: TMDBFields.Rating,
    [MovieFieldNames.Votes]: TMDBFields.Votes,
    [MovieFieldNames.Url]: TMDBFields.Url,
    [MovieFieldNames.Runtime]: TMDBFields.Runtime,
    [MovieFieldNames.ID]: TMDBFields.ID,
    [MovieFieldNames.Description]: TMDBFields.Description,
  },
  // Trakt
  {
    [MovieFieldNames.Genres]: TraktFields.Genres,
    [MovieFieldNames.Rating]: TraktFields.Rating,
    [MovieFieldNames.Votes]: TraktFields.Votes,
    [MovieFieldNames.Description]: TraktFields.Description,
    [MovieFieldNames.Url]: TraktFields.Url,
    [MovieFieldNames.Runtime]: TraktFields.Runtime,
    [MovieFieldNames.ID]: TraktFields.ID,
  }
] as const;

interface MovieGetters {
  [MovieFieldNames.Genres]: string[];
  [MovieFieldNames.Posters]: string | string[];
  [MovieFieldNames.Backdrops]: string | string[];
  [MovieFieldNames.Rating]: number;
  [MovieFieldNames.Votes]: number;
  [MovieFieldNames.Description]: string;
  [MovieFieldNames.Url]: string;
  [MovieFieldNames.Runtime]: number;
  [MovieFieldNames.ID]: string | number;
}

export type RawMovieFields = Fields<MovieFieldNames, typeof movieFieldList, MovieGetters> & {
  movieName: string;
  movieYear: number;
};
export type RawMovieEntry = RawMovieFields & BaseEntry;

export type MovieEntry = RawMovieEntry & Partial<MovieGetters>;
