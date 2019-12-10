import { BaseEntry, CardType, Fields } from '../types';

export const enum SeriesFieldNames {
  Genres = 'genres',
  Posters = 'posters',
  Rating = 'rating',
  Votes = 'votes',
  Description = 'description',
  Url = 'url',
  ID = 'seriesId',
}

export const seriesFieldList = [
  // TVDB
  {
    [SeriesFieldNames.Genres]: 'tvdbGenres',
    [SeriesFieldNames.Posters]: 'tvdbPosters',
    [SeriesFieldNames.Rating]: 'tvdbRating',
    [SeriesFieldNames.Description]: 'tvdbOverview',
    [SeriesFieldNames.Url]: 'tvdbUrl',
    [SeriesFieldNames.ID]: 'tvdbId',
  },
  // Trakt
  {
    [SeriesFieldNames.Genres]: 'traktGenres',
    [SeriesFieldNames.Rating]: 'traktSeriesRating',
    [SeriesFieldNames.Description]: 'traktSeriesOverview',
    [SeriesFieldNames.Votes]: 'traktSeriesVotes',
    [SeriesFieldNames.Url]: 'traktSeriesUrl',
    [SeriesFieldNames.ID]: 'traktId',
  },
  // tvmaze
  {
    [SeriesFieldNames.Genres]: 'tvmazeGenres',
    [SeriesFieldNames.Posters]: 'tvmazeSeriesOriginalImage',
    [SeriesFieldNames.Description]: 'tvmazeSeriesSummary',
    [SeriesFieldNames.Rating]: 'tvmazeSeriesRating',
    [SeriesFieldNames.Url]: 'tvmazeSeriesUrl',
    [SeriesFieldNames.ID]: 'tvmazeSeriesId',
  },
];

interface SeriesGetters {
  [SeriesFieldNames.Genres]: string[];
  [SeriesFieldNames.Posters]: string | string[];
  [SeriesFieldNames.Rating]: number;
  [SeriesFieldNames.Votes]: number;
  [SeriesFieldNames.Description]: string;
  [SeriesFieldNames.Url]: string;
  [SeriesFieldNames.ID]: string;
}

type SeriesFields = Fields<SeriesFieldNames, typeof seriesFieldList, SeriesGetters>;

export interface SeriesEntry extends BaseEntry, SeriesGetters, SeriesFields {
  type: CardType.Series;
  seriesName: string;
  seriesYear: number;
}
