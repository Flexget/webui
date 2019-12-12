import { BaseEntry, CardType, Fields } from '../types';

export enum EpisodeFieldNames {
  Name = 'episodeName',
  Genres = 'genres',
  Image = 'image',
  Rating = 'rating',
  Votes = 'votes',
  Description = 'description',
  Url = 'url',
  ContentRating = 'contentRating',
  ID = 'episodeId',
}

export const enum TVDBFields {
  Genres = 'tvdbGenres',
  Image = 'tvdbEpImage',
  Rating = 'tvdbEpRating',
  Description = 'tvdbEpOverview',
  ContentRating = 'tvdbContentRating',
  ID = 'tvdbEpId',
}

export const enum TraktFields {
  Name = 'traktEpName',
  Genres = 'traktGenres',
  Rating = 'traktEpRating',
  Description = 'traktEpOverview',
  Votes = 'traktEpVotes',
  ContentRating = 'traktSeriesContentRating',
  ID = 'traktEpId',
}

export const enum TVMazeFields {
  Name = 'tvmazeEpisodeName',
  Genres = 'tvmazeGenres',
  Image = 'tvmazeEpisodeOriginalImage',
  Description = 'tvmazeEpisodeSummary',
  Rating = 'tvmazeEpisodeRating',
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
    [EpisodeFieldNames.Rating]: TVDBFields.Rating,
    [EpisodeFieldNames.Description]: TVDBFields.Description,
    [EpisodeFieldNames.ContentRating]: TVDBFields.ContentRating,
    [EpisodeFieldNames.ID]: TVDBFields.ID,
  },
  // Trakt
  {
    [EpisodeFieldNames.Name]: TraktFields.Name,
    [EpisodeFieldNames.Genres]: TraktFields.Genres,
    [EpisodeFieldNames.Rating]: TraktFields.Rating,
    [EpisodeFieldNames.Description]: TraktFields.Description,
    [EpisodeFieldNames.Votes]: TraktFields.Votes,
    [EpisodeFieldNames.ContentRating]: TraktFields.ContentRating,
    [EpisodeFieldNames.ID]: TraktFields.ID,
  },
  // Tvmaze
  {
    [EpisodeFieldNames.Name]: TVMazeFields.Name,
    [EpisodeFieldNames.Genres]: TVMazeFields.Genres,
    [EpisodeFieldNames.Image]: TVMazeFields.Image,
    [EpisodeFieldNames.Description]: TVMazeFields.Description,
    [EpisodeFieldNames.Rating]: TVMazeFields.Rating,
    [EpisodeFieldNames.Url]: TVMazeFields.Url,
    [EpisodeFieldNames.ID]: TVMazeFields.ID,
  },
] as const;

interface EpisodeGetters {
  [EpisodeFieldNames.Name]: string;
  [EpisodeFieldNames.Genres]: string[];
  [EpisodeFieldNames.Image]: string;
  [EpisodeFieldNames.Rating]: number;
  [EpisodeFieldNames.Votes]: number;
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
