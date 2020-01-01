import { BaseEntry, CardType, Fields } from '../types';

export enum EpisodeFieldNames {
  SeriesName = 'seriesName',
  Name = 'episodeName',
  Genres = 'genres',
  Image = 'image',
  Description = 'description',
  Url = 'url',
  ContentRating = 'contentRating',
  ID = 'episodeId',
}

export const enum TVDBFields {
  Genres = 'tvdbGenres',
  Image = 'tvdbEpImage',
  Description = 'tvdbEpOverview',
  ContentRating = 'tvdbContentRating',
  ID = 'tvdbEpId',
  Url = 'tvdbUrl',
}

export const enum TraktFields {
  Name = 'traktEpName',
  Genres = 'traktGenres',
  Description = 'traktEpOverview',
  ContentRating = 'traktSeriesContentRating',
  ID = 'traktEpId',
  Url = 'traktSeriesUrl',
}

export const enum TVMazeFields {
  Name = 'tvmazeEpisodeName',
  Genres = 'tvmazeGenres',
  Image = 'tvmazeEpisodeOriginalImage',
  Description = 'tvmazeEpisodeSummary',
  Url = 'tvmazeEpisodeUrl',
  ID = 'tvmazeEpisodeId',
}

// NOTE: Thes are in order of priority so if all fields are present, the first one in
// the list will be used when rendered...possibly we can make this configurable later.
export const episodesFieldList = [
  // TVDB
  {
    [EpisodeFieldNames.Genres]: TVDBFields.Genres,
    [EpisodeFieldNames.Image]: TVDBFields.Image,
    [EpisodeFieldNames.Description]: TVDBFields.Description,
    [EpisodeFieldNames.ContentRating]: TVDBFields.ContentRating,
    [EpisodeFieldNames.ID]: TVDBFields.ID,
    [EpisodeFieldNames.Url]: TVDBFields.Url,
  },
  // Trakt
  {
    [EpisodeFieldNames.Name]: TraktFields.Name,
    [EpisodeFieldNames.Genres]: TraktFields.Genres,
    [EpisodeFieldNames.Description]: TraktFields.Description,
    [EpisodeFieldNames.ContentRating]: TraktFields.ContentRating,
    [EpisodeFieldNames.ID]: TraktFields.ID,
    [EpisodeFieldNames.Url]: TraktFields.Url,
  },
  // Tvmaze
  {
    [EpisodeFieldNames.Name]: TVMazeFields.Name,
    [EpisodeFieldNames.Genres]: TVMazeFields.Genres,
    [EpisodeFieldNames.Image]: TVMazeFields.Image,
    [EpisodeFieldNames.Description]: TVMazeFields.Description,
    [EpisodeFieldNames.Url]: TVMazeFields.Url,
    [EpisodeFieldNames.ID]: TVMazeFields.ID,
  },
] as const;

interface EpisodeGetters {
  [EpisodeFieldNames.Name]: string;
  [EpisodeFieldNames.Genres]: string[];
  [EpisodeFieldNames.Image]: string;
  [EpisodeFieldNames.Description]: string;
  [EpisodeFieldNames.Url]: string;
  [EpisodeFieldNames.ContentRating]: string;
  [EpisodeFieldNames.ID]: string;
}

export type EpisodeFields = Fields<EpisodeFieldNames, typeof episodesFieldList, EpisodeGetters>;

export interface RawEpisodeEntry extends BaseEntry, EpisodeFields {
  seriesEpisode: number;
  seriesSeason: number;
  seriesName: string;
  seriesId: string;
}
export interface EpisodeEntry extends RawEpisodeEntry, Partial<EpisodeGetters> {
  type: CardType.Episode;
}
