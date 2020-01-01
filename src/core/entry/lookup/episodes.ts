import { useState, useEffect } from 'react';
import { stringify } from 'qs';
import { snakeCase } from 'utils/fetch';
import { useFlexgetAPI } from 'core/api';
import { RawEpisodeFields, TVDBFields, TVMazeFields } from '../fields/episodes';

export interface TVDBOptions {
  airDate?: number;
  absoluteNumber?: number;
  language?: string;
  epNumber?: number;
  seasonNumber?: number;
}

interface TVDBEpisode {
  absoluteNumber: number;
  director: string;
  episodeName: string;
  episodeNumber: number;
  expired: boolean;
  firstAired: string;
  id: number;
  image: string;
  last_update: number;
  overview: string;
  rating: 7.1;
  seasonNumber: number;
  seriesId: number;
}

const tvdbToFields = (episode: TVDBEpisode): RawEpisodeFields => ({
  seriesEpisode: episode.episodeNumber,
  seriesSeason: episode.seasonNumber,
  [TVDBFields.Name]: episode.episodeName,
  [TVDBFields.Image]: episode.image,
  [TVDBFields.Description]: episode.overview,
  [TVDBFields.Url]: `http://thetvdb.com/index.php?tab=episode&id=${episode.id}`,
  [TVDBFields.ID]: episode.id,
});

export const useTVDBLookup = (tvdbId: string | number, options: TVDBOptions) => {
  const query = stringify(snakeCase(options));
  const [entry, setEntry] = useState<RawEpisodeFields>();

  const [state, request] = useFlexgetAPI<TVDBEpisode>(`/tvdb/series/${tvdbId}?${query}`);

  useEffect(() => {
    const fn = async () => {
      const resp = await request();
      if (resp.ok) {
        setEntry(tvdbToFields(resp.data));
      }
      return resp;
    };
    fn();
  }, [request]);

  return { ...state, entry };
};

interface TVMazeEpisode {
  airdate: string;
  airstamp: string;
  lastUpdate: string;
  mediumImage: 'string';
  number: number;
  originalImage: string;
  runtime: number;
  seasonNumber: number;
  seriesId: number;
  summary: string;
  title: string;
  tvmazeId: number;
  url: string;
}

export interface TVMazeOptions {
  airDate?: number;
  absoluteNumber?: number;
  language?: string;
  epNum?: number;
  seasonNum?: number;
}

const tvMazeToFields = (episode: TVMazeEpisode): RawEpisodeFields => ({
  seriesEpisode: episode.number,
  seriesSeason: episode.seasonNumber,
  [TVMazeFields.Image]: episode.originalImage,
  [TVMazeFields.Description]: episode.summary,
  [TVMazeFields.Url]: episode.url,
  [TVMazeFields.ID]: episode.tvmazeId,
});

export const useTVMazeLookup = (seriesId: string | number, options: TVMazeOptions) => {
  const query = stringify(snakeCase(options));
  const [entry, setEntry] = useState<RawEpisodeFields>();

  const [state, request] = useFlexgetAPI<TVMazeEpisode>(`/tvmaze/series/${seriesId}?${query}`);

  useEffect(() => {
    const fn = async () => {
      const resp = await request();
      if (resp.ok) {
        setEntry(tvMazeToFields(resp.data));
      }
      return resp;
    };
    fn();
  }, [request]);

  return { ...state, entry };
};
