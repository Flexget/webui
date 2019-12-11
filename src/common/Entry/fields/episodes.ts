import { BaseEntry, CardType, Fields } from '../types';

export enum EpisodeFieldNames {
  Name = 'name',
  Genres = 'genres',
  Image = 'image',
  Rating = 'rating',
  Votes = 'votes',
  Description = 'description',
  Url = 'url',
  ID = 'episodeId',
}

export const enum TVDBFields {
  Genres = 'tvdbGenres',
  Image = 'tvdbEpImage',
  Rating = 'tvdbEpRating',
  Description = 'tvdbEpOverview',
  ID = 'tvdbepId',
}

export const enum TraktFields {
  Genres = 'traktGenres',
  Rating = 'traktEpRating',
  Description = 'traktEpOverview',
  Votes = 'traktEpVotes',
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
    [EpisodeFieldNames.ID]: TVDBFields.ID,
  },
  // Trakt
  {
    [EpisodeFieldNames.Genres]: TraktFields.Genres,
    [EpisodeFieldNames.Rating]: TraktFields.Rating,
    [EpisodeFieldNames.Description]: TraktFields.Description,
    [EpisodeFieldNames.Votes]: TraktFields.Votes,
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
  [EpisodeFieldNames.ID]: string;
}

export type EpisodeFields = Fields<EpisodeFieldNames, typeof episodesFieldList, EpisodeGetters>;

export interface RawEpisodeEntry extends BaseEntry, EpisodeFields {
  seriesEpisode: number;
  seriesSeason: number;
  seriesName: string;
}
export interface EpisodeEntry extends RawEpisodeEntry, Partial<EpisodeGetters> {
  type: CardType.Episode;
}
