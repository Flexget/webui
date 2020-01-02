import { useState, useEffect, useMemo } from 'react';
import { stringify } from 'qs';
import { snakeCase } from 'utils/fetch';
import { useFlexgetAPI } from 'core/api';
import { toEpisodeEntry } from 'core/entry/utils';
import { useSeriesLookup } from 'core/entry/lookup/series';
import { EpisodeFields, TVDBFields, TVMazeFields, EpisodeEntry } from '../fields/episodes';
import {
  SeriesEntry,
  TVDBFields as SeriesTVDBFields,
  TVMazeFields as SeriesTVMazeFields,
} from '../fields/series';

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

const pad = (num: number) => `${num}`.padStart(2, '0');

const tvdbToFields = (episode: TVDBEpisode): EpisodeFields => ({
  seriesEpisode: episode.episodeNumber,
  seriesSeason: episode.seasonNumber,
  seriesId: `S${pad(episode.seasonNumber)}E${pad(episode.episodeNumber)}`,
  [TVDBFields.Name]: episode.episodeName,
  [TVDBFields.Image]: episode.image,
  [TVDBFields.Description]: episode.overview,
  [TVDBFields.Url]: `http://thetvdb.com/index.php?tab=episode&id=${episode.id}`,
  [TVDBFields.ID]: episode.id,
});

export const useTVDBLookup = (tvdbId: string | number | undefined, options: TVDBOptions) => {
  const query = stringify(snakeCase(options));
  const [entry, setEntry] = useState<EpisodeFields>();

  const [state, request] = useFlexgetAPI<TVDBEpisode>(`/tvdb/episode/${tvdbId}?${query}`);

  useEffect(() => {
    const fn = async () => {
      const resp = await request();
      if (resp.ok) {
        setEntry(tvdbToFields(resp.data));
      }
      return resp;
    };
    if (tvdbId) {
      fn();
    }
  }, [request, tvdbId]);

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

const tvMazeToFields = (episode: TVMazeEpisode): EpisodeFields => ({
  seriesEpisode: episode.number,
  seriesSeason: episode.seasonNumber,
  seriesId: `S${pad(episode.number)}E${pad(episode.seasonNumber)}`,
  [TVMazeFields.Image]: episode.originalImage,
  [TVMazeFields.Description]: episode.summary,
  [TVMazeFields.Url]: episode.url,
  [TVMazeFields.ID]: episode.tvmazeId,
});

export const useTVMazeLookup = (seriesId: string | number | undefined, options: TVMazeOptions) => {
  const query = stringify(snakeCase(options));
  const [entry, setEntry] = useState<EpisodeFields>();

  const [state, request] = useFlexgetAPI<TVMazeEpisode>(`/tvmaze/episode/${seriesId}?${query}`);

  useEffect(() => {
    const fn = async () => {
      const resp = await request();
      if (resp.ok) {
        setEntry(tvMazeToFields(resp.data));
      }
      return resp;
    };
    if (seriesId) {
      fn();
    }
  }, [request, seriesId]);

  return { ...state, entry };
};

export const useEpisodeLookup = (series: SeriesEntry, episode: EpisodeEntry) => {
  const { loading: seriesLoading, entry: seriesEntry } = useSeriesLookup(series);
  const { loading: tvdbLoading, entry: tvdbEntry } = useTVDBLookup(
    seriesEntry[SeriesTVDBFields.ID],
    {
      epNumber: episode.seriesEpisode,
      seasonNumber: episode.seriesSeason,
    },
  );
  const { loading: tvMazeLoading, entry: tvMazeEntry } = useTVMazeLookup(
    seriesEntry[SeriesTVMazeFields.ID],
    {
      epNum: episode.seriesEpisode,
      seasonNum: episode.seriesSeason,
    },
  );

  const entry = useMemo(
    () =>
      toEpisodeEntry({
        ...episode,
        ...(tvdbEntry ?? {}),
        ...(tvMazeEntry ?? {}),
      }),
    [episode, tvMazeEntry, tvdbEntry],
  );

  const loading = tvdbLoading || tvMazeLoading || seriesLoading;

  return { entry, seriesEntry, loading };
};
