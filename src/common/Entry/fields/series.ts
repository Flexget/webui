import { BaseEntry, CardType, Fields } from '../types';

export enum SeriesFieldNames {
  Genres = 'genres',
  Posters = 'posters',
  Rating = 'rating',
  Votes = 'votes',
  Description = 'description',
  Url = 'url',
  ID = 'seriesId',
}

export const enum TVDBFields {
  Genres = 'tvdbGenres',
  Posters = 'tvdbPosters',
  Rating = 'tvdbRating',
  Description = 'tvdbOverview',
  Url = 'tvdbUrl',
  ID = 'tvdbId',
}

export const enum TraktFields {
  Genres = 'traktGenres',
  Rating = 'traktSeriesRating',
  Description = 'traktSeriesOverview',
  Votes = 'traktSeriesVotes',
  Url = 'traktSeriesUrl',
  ID = 'traktId',
}

export const enum TVMazeFields {
  Genres = 'tvmazeGenres',
  Posters = 'tvmazeSeriesOriginalImage',
  Description = 'tvmazeSeriesSummary',
  Rating = 'tvmazeSeriesRating',
  Url = 'tvmazeSeriesUrl',
  ID = 'tvmazeSeriesId',
}

export const seriesFieldList = [
  // TVDB
  {
    [SeriesFieldNames.Genres]: TVDBFields.Genres,
    [SeriesFieldNames.Posters]: TVDBFields.Posters,
    [SeriesFieldNames.Rating]: TVDBFields.Rating,
    [SeriesFieldNames.Description]: TVDBFields.Description,
    [SeriesFieldNames.Url]: TVDBFields.Url,
    [SeriesFieldNames.ID]: TVDBFields.ID,
  },
  // Trakt
  {
    [SeriesFieldNames.Genres]: TraktFields.Genres,
    [SeriesFieldNames.Rating]: TraktFields.Rating,
    [SeriesFieldNames.Description]: TraktFields.Description,
    [SeriesFieldNames.Votes]: TraktFields.Votes,
    [SeriesFieldNames.Url]: TraktFields.Url,
    [SeriesFieldNames.ID]: TraktFields.ID,
  },
  // Tvmaze
  {
    [SeriesFieldNames.Genres]: TVMazeFields.Genres,
    [SeriesFieldNames.Posters]: TVMazeFields.Posters,
    [SeriesFieldNames.Description]: TVMazeFields.Description,
    [SeriesFieldNames.Rating]: TVMazeFields.Rating,
    [SeriesFieldNames.Url]: TVMazeFields.Url,
    [SeriesFieldNames.ID]: TVMazeFields.ID,
  },
] as const;

interface SeriesGetters {
  [SeriesFieldNames.Genres]: string[];
  [SeriesFieldNames.Posters]: string | string[];
  [SeriesFieldNames.Rating]: number;
  [SeriesFieldNames.Votes]: number;
  [SeriesFieldNames.Description]: string;
  [SeriesFieldNames.Url]: string;
  [SeriesFieldNames.ID]: string;
}

export type SeriesFields = Fields<SeriesFieldNames, typeof seriesFieldList, SeriesGetters>;

export interface RawSeriesEntry extends BaseEntry, SeriesFields {
  seriesName: string;
  seriesYear: number;
}

export interface SeriesEntry extends RawSeriesEntry, Partial<SeriesGetters> {
  type: CardType.Series;
}
