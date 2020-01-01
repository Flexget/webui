import { useState, useEffect } from 'react';
import { stringify } from 'qs';
import { snakeCase } from 'utils/fetch';
import { useFlexgetAPI } from 'core/api';
import { RawSeriesFields, TVDBFields, TVMazeFields, TraktFields } from '../fields/series';

export interface TVDBOptions {
  includeActors?: boolean;
  language?: string;
}

interface TVDBSeries {
  airsDayofweek: string;
  airsTime: string;
  aliases: string[];
  banner: string;
  contentRating: string;
  expired: boolean;
  firstAired: string; // UTC date string
  genres: string[];
  imdbId: string;
  language: string;
  lastUpdated: string; // ISO date string
  network: string;
  overview: string;
  posters: string[];
  rating: number;
  runtime: number;
  seriesName: string;
  status: string;
  tvdbId: number;
}

const tvdbToFields = (series: TVDBSeries): RawSeriesFields => ({
  seriesName: series.seriesName,
  [TVDBFields.Genres]: series.genres,
  [TVDBFields.Posters]: series.posters,
  [TVDBFields.Backdrops]: series.banner,
  [TVDBFields.Rating]: series.rating,
  [TVDBFields.Description]: series.overview,
  [TVDBFields.Url]: `http://thetvdb.com/index.php?tab=series&id=${series.tvdbId}`,
  [TVDBFields.ContentRating]: series.contentRating,
  [TVDBFields.Network]: series.network,
  [TVDBFields.Runtime]: series.runtime,
  [TVDBFields.ID]: series.tvdbId,
});

export const useTVDBLookup = (titleOrId: string | number, options: TVDBOptions) => {
  const query = stringify(snakeCase(options));
  const [entry, setEntry] = useState<RawSeriesFields>();

  const [state, request] = useFlexgetAPI<TVDBSeries>(`/tvdb/series/${titleOrId}?${query}`);

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

interface TVMazeSchedule {
  days: string[];
  time: string;
}

interface TVMazeSeries {
  genres: string[];
  language: string;
  lastUpdate: string; // UTC
  mediumImage: string;
  name: string;
  network: string;
  originalImage: string;
  premiered: string; // UTC
  rating: number;
  runtime: number;
  schedule: TVMazeSchedule;
  showType: string;
  status: string;
  summary: string;
  tvdbId: number;
  tvmazeId: number;
  tvrageId: number;
  updated: string; // UTC
  url: string;
  weight: number;
  year: number;
}

const tvMazeToFields = (series: TVMazeSeries): RawSeriesFields => ({
  seriesName: series.name,
  seriesYear: series.year,
  [TVMazeFields.Genres]: series.genres,
  [TVMazeFields.Posters]: series.originalImage,
  [TVMazeFields.Rating]: series.rating,
  [TVMazeFields.Description]: series.summary,
  [TVMazeFields.Url]: series.url,
  [TVMazeFields.Network]: series.network,
  [TVMazeFields.Runtime]: series.runtime,
  [TVDBFields.ID]: series.tvdbId,
  [TVMazeFields.ID]: series.tvmazeId,
});

export const useTVMazeLookup = (titleOrId: string | number) => {
  const [entry, setEntry] = useState<RawSeriesFields>();

  const [state, request] = useFlexgetAPI<TVMazeSeries>(`/tvmaze/series/${titleOrId}`);

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

interface TraktOptions {
  title?: string;
  traktId?: string | number;
  traktSlug?: string;
  tvdbId?: string;
  tvRage?: string;
  year?: number;
  includeActors?: boolean;
  includeTranslations?: boolean;
}

interface TraktSeries {
  airDay: string;
  airTime: string;
  cachedAt: string; // UTC
  certification: string;
  country: string;
  firstAired: string; // UTC
  genres: string[];
  homepage: string;
  id: number;
  imdbId: string;
  language: string;
  network: string;
  numberOfAiredEpisodes: number;
  overview: string;
  rating: number;
  runtime: number;
  slug: string;
  status: string;
  timezone: string;
  title: string;
  tmdbId: number;
  tvdbId: number;
  tvrageId: number;
  updatedAt: string; // UTC
  votes: number;
  year: number;
}

const traktToFields = (series: TraktSeries): RawSeriesFields => ({
  seriesName: series.title,
  seriesYear: series.year,
  [TraktFields.Genres]: series.genres,
  [TraktFields.Rating]: series.rating,
  [TraktFields.Description]: series.overview,
  [TraktFields.Votes]: series.votes,
  [TraktFields.Url]: `https://trakt.tv/shows${series.slug}`,
  [TraktFields.ContentRating]: series.certification,
  [TraktFields.Network]: series.network,
  [TraktFields.Runtime]: series.runtime,
  [TraktFields.ID]: series.id,
  [TVDBFields.ID]: series.tvdbId,
});

export const useTraktLookup = (options: TraktOptions) => {
  const query = stringify(snakeCase(options));
  const [entry, setEntry] = useState<RawSeriesFields>();

  const [state, request] = useFlexgetAPI<TraktSeries>(`/trakt/series/?${query}`);

  useEffect(() => {
    const fn = async () => {
      const resp = await request();
      if (resp.ok) {
        setEntry(traktToFields(resp.data));
      }
      return resp;
    };
    fn();
  }, [request]);

  return { ...state, entry };
};
