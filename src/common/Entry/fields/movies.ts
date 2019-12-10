import { Fields, CardType, BaseEntry } from '../types';

export const enum MovieFieldNames {
  Genres = 'genres',
  Posters = 'posters',
  Rating = 'rating',
  Votes = 'votes',
  Description = 'description',
  Url = 'url',
  ID = 'movieId',
}

export const movieFieldList = [
  // IMDB
  {
    [MovieFieldNames.Genres]: 'imdbGenres',
    [MovieFieldNames.Posters]: 'imdbPhoto',
    [MovieFieldNames.Rating]: 'imdbScore',
    [MovieFieldNames.Votes]: 'imdbVotes',
    [MovieFieldNames.Description]: 'imdbPlotOutline',
    [MovieFieldNames.Url]: 'imdbUrl',
    [MovieFieldNames.ID]: 'imdbId',
  },
  // Trakt
  {
    [MovieFieldNames.Genres]: 'traktGenres',
    [MovieFieldNames.Rating]: 'traktRating',
    [MovieFieldNames.Description]: 'traktOverview',
    [MovieFieldNames.Votes]: 'traktVotes',
    [MovieFieldNames.Url]: 'traktHomepage',
    [MovieFieldNames.ID]: 'traktMovieId',
  },
  // TMDB
  {
    [MovieFieldNames.Genres]: 'tmdbGenres',
    [MovieFieldNames.Posters]: 'tmdbPosters',
    [MovieFieldNames.Rating]: 'tmdbRating',
    [MovieFieldNames.Votes]: 'tmbdVotes',
    [MovieFieldNames.Description]: 'tmdbTagline',
    [MovieFieldNames.Url]: 'tmdbHomepage',
    [MovieFieldNames.ID]: 'tmdbId',
  },
  // Blue-ray
  {
    [MovieFieldNames.Genres]: 'bluerayGenres',
    [MovieFieldNames.Rating]: 'bluerayRating',
    [MovieFieldNames.Url]: 'bluerayUrl',
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

type MovieFields = Fields<MovieFieldNames, typeof movieFieldList, MovieGetters>;

export interface MovieEntry extends BaseEntry, MovieGetters, MovieFields {
  type: CardType.Movie;
  movieName: string;
  movieYear: number;
}
