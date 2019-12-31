import { compose } from 'utils';
import { CardType } from './types';
import {
  makeRawEntry,
  withMovieRawEntry,
  withIMDBFields,
  withTraktFields,
  withTMDBFields,
  withSeriesRawEntry,
  withEpisodeRawEntry,
  withTVMazeEpisodeFields,
  withTVMazeSeriesFields,
  withTraktEpisodeFields,
  withTraktSeriesFields,
} from './fixtures';
import { toEntry } from './utils';
import { MovieEntry, TraktFields, TMDBFields, IMDBFields } from './fields/movies';

import {
  EpisodeEntry,
  TVMazeFields as TVMazeEpisodeFields,
  TraktFields as TraktEpisodeFields,
} from './fields/episodes';
import {
  SeriesEntry,
  TVMazeFields as TVMazeSeriesFields,
  TraktFields as TraktSeriesFields,
} from './fields/series';

describe('core/entry/utils', () => {
  describe('toEntry', () => {
    const entry = makeRawEntry();
    describe('default', () => {
      const defaultEntry = toEntry(entry);
      it('should work with no additional fields', () => {
        expect(defaultEntry.type).toBe(CardType.Default);
      });
    });

    describe('movies', () => {
      it('should work with no additional fields', () => {
        const rawMovie = compose(withMovieRawEntry)(entry);
        const movie = toEntry(rawMovie);
        expect(movie.type).toBe(CardType.Movie);
      });

      it('should work with imdb additional fields', () => {
        const rawMovie = compose(withTMDBFields, withMovieRawEntry)(entry);
        const movie = toEntry(rawMovie) as MovieEntry;
        expect(movie.type).toBe(CardType.Movie);
        expect(movie.genres).toBeDefined();
        expect(movie.genres).toEqual(rawMovie[TMDBFields.Genres]);
        expect(movie.posters).toBeDefined();
        expect(movie.posters).toEqual(rawMovie[TMDBFields.Posters]);
      });

      it('should work with multiple additional fields', () => {
        const rawMovie = compose(withTraktFields, withIMDBFields, withMovieRawEntry)(entry);
        const movie = toEntry(rawMovie) as MovieEntry;
        expect(movie.type).toBe(CardType.Movie);
        expect(movie.genres).toBeDefined();
        expect(movie.genres).toEqual(rawMovie[TraktFields.Genres]);
        expect(movie.posters).toBeDefined();
        expect(movie.posters).toEqual(rawMovie[IMDBFields.Posters]);
      });
    });

    describe('series', () => {
      it('should work with no additional fields', () => {
        const rawSeries = compose(withSeriesRawEntry)(entry);
        const series = toEntry(rawSeries);
        expect(series.type).toBe(CardType.Show);
      });

      it('should work with imdb additional fields', () => {
        const rawSeries = compose(withTVMazeSeriesFields, withSeriesRawEntry)(entry);
        const series = toEntry(rawSeries) as SeriesEntry;
        expect(series.type).toBe(CardType.Show);
        expect(series.genres).toBeDefined();
        expect(series.genres).toEqual(rawSeries[TVMazeSeriesFields.Genres]);
        expect(series.posters).toBeDefined();
        expect(series.posters).toEqual(rawSeries[TVMazeSeriesFields.Posters]);
      });

      it('should work with multiple additional fields', () => {
        const rawSeries = compose(
          withTraktSeriesFields,
          withTVMazeSeriesFields,
          withSeriesRawEntry,
        )(entry);
        const series = toEntry(rawSeries) as SeriesEntry;
        expect(series.type).toBe(CardType.Show);
        expect(series.genres).toBeDefined();
        expect(series.genres).toEqual(rawSeries[TraktSeriesFields.Genres]);
        expect(series.posters).toBeDefined();
        expect(series.posters).toEqual(rawSeries[TVMazeSeriesFields.Posters]);
      });
    });

    describe('episodes', () => {
      it('should work with no additional fields', () => {
        const rawEpisode = compose(withEpisodeRawEntry)(entry);
        const episode = toEntry(rawEpisode);
        expect(episode.type).toBe(CardType.Episode);
      });

      it('should work with imdb additional fields', () => {
        const rawEpisode = compose(withTVMazeEpisodeFields, withEpisodeRawEntry)(entry);
        const episode = toEntry(rawEpisode) as EpisodeEntry;
        expect(episode.type).toBe(CardType.Episode);
        expect(episode.genres).toBeDefined();
        expect(episode.genres).toEqual(rawEpisode[TVMazeEpisodeFields.Genres]);
        expect(episode.image).toBeDefined();
        expect(episode.image).toEqual(rawEpisode[TVMazeEpisodeFields.Image]);
      });

      it('should work with multiple additional fields', () => {
        const rawEpisode = compose(
          withTraktEpisodeFields,
          withTVMazeEpisodeFields,
          withEpisodeRawEntry,
        )(entry);
        const episode = toEntry(rawEpisode) as EpisodeEntry;
        expect(episode.type).toBe(CardType.Episode);
        expect(episode.genres).toBeDefined();
        expect(episode.genres).toEqual(rawEpisode[TraktEpisodeFields.Genres]);
        expect(episode.image).toBeDefined();
        expect(episode.image).toEqual(rawEpisode[TVMazeEpisodeFields.Image]);
      });
    });
  });
});
