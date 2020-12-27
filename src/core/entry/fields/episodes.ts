import { BaseEntry, Fields } from '../types';

export enum EpisodeFieldNames {
  Name = 'episodeName',
  Image = 'image',
  Description = 'description',
  Url = 'url',
  ID = 'episodeId',
}

export const enum TVDBFields {
  Name = 'tvdbEpName',
  Image = 'tvdbEpImage',
  Description = 'tvdbEpOverview',
  ID = 'tvdbEpId',
  Url = 'tvdbUrl',
}

export const enum TraktFields {
  Name = 'traktEpName',
  Description = 'traktEpOverview',
  ID = 'traktEpId',
}

export const enum TVMazeFields {
  Name = 'tvmazeEpisodeName',
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
    [EpisodeFieldNames.Name]: TVDBFields.Name,
    [EpisodeFieldNames.Image]: TVDBFields.Image,
    [EpisodeFieldNames.Description]: TVDBFields.Description,
    [EpisodeFieldNames.ID]: TVDBFields.ID,
    [EpisodeFieldNames.Url]: TVDBFields.Url,
  },
  // Trakt
  {
    [EpisodeFieldNames.Name]: TraktFields.Name,
    [EpisodeFieldNames.Description]: TraktFields.Description,
    [EpisodeFieldNames.ID]: TraktFields.ID,
  },
  // Tvmaze
  {
    [EpisodeFieldNames.Name]: TVMazeFields.Name,
    [EpisodeFieldNames.Image]: TVMazeFields.Image,
    [EpisodeFieldNames.Description]: TVMazeFields.Description,
    [EpisodeFieldNames.Url]: TVMazeFields.Url,
    [EpisodeFieldNames.ID]: TVMazeFields.ID,
  },
] as const;

export interface EpisodeGetters {
  [EpisodeFieldNames.Name]: string;
  [EpisodeFieldNames.Image]: string;
  [EpisodeFieldNames.Description]: string;
  [EpisodeFieldNames.Url]: string;
  [EpisodeFieldNames.ID]: string | number;
}

export type EpisodeFields = Fields<EpisodeFieldNames, typeof episodesFieldList, EpisodeGetters> & {
  seriesEpisode: number;
  seriesSeason: number;
  seriesId: string;
};

export type RawEpisodeEntry = EpisodeFields &
  BaseEntry & {
    seriesName: string;
  };

export type EpisodeEntry = RawEpisodeEntry & Partial<EpisodeGetters>;
