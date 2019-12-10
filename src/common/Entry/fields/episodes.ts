import { BaseEntry, CardType, Fields } from '../types';

export const enum EpisodeFieldNames {
  Name = 'name',
  Genres = 'genres',
  Image = 'posters',
  Rating = 'rating',
  Votes = 'votes',
  Description = 'description',
  Url = 'url',
  ID = 'episodeId',
}

export const episodesFieldList = [
  // TVDB
  {
    [EpisodeFieldNames.Genres]: 'tvdbGenres',
    [EpisodeFieldNames.Image]: 'tvdbEpImage',
    [EpisodeFieldNames.Rating]: 'tvdbEpRating',
    [EpisodeFieldNames.Description]: 'tvdbEpOverview',
    [EpisodeFieldNames.ID]: 'tvdbepId',
  },
  // Trakt
  {
    [EpisodeFieldNames.Genres]: 'traktGenres',
    [EpisodeFieldNames.Rating]: 'traktEpRating',
    [EpisodeFieldNames.Description]: 'traktEpOverview',
    [EpisodeFieldNames.Votes]: 'traktEpVotes',
    [EpisodeFieldNames.ID]: 'traktEpId',
  },
  // Tvmaze
  {
    [EpisodeFieldNames.Name]: 'tvmazeEpisodeName',
    [EpisodeFieldNames.Genres]: 'tvmazeGenres',
    [EpisodeFieldNames.Image]: 'tvmazeEpisodeOriginalImage',
    [EpisodeFieldNames.Description]: 'tvmazeEpisodeSummary',
    [EpisodeFieldNames.Rating]: 'tvmazeEpisodeRating',
    [EpisodeFieldNames.Url]: 'tvmazeEpisodeUrl',
    [EpisodeFieldNames.ID]: 'tvmazeEpisodeId',
  },
];

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

type EpisodeFields = Fields<EpisodeFieldNames, typeof episodesFieldList, EpisodeGetters>;

export interface EpisodeEntry extends BaseEntry, EpisodeGetters, EpisodeFields {
  type: CardType.Episode;
  seriesName: string;
  seriesEpisode: number;
  seriesSeason: number;
}
