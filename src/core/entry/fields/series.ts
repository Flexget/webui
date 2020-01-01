import { BaseEntry, CardType, Fields } from '../types';

export enum SeriesFieldNames {
  Genres = 'genres',
  Posters = 'posters',
  Backdrops = 'backdrops',
  Rating = 'rating',
  Votes = 'votes',
  Description = 'description',
  Url = 'url',
  ContentRating = 'contentRating',
  Runtime = 'runtime',
  Network = 'network',
  ID = 'seriesId',
}

export const enum TVDBFields {
  Genres = 'tvdbGenres',
  Posters = 'tvdbPosters',
  Backdrops = 'tvdbBanner',
  Rating = 'tvdbRating',
  Description = 'tvdbOverview',
  Url = 'tvdbUrl',
  ContentRating = 'tvdbContentRating',
  Network = 'tvdbNetwork',
  Runtime = 'tvdbRuntime',
  ID = 'tvdbId',
}

export const enum TraktFields {
  Genres = 'traktGenres',
  Rating = 'traktSeriesRating',
  Description = 'traktSeriesOverview',
  Votes = 'traktSeriesVotes',
  Url = 'traktSeriesUrl',
  ContentRating = 'traktSeriesContentRating',
  Network = 'traktSeriesNetwork',
  Runtime = 'traktSeriesRuntime',
  ID = 'traktId',
}

export const enum TVMazeFields {
  Genres = 'tvmazeGenres',
  Posters = 'tvmazeSeriesOriginalImage',
  Description = 'tvmazeSeriesSummary',
  Rating = 'tvmazeSeriesRating',
  Url = 'tvmazeSeriesUrl',
  Network = 'tvmazeSeriesNetwork',
  Runtime = 'tvmazeSeriesRuntime',
  ID = 'tvmazeSeriesId',
}

// NOTE: Thes are in order of priority so if all fields are present, the first one in
// the list will be used when rendered...possibly we can make this configurable later.
export const seriesFieldList = [
  // TVDB
  {
    [SeriesFieldNames.Genres]: TVDBFields.Genres,
    [SeriesFieldNames.Posters]: TVDBFields.Posters,
    [SeriesFieldNames.Rating]: TVDBFields.Rating,
    [SeriesFieldNames.Description]: TVDBFields.Description,
    [SeriesFieldNames.Url]: TVDBFields.Url,
    [SeriesFieldNames.ContentRating]: TVDBFields.ContentRating,
    [SeriesFieldNames.Backdrops]: TVDBFields.Backdrops,
    [SeriesFieldNames.Runtime]: TVDBFields.Runtime,
    [SeriesFieldNames.Network]: TVDBFields.Network,
    [SeriesFieldNames.ID]: TVDBFields.ID,
  },
  // Trakt
  {
    [SeriesFieldNames.Genres]: TraktFields.Genres,
    [SeriesFieldNames.Rating]: TraktFields.Rating,
    [SeriesFieldNames.Description]: TraktFields.Description,
    [SeriesFieldNames.Votes]: TraktFields.Votes,
    [SeriesFieldNames.Url]: TraktFields.Url,
    [SeriesFieldNames.ContentRating]: TraktFields.ContentRating,
    [SeriesFieldNames.Network]: TraktFields.Network,
    [SeriesFieldNames.Runtime]: TraktFields.Runtime,
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
    [SeriesFieldNames.Runtime]: TVMazeFields.Runtime,
    [SeriesFieldNames.Network]: TVMazeFields.Network,
  },
] as const;

interface SeriesGetters {
  [SeriesFieldNames.Genres]: string[];
  [SeriesFieldNames.Posters]: string | string[];
  [SeriesFieldNames.Backdrops]: string | string[];
  [SeriesFieldNames.Rating]: number;
  [SeriesFieldNames.Votes]: number;
  [SeriesFieldNames.Description]: string;
  [SeriesFieldNames.Url]: string;
  [SeriesFieldNames.ContentRating]: string;
  [SeriesFieldNames.ID]: string | number;
  [SeriesFieldNames.Runtime]: number;
  [SeriesFieldNames.Network]: string;
}

export type SeriesFields = Fields<SeriesFieldNames, typeof seriesFieldList, SeriesGetters>;

export interface RawSeriesFields extends SeriesFields {
  seriesName: string;
  seriesYear?: number;
}

export interface RawSeriesEntry extends BaseEntry, RawSeriesFields {}

export interface SeriesEntry extends RawSeriesEntry, Partial<SeriesGetters> {
  type: CardType.Series;
}
